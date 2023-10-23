import { writable } from "svelte/store";
import type { NoteDTO } from "../../db/types.js";

export const initialAppState= {
  current: 0,
  id: 0,
  email: "",
  asset: "",
  ticket: "",
  phone: "",
  description: "",
  textEditorDescription: "",
  textEditor: false,
  timerCount: "",
  timerOn: false,
  date: new Date(),
  formatted: "",
  formattedTime: "00:00:00",
};
export type AppState = typeof initialAppState

export const appState = writable(initialAppState);

export function resetAppState(note?: NoteDTO) {
  appState.set({
    current: note?.current ?? 0,
    id: note?.id ?? 0,
    email: note?.email ?? '',
    asset: note?.asset ?? '',
    ticket: "",
    phone: note?.phone ?? '',
    description: note?.description ?? '',
    textEditorDescription: "",
    textEditor: false,
    timerCount: "",
    timerOn: false,
    date: note?.created_at ?? new Date(),
    formatted: "",
    formattedTime: "00:00:00",
  });
}

export const templateState = writable({
  content: '',
  tag: '',
  title: ''
})