<script lang="ts">
  import {  writeText } from "@tauri-apps/api/clipboard";
  import { Button, GradientButton, Input, Tooltip } from "flowbite-svelte";
  import {
    ChevronLeftSolid,
    ChevronRightSolid,
    ClipboardCheckSolid,
    PenSolid,
    XCompanySolid,
  } from "flowbite-svelte-icons";

  import { appState, resetAppState , timingButton} from "../stores/appState";
  import { confirm } from "@tauri-apps/api/dialog";
    import { noteService } from "../services/notes.js";
    import { writable } from "svelte/store";

  export let clipBoardText: string | null;

  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const ticketRegex = /^TN\d{8}$/;
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const assetTagRegex = /^[A-Za-z]{4}\d{8}$/;

  const watchClipboardChanges = async () => {
    try {
      const emailMatches = clipBoardText?.match(emailRegex);
      if (emailMatches) {
        $appState.email = emailMatches[0];
      }
      const phoneMatches = clipBoardText?.match(phoneRegex);
      if (phoneMatches) {
        $appState.phone = phoneMatches[0];
      }

      const ticketMatches = clipBoardText?.match(ticketRegex);
      if (ticketMatches) {
        $appState.ticket = ticketMatches[0];
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
Time: ${$appState.timerCount}
Date: ${new Date($appState.date).toLocaleString()}     
Email: ${$appState.email}
Phone: ${$appState.phone}
Asset: ${$appState.asset}
Ticket: ${$appState.ticket}

${$appState.description}

`;

      await writeText(formattedNote);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  async function resetNoteTaker() {
    if (await confirm("Reset NoteTake?")) {
      resetAppState();
      await writeText("");
    }
  }

  function handlePhoneNumberInput(event: any) {
    // Remove non-numeric characters
    const numericInput = event.target.value.replace(/\D/g, "");
    $appState.phone = numericInput;
  }

  async function handleDoubleClick(event: string) {
   await writeText(event)
  }

  // async function saveNote() {
  //   try {
  //     await noteService.next()
      
  //   } catch (error) {}
  // }


async function saveNote() {
  if ($timingButton) {
    return; // Exit the function if the button is disabled
  }

  
  try {
    await noteService.next();
  } catch (error) {
    // Handle errors here if needed
  } 
  // finally {
  //   // Enable the button after a delay (e.g., 1 second)
  //   setTimeout(() => {
  //     isButtonDisabled = false;
  //   }, 1000); // 1000 milliseconds = 1 second
  // }
}

  $: {
    if (clipBoardText) {
      watchClipboardChanges();
    }
  }


  async function prevNote(){
    try {
      await noteService.prev()
    } catch (error) {
      
    }
  }
</script>

<div class="menu-section  p-1 py-2">
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
          on:dblclick="{() => handleDoubleClick($appState.asset)}"
        placeholder="Asset # "
        bind:value="{$appState.asset}"
        class="{$appState.asset.match(assetTagRegex)
          ? 'bg-green-200'
          : 'bg-white'} text-black"
      />
    </li>
    <!-- <li class="line-item">
      <input
        type="text"
        placeholder="Ipv4 Address"
        bind:value="{noteHeader.ipv4}"
      />
    </li> -->

    <li class="line-item">
      <input
        type="text"
          on:dblclick="{() => handleDoubleClick($appState.ticket)}"
        placeholder="Ticket #"
        bind:value="{$appState.ticket}"
        class="{$appState.ticket.match(ticketRegex)
          ? 'bg-green-200'
          : 'bg-white'} text-black"
      />
    </li>
    <li class="line-item">
      <input
        type="text"
        bind:value="{$appState.phone}"
          on:dblclick="{() => handleDoubleClick($appState.phone)}"
        placeholder="Phone #"
        on:input="{handlePhoneNumberInput}"
        class="{$appState.phone.match(phoneRegex)
          ? 'bg-green-200'
          : 'bg-white'} text-black"
      />
    </li>
  </ul>
<p>{$appState.id}</p>
  <div class="change-ticket-buttons flex justify-center items-center space-x-1">
    <div class="flex space-x-3">
   <GradientButton
        id="reset"
        color="teal"
        class="!p-2 "
        on:click="{()=> $appState.textEditor = !$appState.textEditor}"
      >
        <PenSolid/>
      </GradientButton>
      <Tooltip
        placement="top"
        color="green"
        trigger="hover"
        triggeredBy="#reset">Reset</Tooltip
      >



      <GradientButton
        id="reset"
        color="lime"
        class="!p-2 "
        on:click="{resetNoteTaker}"
      >
        <XCompanySolid class="cursor-pointer outline-none border-none" />
      </GradientButton>
      <Tooltip
        placement="top"
        color="green"
        trigger="hover"
        triggeredBy="#reset">Reset</Tooltip
      >

      <GradientButton
        id="clipBoard"
        color="pink"
        class="!p-2 mr-4  "
        on:click="{copyEverything}"
      >
        <ClipboardCheckSolid class="cursor-pointer outline-none border-none" />
      </GradientButton>
      <Tooltip
        placement="top"
        color="pink"
        trigger="hover"
        triggeredBy="#clipBoard">Copied</Tooltip
      >
    </div>

    <div class=" pl-2">
      <Button class="!p-2" color="alternative" on:click="{prevNote}">
        <ChevronLeftSolid class="cursor-pointer outline-none border-none" />
      </Button>
      <Tooltip color="blue">Previous</Tooltip>
      <Button class="!p-2" color="alternative" on:click="{saveNote}">
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
    border: #ff5733 1px solid;
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
