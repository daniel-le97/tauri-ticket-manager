
<script lang="ts">
  import { Button } from 'flowbite-svelte';
  import { CotateSolid, PauseSolid, PlaySolid } from 'flowbite-svelte-icons';
  import { writable, derived } from 'svelte/store';
  import { alertState } from '../stores/alert';

  // Timer state
  const initialTime = 0;
  let interval: undefined| null;
  let isRunning = false;
  let currentTime = initialTime;

  // Create writable stores for timer values
  const time = writable(initialTime);
  const isPaused = writable(true);

  // Derived store to format the time in HH:MM:SS
  const formattedTime = derived(time, ($time) => {
    const hours = Math.floor($time / 3600);
    const minutes = Math.floor(($time % 3600) / 60);
    const seconds = $time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

 
  // Function to start the timer
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      isPaused.set(false);
      // @ts-ignore
      interval = setInterval(() => {
        currentTime++;
        time.set(currentTime);
      }, 1000);

       alertState.set({
        color: "green",
        text: "Timer Started",

        visible: true,
      });
    }
  }

  // Function to pause the timer
  function pauseTimer() {
    if (isRunning) {
      isRunning = false;
      isPaused.set(true);
      clearInterval(interval!);
       alertState.set({
        color: "green",
        text: "Timer Paused",

        visible: true,
      });
    }
  }

  // Function to reset the timer
  function resetTimer() {
    isRunning = false;
    isPaused.set(true);
    clearInterval(interval!);
    currentTime = initialTime;
    time.set(currentTime);
       alertState.set({
        color: "green",
        text: "Timer Reset",

        visible: true,
      });
  }
</script>

<div class=" px-2 rounded-sm  dark:bg-gray-800 {$isPaused? 'bg-white' :'bg-green-300'}">
  <p class="text-center text-xs dark:text-white ">{$formattedTime}</p>
  <Button class="hover:bg-gray-300 p-1 m-0 rounded-full text-orange-500 disabled:text-black !bg-transparent dark:disabled:text-white  " on:click={startTimer} disabled={!$isPaused}><PlaySolid size="sm"/></Button>
  <Button class="hover:bg-gray-300 p-1 m-0 rounded-full text-orange-500 disabled:text-black dark:disabled:text-white !bg-transparent   " on:click={pauseTimer} disabled={$isPaused}><PauseSolid size="sm"/></Button>
  <Button class="hover:bg-gray-300 p-1 m-0 rounded-full text-orange-500 disabled:text-black !bg-transparent  dark:disabled:text-white  " on:click={resetTimer} disabled={$isPaused}><CotateSolid size="sm"/></Button>
</div>

<style>
  /* Add styles for the component here */


  h2 {
    font-size: 24px; /* Increase font size for the timer text */
    margin: 0; /* Remove default margin */
  }

  button {
    background-color: #0078d4; /* Change button background color to a blue shade */
    color: white; /* Set button text color to white */
    padding: 10px 20px; /* Add padding to the buttons for better clickability */
    margin: 5px; /* Add some margin between buttons */
    border: none; /* Remove button border */
    border-radius: 5px; /* Add rounded corners to buttons */
    cursor: pointer; /* Show a pointer cursor on hover */
  }


</style>

