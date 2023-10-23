import { get } from 'svelte/store';
import { Note, NoteDTO, Template } from '../../db/types.js';
import * as State from '../stores/template.js'
import { dbService } from '../../db/service.js';
import { appState, resetAppState } from '../stores/appState.js';
import defu from 'defu';

class NoteService {
    async handleSave(event: KeyboardEvent){
        if ((event.metaKey || event.ctrlKey) && event.key === 's') {
            const noteInDb = await dbService.notes.getAll()
          }
    }

    async next(){
        const note = new NoteDTO(get(appState))
        const oldNote = await dbService.notes.getById(note.id)
        const merge = (note: NoteDTO, oldNote: NoteDTO) => {
            oldNote.asset = note.asset
            oldNote.description = note.description
            oldNote.email = note.email
            oldNote.phone = note.phone
            oldNote.current = 0
            return oldNote
        }
       const updated = await dbService.notes.update(merge(note,oldNote))
       console.log(updated);
       
       const newNote = await dbService.notes.create(new Note())
       console.log(newNote);
       
       resetAppState(newNote)
       console.log(get(appState));
       
    }
   
    async getCurrentNote(){
        const current = await dbService.notes.getCurrent()
        const state = get(appState)
        const merge = (initial: typeof state, current: NoteDTO) => {
            initial.asset = current.asset
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