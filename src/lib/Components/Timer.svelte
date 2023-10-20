<!-- Timer.svelte -->
<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { CirclePauseSolid, ClockOutline } from "flowbite-svelte-icons";
  import { timer } from "../store";

  let totalSeconds = 0;
  let formattedTime = "00:00:00";
  let timerStart: any;

  function startTimer() {
    $timer = true;
    timerStart = setInterval(() => {
      totalSeconds++;
    }, 1000);
  }

  function pauseTimer() {
    $timer = false;
    clearInterval(timerStart);
  }

  $: {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
</script>

<Button
  color="alternative"
  class="space-x-2 rounded-sm p-2"
  on:click={$timer ? pauseTimer : startTimer}
>
  {#if $timer}
    <CirclePauseSolid />
  {:else}
    <ClockOutline />
  {/if}
  <p class="{$timer? 'text-green-700' : 'text-orange-500'}">{formattedTime}</p>
</Button>
