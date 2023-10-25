import { writable } from "svelte/store";

// For templateState
export const content = writable('');
export const tag = writable('');
export const title = writable('');

export const editingTemplate = writable(false)

export const templateState = writable({
    id: 0,
    created_at: '',
    updated_at: '',
    content: '',
    tag: '',
    title: ''
})