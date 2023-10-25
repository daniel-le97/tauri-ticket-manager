import { writable } from "svelte/store";
import { Theme } from "../../db/types.js";

export const themeColor = writable<Theme[]>();
export const activeTheme = writable<Theme>();
export const noteColor = writable('');
export const menuColor = writable('');