import { get } from 'svelte/store';
import { Template } from '../../db/types.js';
import * as State from '../stores/template.js'
import { dbService } from '../../db/service.js';
import { appState } from '../stores/appState.js';

class NoteService {
    async handleSave(event: KeyboardEvent){
        if ((event.metaKey || event.ctrlKey) && event.key === 's') {
            const state = get(appState)
            console.log('state', state);
            
            
          }
    }
}

export const noteService = new NoteService()