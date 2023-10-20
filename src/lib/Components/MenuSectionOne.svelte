<script lang="ts">
  import { clipboard, dialog } from "@tauri-apps/api";
  import { readText, writeText } from "@tauri-apps/api/clipboard";
  import { Button, Input, Tooltip } from "flowbite-svelte";
  import {
    ChevronLeftSolid,
    ChevronRightSolid,
    ClipboardCheckSolid,
  } from "flowbite-svelte-icons";
  let scrollingModal = false;
  let noteHeader = {
    ipv4: "IPV4",
    phone: "Phone#",
    ticketNumber: "Ticket#",
    assetTag: "Asset#",
    userEmail: "Email",
  };

  export let clipBoardText: string | null;

  const phoneRegex = /(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const ticketRegex = /^TN\d{8}$/;
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const assetTagRegex = /^[A-Za-z]{4}\d{8}$/;

  const watchClipboardChanges = async () => {
    try {
      const phoneMatches = clipBoardText?.match(phoneRegex);
      if (noteHeader.phone === "Phone#" && phoneMatches) {
        noteHeader.phone = phoneMatches[0];
      }

      const ticketMatches = clipBoardText?.match(ticketRegex);
      if (ticketMatches && noteHeader.ticketNumber === "Ticket#") {
        noteHeader.ticketNumber = ticketMatches[0].replace("Ticket: ", "");
      }

      const emailMatches = clipBoardText?.match(emailRegex);
      if (emailMatches) {
        noteHeader.userEmail = emailMatches[0];
      }

      const ipv4Matches = clipBoardText?.match(ipv4Regex);
      if (ipv4Matches) {
        noteHeader.ipv4 = ipv4Matches[0];
      }

      const assetTagMatches = clipBoardText?.match(assetTagRegex);
      if (assetTagMatches) {
        noteHeader.assetTag = assetTagMatches[0];
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function copyEverything() {
    try {
      let formattedNote = `Email: ${noteHeader.userEmail}
Phone: ${noteHeader.phone}
Asset: ${noteHeader.assetTag}
Ticket: ${noteHeader.ticketNumber}
Ipv4: ${noteHeader.ipv4}`;
      console.log(formattedNote);

      await writeText(formattedNote);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  function handlePhoneNumberInput(event: any) {
    // Remove non-numeric characters
    const numericInput = event.target.value.replace(/\D/g, "");
    noteHeader.phone = numericInput;
  }
  async function saveNote() {
    try {
      const confirmed2 = confirm("Are you sure?");
      if (confirmed2) {
        console.log("Save ticket Note, create new Ticket No");
      }
    } catch (error) {}
  }

  $: {
    if (clipBoardText) {
      watchClipboardChanges();
    }
  }
</script>

<div class="menu-section py-0 pt-2 p-1">
  <ul class="line-row space-x-1 flex justify-start">
    <li class="line-item">
      <input
        type="text"
        bind:value={noteHeader.userEmail}
        class={noteHeader.userEmail.match(emailRegex)
          ? "bg-green-200"
          : "bg-white"}
      />
    </li>

    <li class="line-item">
      <input type="text" bind:value={noteHeader.assetTag} />
    </li>
    <li class="line-item">
      <input type="text" bind:value={noteHeader.ipv4} />
    </li>

    <li class="line-item">
      <input type="text" bind:value={noteHeader.ticketNumber} />
    </li>
    <li class="line-item">
      <input
        type="text"
        bind:value={noteHeader.phone}
        placeholder="Phone Number"
        on:input={handlePhoneNumberInput}
      />
    </li>
  </ul>

  <div class="change-ticket-buttons flex justify-center items-center space-x-1">
    <Button
      id="clipBoard"
      color="primary"
      class="!p-2 mr-4"
      on:click={copyEverything}
    >
      <ClipboardCheckSolid class="cursor-pointer outline-none border-none" />
    </Button>
    <Tooltip
      placement="top"
      color="green"
      trigger="click"
      triggeredBy="#clipBoard">Copied</Tooltip
    >
    <Button class="!p-2" color="alternative">
      <ChevronLeftSolid class="cursor-pointer outline-none border-none" />
       <Tooltip color="blue">Previous</Tooltip>
    </Button>
    <Button class="!p-2" color="alternative" on:click={saveNote}>
      <ChevronRightSolid class="cursor-pointer outline-none border-none" />
       <Tooltip color="blue">New</Tooltip>
    </Button>
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
