import { writable } from 'svelte/store';

// For noteState
export const phone = writable('');
export const asset = writable('');
export const email = writable('');
export const description = writable('');
export const timer = writable(false)

// For templateState
export const content = writable('');
export const tag = writable('');
export const title = writable('');