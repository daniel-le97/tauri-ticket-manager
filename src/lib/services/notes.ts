import { get } from 'svelte/store';
import { Template } from '../../db/types.js';
import * as State from '../stores/template.js'
import { dbService } from '../../db/service.js';

class NoteService {
    async handleSave(event: KeyboardEvent){
        if ((event.metaKey || event.ctrlKey) && event.key === 's') {
            event.preventDefault(); // Prevent the default browser action (saving the page)
            
          }
    }
}

export const noteService = new NoteService()