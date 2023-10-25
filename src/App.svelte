<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { readText } from "@tauri-apps/api/clipboard";
  import TitleBar from "./lib/Components/TitleBar.svelte";
  import MenuSectionOne from "./lib/Components/MenuSectionOne.svelte";
  import MenuSectionTwo from "./lib/Components/MenuSectionTwo.svelte";
  import MainNoteArea from "./lib/Components/MainNoteArea.svelte";
  import Notification from "./lib/Components/Notification.svelte";

  import { dbService } from "./db/service";
  import { notesHistory } from "./lib/stores/appState";
  import { window } from "@tauri-apps/api";
  import { menuColor } from "./lib/stores/colorTheme";

  let clipBoardText: string | null;

  window.appWindow.setDecorations(false);

  const clipboardCheckInterval = setInterval(() => {
    copyClipBoard();
  }, 1000);

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

  const getAllNotes = async () => {
    try {
      const res = await dbService.notes.getAll();
      $notesHistory = res;
    } catch (error) {}
  };

  onMount(async () => {
    copyClipBoard();

    getAllNotes();
  });
  onDestroy(() => {
    clearInterval(clipboardCheckInterval);
  });
</script>

<TitleBar />
<main class=" " style="background-color: {$menuColor};">
  <div class="main-container">
    <div class="flex justify-between   h-full">
      <MainNoteArea />
    </div>
    <!-- <div
      class="flex flex-col   fixed bottom-0 w-full   "
    >
      <MenuSectionOne clipBoardText="{clipBoardText}" />
      <MenuSectionTwo />
    </div> -->
  </div>
</main>
<Notification />

<style>

  
  .main-container {
    height: 100vh;
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
