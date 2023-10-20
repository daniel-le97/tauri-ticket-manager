<!-- Timer.svelte -->
<script lang="ts">
  import { ArrowKeyDown, Button } from "flowbite-svelte";
  import { ArrowDownSolid, CirclePauseSolid, ClockOutline } from "flowbite-svelte-icons";
  let isRunning = false;
  let seconds = 0;
  let timer: number | undefined;

  function startTimer() {
    isRunning = true;
    timer = setInterval(() => {
      seconds++;
    }, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
  }
</script>

<button on:click={isRunning ? pauseTimer : startTimer}>

  {#if isRunning}
  <CirclePauseSolid />
  {:else}
 <ClockOutline />
  {/if}

</button>
<p>{seconds} seconds</p>
