import { writable } from "svelte/store";

export interface AppState {
  email: string;
  asset: string;
  ticket: string;
  phone: string;
  description: string;
  textEditorDescription: string;
  textEditor: boolean;
  timerCount: string;
  timerOn: boolean;
  date: Date;
  id: string
  formatted: string;
  formattedTime: string;
}

export const initialAppState: AppState = {
  id: "",
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

export const appState = writable(initialAppState);

export function resetAppState() {
  appState.set({
    id: "",
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
  });
}
