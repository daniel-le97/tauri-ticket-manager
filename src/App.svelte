<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { dbService, type User } from "./db/service.js";
  import Greet from "./lib/Greet.svelte";
  import SideBar from "./lib/Components/SideBar.svelte";
  import MenuSectionOne from "./lib/Components/MenuSectionOne.svelte";
  import { readText } from "@tauri-apps/api/clipboard";
  import MenuSectionTwo from "./lib/Components/MenuSectionTwo.svelte";
  import MenuSectionThree from "./lib/Components/MenuSectionThree.svelte";

  let notesTextarea: string;
  let clipBoardText: string | null;
  let users: User;

  const clipboardCheckInterval = setInterval(() => {
    copyClipBoard();
  }, 1000);

  onMount(async () => {
    users = await dbService.getUsers();
    copyClipBoard();
  });

  async function copyClipBoard() {
    try {
      const text = await readText();
      // console.log(text);

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
    <div class="notes-and-sidebar-container">
      <textarea class="notes-area" id="notes-area" bind:value={notesTextarea} />

      <SideBar />
    </div>
    <div class="menu-container">
      <MenuSectionOne {clipBoardText} />
      <MenuSectionTwo {clipBoardText} />
      <MenuSectionThree {clipBoardText} />
    </div>
  </div>
</main>

<style>
  .main-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid #666;
    background-color: #2196f3;
  }

  .notes-and-sidebar-container {
    display: flex;
    justify-content: space-between;
    background-color: #4caf50;

    height: 79vh;
  }

  .notes-area {
    width: 98%; /* Initially take up most of the width */
    background-color: #ffc107;
    padding: 5px;
    padding-right: 10px;
    overflow-y: auto;
    resize: none;
  }

  .notes-area:focus {
    outline: none;
  }

  .menu-container {
    border-top: 4px black solid;
    display: flex;
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
