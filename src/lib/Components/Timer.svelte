<!-- Timer.svelte -->
<script lang="ts">
  import { Button, GradientButton } from "flowbite-svelte";
  import { CirclePauseSolid, ClockOutline } from "flowbite-svelte-icons";

  import { appState } from "../stores/appState.js";

  let totalSeconds = 0;
  // let formattedTime = "00:00:00";
  let timerStart: any;

  function startTimer() {
    $appState.timerOn = true;
    timerStart = setInterval(() => {
      totalSeconds++;
    }, 1000);
  }

  function pauseTimer() {
    $appState.timerOn = false;
    clearInterval(timerStart);
  
  }

  $: {
    if ($appState.timerOn == true) {
     startTimer() 
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    $appState.formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    $appState.timerCount = $appState.formattedTime;
  }
</script>

<GradientButton
  color="{$appState.timerOn ? 'green' : 'red'}"
  class="space-x-2  p-2  rounded-sm "
  on:click="{$appState.timerOn ? pauseTimer : startTimer}"
>
  {#if $appState.timerOn}
    <CirclePauseSolid />
  {:else}
    <ClockOutline />
  {/if}
  <p>{$appState.formattedTime}</p>
</GradientButton>
