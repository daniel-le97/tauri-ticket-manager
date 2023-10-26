<script lang="ts">
  import { writeText } from "@tauri-apps/api/clipboard";
  import { Badge, Button, GradientButton, Tooltip } from "flowbite-svelte";
  import {
    ChevronLeftSolid,
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
      let formattedNote = `
Ticket: ${$appState.id}
Time: ${$appState.timerCount}
Date: ${new Date($appState.date).toLocaleString()}     
Email: ${$appState.email}
Phone: ${$appState.phone}
Asset: ${$appState.asset}

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
      if ($timingButton) {
        return; // Exit the function if the button is disabled
      }

      await noteService.next();
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
        class="{$appState.email.match(emailRegex)
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
        class="{$appState.phone.toString().match(phoneRegex)
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
        class="{$appState.asset.match(assetTagRegex)
          ? 'bg-green-200'
          : 'bg-white'} text-black"
      />
    </li>
  </ul>

  <Badge color="none" class="font-1 font-semibold text-base"
    >Id:<span class="text-red-500">{$appState.id}</span>
    /{$notesHistory}</Badge
  >

  <div class="change-ticket-buttons flex justify-center items-center space-x-1">
    <div class="flex space-x-3">
      <GradientButton
        id="reset"
        color="lime"
        class="!p-2 "
        on:click="{resetNoteTaker}"
      >
        <CotateSolid class="cursor-pointer outline-none border-none" />
      </GradientButton>

      <GradientButton
        id="clipBoard"
        color="pink"
        class="!p-2 mr-4  "
        on:click="{copyEverything}"
      >
        <ClipboardCheckSolid class="cursor-pointer outline-none border-none" />
      </GradientButton>
    </div>

    <div class=" pl-2">
      <Button class="!p-2" color="alternative" on:click="{prevNote}">
        <ChevronLeftSolid class="cursor-pointer outline-none border-none" />
      </Button>
      <Tooltip color="blue">Previous</Tooltip>
      <Button
        class="!p-2"
        color="alternative"
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
      max-width: 100px !important;
    }

    .line-row {
      flex-wrap: wrap;
    }
  }
</style>
