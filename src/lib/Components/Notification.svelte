<script>
  // @ts-nocheck

  import { Alert } from "flowbite-svelte";
  import { alertState } from "../stores/alert";
  import { fade } from "svelte/transition";



  // Function to automatically reset $alertVisible to false after 2 seconds
  function resetAlertVisible() {
    if ($alertState.visible) {
      setTimeout(() => {
        $alertState.visible = !$alertState.visible;
      }, 1500); // 2000 milliseconds = 2 seconds
    }
  }

  // Watch for changes in $alertVisible and call resetAlertVisible when it turns true
  $: {
    if ($alertState.visible) {
      resetAlertVisible();
    }
  }
</script>

{#if $alertState.visible}
  <div
    class="absolute  top-12 right-12 justify-center"
    transition:fade="{{ duration: 150 }}"
  >
    <Alert color="{$alertState.color}">
      <span class="font-medium">{$alertState.text}</span>
    </Alert>
  </div>
{/if}

<style>
</style>
