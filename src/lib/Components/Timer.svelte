<!-- Timer.svelte -->
<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { CirclePauseSolid, ClockOutline } from "flowbite-svelte-icons";

  let totalSeconds = 0;
  export let timerRunning: boolean;
  console.log(timerRunning);

  $: {
    if (timerRunning) {
      console.log(timerRunning);
      timerRunning = !timerRunning;
    }
  }
  let timer: number | undefined;
  let formattedTime = "00:00:00";
  function startTimer() {
    timerRunning = true;
    timer = setInterval(() => {
      totalSeconds++;
    }, 1000);
  }

  function pauseTimer() {
    timerRunning = false;
    clearInterval(timer);
  }

  $: {
    timerRunning;
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
  class="space-x-2 rounded-sm "
  on:click={timerRunning ? pauseTimer : startTimer}
>
  {#if timerRunning}
    <ClockOutline />
  {:else}
    <CirclePauseSolid />
  {/if}

  <p>{formattedTime}</p>
</Button>
