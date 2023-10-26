import { writable, type Writable } from 'svelte/store';
import logger from '../utils/logger.js';

export let timerValue: Writable<number> = writable(0);
export let timers = writable('00:00:00')
timerValue.subscribe(timerValue => {
  timers.set(formatTime(timerValue))

})
function formatTime(seconds: number) {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const timeSeconds = date.getUTCSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${timeSeconds}`;
}
class Timer {
   interval: NodeJS.Timeout | null = null;
   isRunning: boolean = false;

   constructor(){
    
   }

  startTimer() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.interval = setInterval(() => {
       timerValue.update((value) => value + 1);
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.isRunning) {
      this.isRunning = false;
      console.log('timer', this.interval);
      
      clearInterval(this.interval!);
      this.interval = null
    }
  }

  resetTimer() {
    this.isRunning = false;
    clearInterval(this.interval!);
    timerValue.set(0);
    this.interval = null
  }

  resumeTimer() {
    if (!this.isRunning) {
      this.startTimer();
    }
  }
}

export const timerService = new Timer()