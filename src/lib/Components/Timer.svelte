<!-- Timer.svelte -->
<script lang="ts">
  import { Button, GradientButton } from "flowbite-svelte";
  import { CirclePauseSolid, ClockOutline } from "flowbite-svelte-icons";

  import { appState } from "../stores/appState.js";
  import { pauseTimer, startTimer, timer } from "../stores/timer.js";



  // function startTimer() {
  //   // Update the timer store state
  //   timer.update((state) => {
  //     state.timerOn = true;
  //     state.timerStart = setInterval(() => {
  //       state.totalSeconds++;
  //     }, 1000);
  //     return state;
  //   });
  // }

  // function pauseTimer() {
  //   // Update the timer store state
  //   timer.update((state) => {
  //     state.timerOn = false;
  //     clearInterval(state.timerStart);
  //     return state;
  //   });
  // }

  $: {
    // Calculate the formatted time and update the timer store state
    const { totalSeconds } = $timer;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    timer.update((state) => {
      state.formattedTime = `${hours < 10 ? '0' : ''}${hours}:${
        minutes < 10 ? '0' : ''
      }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      state.timerCount = state.formattedTime;
      return state;
    });
  }
</script>

<GradientButton
  color="{$timer.timerOn ? 'green' : 'red'}"
  class="space-x-2 p-2 rounded-sm"
  on:click="{$timer.timerOn ? pauseTimer : startTimer}"
>
  {#if $timer.timerOn}
    <CirclePauseSolid />
  {:else}
    <ClockOutline />
  {/if}
  <p>{$timer.formattedTime}</p>
</GradientButton>