// timer.js

import { writable } from "svelte/store";


// Create a writable store
export const timer = writable({
  timerOn: false,
  totalSeconds: 0,
  timerStart: null,
  formattedTime: "00:00:00",
});



export  function startTimer() {
    // Update the timer store state
    timer.update((state) => {
      state.timerOn = true;
      state.timerStart = setInterval(() => {
        state.totalSeconds++;
      }, 1000);
      return state;
    });
  }

 export function pauseTimer() {
    // Update the timer store state
    timer.update((state) => {
      state.timerOn = false;
      clearInterval(state.timerStart);
      return state;
    });
  }