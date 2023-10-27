<script lang="ts">
  import { appState, resetAppState } from "../stores/appState";
  import { noteService } from "../services/notes";
  import { onMount } from "svelte";
  import { activeTheme } from "../stores/colorTheme";
  import logger from "../utils/logger";
  import { startTimer } from "../stores/timer";
  import { getContrastColor } from "../utils/luminate";

  let textColor: string;
  let BGColor: string;
  async function handleKeyDown(event: any) {
    startTimer();
    const ctrlPressed = event.ctrlKey;
    const shiftPressed = event.shiftKey;
    const backspacePressed = event.key === "Backspace";

    if (ctrlPressed && shiftPressed && backspacePressed) {
      if (confirm("Reset NoteTaker?")) {
        resetAppState();
      }
    }
  }

  $: {
    BGColor = $activeTheme?.note_color || "#00000";
    textColor = getContrastColor(BGColor);
  }
  onMount(async () => {
    try {
      const response = await noteService.getCurrentNote();
      appState.set(response);
    } catch (error) {
      logger()?.error(error);
    }
  });
</script>

<textarea
  on:keydown="{handleKeyDown}"
  class="notes-area text-black border-none outline-none dark:text-white focus:outline-none focus:border-4 focus:border-orange-400"
  id="notes-area"
  style="background-color: {BGColor};  color: {textColor}"
  bind:value="{$appState.description}"></textarea>

<style>
  .notes-area {
    height: 80%;
    font-size: 16pt;
    width: 100%; /* Initially take up most of the width */

    padding: 5px;
    padding-top: 40px;
    padding-right: 10px;
    overflow-y: auto;
    resize: none;
  }
</style>
