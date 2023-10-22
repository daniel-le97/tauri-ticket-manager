<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Editor from '@tinymce/tinymce-svelte';
  import SideBar from "./lib/Components/SideBar.svelte";
  import MenuSectionOne from "./lib/Components/MenuSectionOne.svelte";
  import { readText } from "@tauri-apps/api/clipboard";
  import { confirm } from "@tauri-apps/api/dialog";
  import MenuSectionTwo from "./lib/Components/MenuSectionTwo.svelte";
  import { window } from "@tauri-apps/api";
  import TitleBar from "./lib/Components/TitleBar.svelte";
 import MainNoteArea from "./lib/Components/MainNoteArea.svelte";
  import {
    appState,
    resetAppState,
  } from "./lib/stores/appState";
    import { tinymceConfig } from "./tinymce.js";


  let notesTextarea: string;
  let clipBoardText: string | null;

  window.appWindow.setDecorations(false);

  const clipboardCheckInterval = setInterval(() => {
    copyClipBoard();
  }, 1000);

  onMount(async () => {
    copyClipBoard();
  });

  $: {
    $appState.description = notesTextarea;
  }
  async function handleKeyDown(event: any) {
    $appState.timerOn = true
    const ctrlPressed = event.ctrlKey;
    const shiftPressed = event.shiftKey;
    const backspacePressed = event.key === "Backspace";

    if (ctrlPressed && shiftPressed && backspacePressed) {
      if (await confirm("Reset NoteTaker?")) {
        resetAppState();
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

 
  // let conf = {
  //       selector: "textarea",
  //       height: "75vh",
  //       width: "100vw",
  //       statusbar: false,
  //       resize: false,
  //       min_height: 450,
  //       max_height: 1000,
  //       promotion:false,
  //       autoresize_bottom_margin: 0,
  //       plugins:
  //         "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
  //       toolbar:
  //         "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
  //       tinycomments_mode: "embedded",
  //       tinycomments_author: "Author name",
  //       mergetags_list: [
  //         { value: "First.Name", title: "First Name" },
  //         { value: "Email", title: "Email" },
  //       ]
  //     }
  const conf = tinymceConfig
</script>

<main class="pt-9">
  <TitleBar />
  <div class="main-container">
    <div
      class="notes-and-sidebar-container border-2 border-y-0 border-zinc-400"
    >
      <!-- <textarea
        on:keydown="{handleKeyDown}"
        class="notes-area bg-zinc-900"
        id="notes-area"
        bind:value="{$appState.description}"></textarea> -->
<!-- {#await tinymce}
  <p>loading...</p>
{:then tiny} 

{/await} -->
<Editor scriptSrc="../node_modules/tinymce/tinymce.js" {conf} ></Editor>
      <!-- <MainNoteArea/> -->
    </div>
    <div class="menu-container border-2 border-amber-400 bg-zinc-800">
      <MenuSectionOne clipBoardText="{clipBoardText}" />
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
    background-color:white;

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
