<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SideBar from "./lib/Components/SideBar.svelte";
  import MenuSectionOne from "./lib/Components/MenuSectionOne.svelte";
  import { readText } from "@tauri-apps/api/clipboard";
  import MenuSectionTwo from "./lib/Components/MenuSectionTwo.svelte";

  let notesTextarea: string;
  let clipBoardText: string | null;
  export let timerRunning: boolean = false;
  const clipboardCheckInterval = setInterval(() => {
    copyClipBoard();
  }, 1000);

  onMount(async () => {
    copyClipBoard();
  });

  $: {
    if (timerRunning) {
      console.log("two", timerRunning);
    }
  }
  function handleKeyDown(event: any) {
    timerRunning = true;

    const ctrlPressed = event.ctrlKey;
    const shiftPressed = event.shiftKey;
    const backspacePressed = event.key === "Backspace";

    if (ctrlPressed && shiftPressed && backspacePressed) {
      if (window.confirm("Are you sure?")) {
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

<main class="">
  <div class="main-container">
    <div class="notes-and-sidebar-container border-2 border-b-0 border-zinc-400">
      <textarea
        on:keydown={handleKeyDown}
        class="notes-area bg-zinc-900 focus:border-none border-none outline-none focus:outline-none focus-within:outline-none"
        id="notes-area"
        bind:value={notesTextarea}
      />
      <span class="notes-title text-white"> Ticket Manager </span>

      <!-- <SideBar /> -->
    </div>
    <div class="menu-container border-2 border-amber-400 bg-zinc-800">
      <MenuSectionOne {clipBoardText} />
      <MenuSectionTwo {timerRunning} />
    </div>
  </div>
</main>

<style>
  .main-container {
    height: 100vh;
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
