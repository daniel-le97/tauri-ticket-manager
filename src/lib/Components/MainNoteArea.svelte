<script lang="ts">
  import {
    Textarea,
    Toolbar,
    ToolbarGroup,
    ToolbarButton,
    Button,
  } from "flowbite-svelte";
  import {
    PaperClipOutline,
    MapPinAltSolid,
    ImageOutline,
    CodeOutline,
    FaceGrinOutline,
    PapperPlaneOutline,
  } from "flowbite-svelte-icons";
  import { appState, resetAppState } from "../stores/appState";
  
import startTimer from './Timer.svelte'

  async function handleKeyDown(event: any) {
    // startTimer
    $appState.timerOn = true;
    const ctrlPressed = event.ctrlKey;
    const shiftPressed = event.shiftKey;
    const backspacePressed = event.key === "Backspace";

    if (ctrlPressed && shiftPressed && backspacePressed) {
      if ( confirm("Reset NoteTaker?")) {
        resetAppState();
      }
    }
  }
</script>

{#if $appState.textEditor}
  <form class="w-full h-full">
    <label for="editor" class="sr-only">Publish post</label>
    <Textarea id="editor"  class="mb-4 h-full rounded-none" placeholder="Write a comment">
      <Toolbar slot="header" color="gray" embedded>
        <ToolbarGroup>
          <ToolbarButton name="Attach file"
            ><PaperClipOutline class="w-5 h-5 rotate-45" /></ToolbarButton
          >
          <ToolbarButton name="Embed map"
            ><MapPinAltSolid class="w-5 h-5" /></ToolbarButton
          >
          <ToolbarButton name="Upload image"
            ><ImageOutline class="w-5 h-5" /></ToolbarButton
          >
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton name="Format code"
            ><CodeOutline class="w-5 h-5" /></ToolbarButton
          >
          <ToolbarButton name="Add emoji"
            ><FaceGrinOutline class="w-5 h-5" /></ToolbarButton
          >
        </ToolbarGroup>
        <ToolbarButton name="send" slot="end"
          ><PapperPlaneOutline class="w-5 h-5 rotate-45" /></ToolbarButton
        >
      </Toolbar>
    </Textarea>

  </form>
{:else}
  <textarea
    on:keydown="{handleKeyDown}"
    class="notes-area bg-zinc-900"
    id="notes-area"
    bind:value="{$appState.description}"></textarea>
{/if}

<style scoped>
  .notes-area {
    font-size: 16pt;
    width: 100%; /* Initially take up most of the width */
    color: white;
    padding: 5px;
    padding-right: 10px;
    overflow-y: auto;
    resize: none;
  }

  .notes-area:focus {
    outline: none;
  }
</style>
