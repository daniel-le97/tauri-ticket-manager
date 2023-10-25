import { writable } from "svelte/store";
import { NoteDTO } from "../../db/types.js";
import { dbService } from "../../db/service.js";

export const initialAppState = {
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
export type AppState = typeof initialAppState;

export const appState = writable(initialAppState);

export function resetAppState(note?: NoteDTO) {
  appState.set({
    current: note?.current ?? 0,
    id: note?.id ?? 0,
    email: note?.email ?? "",
    asset: note?.asset ?? "",
    ticket: "",
    phone: note?.phone ?? "",
    description: note?.description ?? "",
    textEditorDescription: "",
    textEditor: false,
    timerCount: "",
    timerOn: false,
    date: note?.created_at ?? new Date(),
    formatted: "",
    formattedTime: "00:00:00",
  });
}

// export async function getTicketLength() {
//   try {
//     const notes = await dbService.notes.getAll();
//     dbNotesLength.set(notes.length);
//   } catch (error) {}
// }

export const templateState = writable({
  content: "",
  tag: "",
  title: "",
});

export const timingButton = writable(false);

export const notesHistory = writable<NoteDTO[]>([]);
