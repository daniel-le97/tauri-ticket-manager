<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SideBar from "./lib/Components/SideBar.svelte";
  import MenuSectionOne from "./lib/Components/MenuSectionOne.svelte";
  import { readText } from "@tauri-apps/api/clipboard";
  import { confirm } from "@tauri-apps/api/dialog";
  import MenuSectionTwo from "./lib/Components/MenuSectionTwo.svelte";
  import { window } from "@tauri-apps/api";

  import TitleBar from "./lib/Components/TitleBar.svelte";
  let notesTextarea: string;
  let clipBoardText: string | null;

  window.appWindow.setDecorations(false);

  const clipboardCheckInterval = setInterval(() => {
    copyClipBoard();
  }, 1000);

  onMount(async () => {
    copyClipBoard();
  });

  async function handleKeyDown(event: any) {
    const ctrlPressed = event.ctrlKey;
    const shiftPressed = event.shiftKey;
    const backspacePressed = event.key === "Backspace";

    if (ctrlPressed && shiftPressed && backspacePressed) {
      if ( await confirm("Are you sure?")) {
        notesTextarea = ""; // Clear the textarea
      }
    }
  }

  async function copyClipBoard() {
    try {
      const text = await readText();

      if (text !== clipBoardText) {
        clipBoardText = text;
      }
    } catch (error) {
      console.error("Error reading clipboard text:", error);
    }
  }

  onDestroy(() => {
    clearInterval(clipboardCheckInterval);
  });
</script>

<main class="pt-9">
  <TitleBar />
  <div class="main-container">
    <div
      class="notes-and-sidebar-container border-2  border-y-0 border-zinc-400"
    >
      <textarea
        on:keydown={handleKeyDown}
        class="notes-area bg-zinc-900"
        id="notes-area"
        bind:value={notesTextarea}
      />
    </div>
    <div class="menu-container border-2 border-amber-400 bg-zinc-800">
      <MenuSectionOne {clipBoardText} />
      <MenuSectionTwo />
    </div>
  </div>
</main>

<style>
  .main-container {
    height: 94vh;
    display: flex;
    flex-direction: column;
  }

  .notes-and-sidebar-container {
    display: flex;
    justify-content: space-between;
    background-color: #4caf50;

    height: 80%;
  }

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

  .notes-title {
    position: absolute;
    top: 1%;
    right: 3%;
    font-size: 16pt;
    font-weight: 500;
    opacity: 50%;
    cursor: default;
  }
  .menu-container {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  /* For Webkit-based browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px; /* Adjust the width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #333; /* Track color */
  }

  ::-webkit-scrollbar-thumb {
    background: #e0ded9; /* Thumb color */
    border-radius: 6px; /* Thumb border radius */
  }
</style>
