import { writable } from "svelte/store";

// For templateState
export const ticketModal = writable(false);

export const settingModal = writable(false);
export const informationModal = writable(false);
export const templateModal = writable(false);

export const templateDrawer = writable(true);
