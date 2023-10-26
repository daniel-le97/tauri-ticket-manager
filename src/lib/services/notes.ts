import { get } from 'svelte/store';
import { Note, NoteDTO, Template } from '../../db/types.js';
import * as State from '../stores/template.js'
import { dbService } from '../../db/service.js';
import { appState, notesHistory, resetAppState, timingButton } from '../stores/appState.js';
import defu from 'defu';

class NoteService {
    async handleSave(event: KeyboardEvent){
        if ((event.metaKey || event.ctrlKey) && event.key === 's') {
            const noteInDb = await dbService.notes.getAll()
          }
    }

    merge ( note: NoteDTO, oldNote: NoteDTO, isCurrent?: number ) {
        oldNote.asset = note.asset;
        oldNote.description = note.description;
        oldNote.email = note.email;
        oldNote.phone = note.phone
        oldNote.current = isCurrent ?? note.current;
        return oldNote;
    }

    async save (reset = false) {
        let note = new NoteDTO( get( appState ) );
        const oldNote = await dbService.notes.getById( note.id );
        if (reset) {
            note = new NoteDTO({current:1})
        }
        const merged = this.merge( note, oldNote );
        // console.log(merged);
        
        await dbService.notes.update( merged );
        return merged;
    }


    async next () {
        const note = await this.save();
        let nextNote = await dbService.notes.getNext(note.id);

        if ( nextNote )
        {
            // console.log( 'found a note' );
            await dbService.notes.update( note, 0 );
            await dbService.notes.update( nextNote, 1 );
            resetAppState( { ...nextNote, current: 1 } );
        } else
        {   timingButton.set(true)
            // console.log( 'next note not found... creating note' );
            await dbService.notes.update(note, 0)
            const createdNote = await dbService.notes.create( new Note() );
            const noteTotal = await dbService.notes.count()
            // console.log(createdNote);
            resetAppState( createdNote );
            notesHistory.set(noteTotal)
            setTimeout(() => timingButton.set(false), 1000)
        }
    }
    async prev () {
        const note = new NoteDTO( get( appState ) );
        const previousNote = await dbService.notes.getPrevious(note.id);
        if ( previousNote )
        {
            // console.log( 'previous note found' );

            await dbService.notes.update( note, 0 );
            await dbService.notes.update( previousNote, 1 );
            resetAppState( { ...previousNote, current: 1 } );
            return;
        }
        throw new Error('unable to find previous note')
        // console.log( 'previous note not found' );

    }
   
    async getCurrentNote(){
        const current = await dbService.notes.getCurrent()
        const state = get(appState)
        const merge = (initial: typeof state, current: NoteDTO) => {
            initial.asset = current.asset ?? initial.asset
            initial.current = current.current
            initial.id = current.id
            initial.date = current.created_at
            initial.description = current.description
            initial.email = current.email
            initial.phone = current.phone
            return initial
        }
        const merged = merge(state, current)
        return merged
    }


    
}

export const noteService = new NoteService()