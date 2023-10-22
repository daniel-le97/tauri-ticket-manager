import { writable } from "svelte/store";

export interface AppState {
  email: string;
  asset: string;
  ticket: string;
  phone: string;
  description: string;
  timerCount: string;
  timerOn: boolean;
  date: Date;

  formatted: string;
}

export const initialAppState: AppState = {
  email: "",
  asset: "",
  ticket: "",
  phone: "",
  description: "",
  timerCount: "",
  timerOn: false,
  date: new Date(),
  formatted: "",
};

export const appState = writable(initialAppState);

export function resetAppState() {
  appState.set({
    email: "",
    asset: "",
    ticket: "",
    phone: "",
    description: "",
    timerCount: "",
    timerOn: false,
    date: new Date(),
    formatted: "",
  });
}
