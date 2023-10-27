import { writable } from "svelte/store";
import { TemplateDTO } from "../../db/types.js";

// For templateState
export const content = writable('');
export const tag = writable('');
export const title = writable('');
export const activeTemplate = writable<TemplateDTO | null>(null);

export const editingTemplate = writable(false)
export const templates = writable<TemplateDTO[] | null>(null);

export const templateState = writable({
    id: 0,
    created_at: '',
    updated_at: '',
    content: '',
    tag: '',
    title: ''
})