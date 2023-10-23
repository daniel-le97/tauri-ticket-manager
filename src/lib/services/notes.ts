import { get } from 'svelte/store';
import { NoteDTO, Template } from '../../db/types.js';
import * as State from '../stores/template.js'
import { dbService } from '../../db/service.js';
import { appState } from '../stores/appState.js';
import defu from 'defu';

class NoteService {
    async handleSave(event: KeyboardEvent){
        if ((event.metaKey || event.ctrlKey) && event.key === 's') {
            const noteInDb = await dbService.notes.getAll()
          }
    }

    async next(){
        const note = new NoteDTO(get(appState))
        await dbService.notes.update(note)
        
    }
    async getCurrentNote(){
        const current = await dbService.notes.getCurrent()
        const state = get(appState)
        const merge = (initial: typeof state, fill: NoteDTO) => {
            initial.asset = fill.asset
            initial.current = fill.current
            initial.id = fill.id
            initial.date = fill.created_at
            initial.description = fill.description
            initial.email = fill.email
            initial.phone = fill.phone
            return initial
        }
       const merged = merge(state, current)
    //    console.log({current, state, merged});
    //    appState.set(merged)
       
       

        return merged
    }
}

export const noteService = new NoteService()