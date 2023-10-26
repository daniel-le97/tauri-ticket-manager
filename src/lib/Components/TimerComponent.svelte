
<script lang="ts">
  import { writable, derived } from 'svelte/store';

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
    }
  }

  // Function to pause the timer
  function pauseTimer() {
    if (isRunning) {
      isRunning = false;
      isPaused.set(true);
      clearInterval(interval!);
    }
  }

  // Function to reset the timer
  function resetTimer() {
    isRunning = false;
    isPaused.set(true);
    clearInterval(interval!);
    currentTime = initialTime;
    time.set(currentTime);
  }
</script>

<div>
  <h2>{$formattedTime}</h2>
  <button on:click={startTimer} disabled={!$isPaused}>Start</button>
  <button on:click={pauseTimer} disabled={$isPaused}>Pause</button>
  <button on:click={resetTimer} disabled={$isPaused}>Reset</button>
</div>

<style>
  /* Add styles for the component here */
  div {
    background-color: #f0f0f0; /* Change the background color to a light gray */
    padding: 20px; /* Add some padding for spacing */
    border-radius: 10px; /* Add rounded corners to the container */
    text-align: center; /* Center-align the content */
  }

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

  button:disabled {
    background-color: #c0c0c0; /* Change the background color of disabled buttons to gray */
    cursor: not-allowed; /* Change cursor to not-allowed for disabled buttons */
  }
</style>

