import { writable } from "svelte/store";

// For noteState
export const email = writable("");
export const asset = writable("");
export const ticket = writable("");
export const phone = writable("");
export const description = writable("");
export const timer = writable(false);

export const timerCount = writable("");
