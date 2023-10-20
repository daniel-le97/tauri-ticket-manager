import { writable } from 'svelte/store';

export const noteState = {
    phone: writable(''),
    asset: writable(''),
    email: writable(''),
    description: writable('')
}
export const templateState = {
    content: writable(''),
    tag: writable(''),
    title: writable('')
}