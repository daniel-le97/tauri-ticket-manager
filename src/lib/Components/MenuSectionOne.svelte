<script lang="ts">
  import { writeText } from "@tauri-apps/api/clipboard";
  import {
    Badge,
    Button,
    GradientButton,
    Popover,
    Tooltip,
  } from "flowbite-svelte";
  import {
    ChevronDoubleRightOutline,
    ChevronLeftSolid,
    ChevronRightOutline,
    ChevronRightSolid,
    ClipboardCheckSolid,
    CotateSolid,
  } from "flowbite-svelte-icons";
  import {
    appState,
    resetAppState,
    timingButton,
    notesHistory,
  } from "../stores/appState";
  import { confirm } from "@tauri-apps/api/dialog";
  import { noteService } from "../services/notes.js";
  import { onMount } from "svelte";
  import { alertState } from "../stores/alert";
  import { notification } from "@tauri-apps/api";
  import { dbService } from "../../db/service.js";
  import logger from "../utils/logger";

  export let clipBoardText: string | null;

  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const assetTagRegex = /^[A-Za-z]{4}\d{8}$/;
  $: {
    if (clipBoardText) {
      watchClipboardChanges();
    }
  }
  const watchClipboardChanges = async () => {
    try {
      const emailMatches = clipBoardText?.match(emailRegex);
      if (emailMatches) {
        $appState.email = emailMatches[0];
      }
      const assetTagMatches = clipBoardText?.match(assetTagRegex);
      if (assetTagMatches) {
        $appState.asset = assetTagMatches[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function copyEverything() {
    try {
      let formattedNote = `Ticket: ${$appState.id}
Date: ${new Date().toLocaleString()}     
${$appState.email ? `Email: ${$appState.email}\n` : ""}${
        $appState.phone ? `Phone: ${$appState.phone}\n` : ""
      }${$appState.asset ? `Asset: ${$appState.asset}\n` : ""}

${$appState.description}
`;

      alertState.set({
        color: "green",
        text: "Copied!",

        visible: true,
      });
      await writeText(formattedNote);
    } catch (error) {
      logger()?.error(error);
    }
  }

  async function resetNoteTaker() {
    const count = await dbService.notes.count();
    console.log(count);

    if (await confirm("Reset Note?")) {
      const note = await noteService.save(true);
      await writeText("");
      resetAppState(note);
      alertState.set({
        color: "green",
        text: "Note Taker Reset",
        visible: true,
      });
    }
  }

  function handlePhoneNumberInput(event: any) {
    // Remove non-numeric characters
    const numericInput = event.target.value.replace(/\D/g, "");
    $appState.phone = numericInput;
  }

  async function handleDoubleClick(event: string) {
    await writeText(event);
  }

  async function prevNote() {
    try {
      await noteService.prev();
    } catch (error) {
      logger()?.error(error);
    }
  }
  async function saveNote() {
    try {
      // if ($timingButton) {
      //   return; // Exit the function if the button is disabled
      // }

      await noteService.next();
    } catch (error) {
      logger()?.error(error);
    }
  }

  async function skipToLatestTicket() {
    try {
      await noteService.getLatestNote();
    } catch (error) {
      logger()?.error(error);
    }
  }
</script>

<div class="menu-section p-1 py-2 bg-transparent">
  <ul class="line-row space-x-1 flex justify-start">
    <li class="line-item">
      <input
        type="text"
        on:dblclick="{() => handleDoubleClick($appState.email)}"
        placeholder="Email"
        bind:value="{$appState.email}"
        class="  focus:ring-0 {$appState.email.match(emailRegex)
          ? 'bg-green-200'
          : 'bg-white'} text-black"
      />
    </li>
    <li class="line-item">
      <input
        type="text"
        bind:value="{$appState.phone}"
        on:dblclick="{() => handleDoubleClick($appState.phone.toString())}"
        placeholder="Phone #"
        on:input="{handlePhoneNumberInput}"
        class="  focus:ring-0  {$appState.phone.toString().match(phoneRegex)
          ? 'bg-green-200'
          : 'bg-white'} text-black"
      />
    </li>
    <li class="line-item">
      <input
        type="text"
        on:dblclick="{() => handleDoubleClick($appState.asset)}"
        placeholder="Asset # "
        bind:value="{$appState.asset}"
        class="  focus:ring-0 {$appState.asset ? 'bg-green-200' : 'bg-white'} text-black"
      />
    </li>
  </ul>

  <div class="change-ticket-buttons flex justify-center items-center space-x-1">
    <div class="flex space-x-3">
      <Badge color="none" class="font-1 font-semibold text-base rounded-sm"
        ><span class="text-red-500 ">{$appState.id}</span>
      <span class="mx-1">  /</span>
        <button class="p-1 hover:bg-gray-300 rounded-md" on:click="{() => skipToLatestTicket()}"
          >{$notesHistory}</button
        ></Badge
      >

      <Button
        id="reset"
      
        class="!p-2 rounded-sm  bg-white  dark:bg-zinc-800"
        on:click="{resetNoteTaker}"
      >
        <CotateSolid class="cursor-pointer text-black outline-none border-none dark:text-white" />
      </Button>
  <Tooltip color="blue">Reset</Tooltip>
      <Button
        id="clipBoard"
        
        class="!p-2 mr-4  rounded-sm bg-white dark:bg-zinc-800"
        on:click="{copyEverything}"
      >
        <ClipboardCheckSolid class="cursor-pointer outline-none border-none text-black dark:text-white" />
      </Button>
      <Tooltip color="blue">Copy</Tooltip>
    </div>

    <div class=" pl-2">
      <Button class="!p-2 rounded-sm !bg-gray-100 text-zinc-800 dark:text-white dark:!bg-gray-800"  on:click="{prevNote}">
        <ChevronLeftSolid class="cursor-pointer outline-none border-none" />
      </Button>
      <Tooltip color="blue">Previous</Tooltip>
      <Button
        class="!p-2 rounded-sm !bg-gray-100 text-zinc-800 dark:text-white dark:!bg-gray-800"
       
        on:click="{saveNote}"
        disabled="{$timingButton}"
      >
        <ChevronRightSolid class="cursor-pointer outline-none border-none" />
      </Button>
      <Tooltip color="blue">New</Tooltip>
    </div>
  </div>
</div>

<style>
  input {
    outline: none;
padding: 7px;
    border-radius: 2px;
    outline: none;
    border: none;
    font-weight: 400;
    cursor: pointer;
    width: auto; /* Set the width to automatically grow as needed */
    max-width: 140px;
  }
  input:focus {
    border-bottom: #ff5733 2px solid;
    outline: none;
  }
  .menu-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .line-item {
    cursor: pointer;
  }

  @media (max-width: 900px) {
    input {
      max-width: 150px !important;
    }

    .line-row {
      flex-wrap: wrap;
    }
  }
</style>
