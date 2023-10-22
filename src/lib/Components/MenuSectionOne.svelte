<script lang="ts">
  import { clipboard, dialog, notification } from "@tauri-apps/api";
  import { readText, writeText } from "@tauri-apps/api/clipboard";
  import { Button, Input, Tooltip } from "flowbite-svelte";
  import { sendNotification } from "@tauri-apps/api/notification";
  import {
    ChevronLeftSolid,
    ChevronRightSolid,
    ClipboardCheckSolid,
  } from "flowbite-svelte-icons";
  import {
    description,
    asset,
    timerCount,
    email,
    phone,
    ticket,
  } from "../stores/note";

  let noteHeader = {
    ipv4: "",
    phone: "",
    ticketNumber: "",
    assetTag: "",
    userEmail: "",
  };

  $: {
    // $email = noteHeader.userEmail;
    // $asset = noteHeader.assetTag;
    // $phone = noteHeader.phone;
    // $ticket = noteHeader.ticketNumber;
  }

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
        $phone = phoneMatches[0];
      }

      const ticketMatches = clipBoardText?.match(ticketRegex);
      if (ticketMatches && noteHeader.ticketNumber === "Ticket#") {
        $ticket = ticketMatches[0].replace("Ticket: ", "");
      }

      const emailMatches = clipBoardText?.match(emailRegex);
      if (emailMatches) {
        $email = emailMatches[0];
      }

      // const ipv4Matches = clipBoardText?.match(ipv4Regex);
      // if (ipv4Matches) {
      //   noteHeader.ipv4 = ipv4Matches[0];
      // }

      const assetTagMatches = clipBoardText?.match(assetTagRegex);
      if (assetTagMatches) {
        $asset = assetTagMatches[0];
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
Ipv4: ${noteHeader.ipv4}
-----------------------------------
${$description}

`;
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
      notification.sendNotification("Tauri is awesome");

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
        placeholder="Email"
        bind:value="{$email}"
        class="{noteHeader.userEmail.match(emailRegex)
          ? 'bg-green-200'
          : 'bg-white'}"
      />
    </li>

    <li class="line-item">
      <input
        type="text"
        placeholder="Asset # "
        bind:value="{$asset}"
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
        placeholder="Ticket #"
        bind:value="{$ticket}"
      />
    </li>
    <li class="line-item">
      <input
        type="text"
        bind:value="{$phone}"
        placeholder="Phone #"
        on:input="{handlePhoneNumberInput}"
      />
    </li>
  </ul>

  <div class="change-ticket-buttons flex justify-center items-center space-x-1">
    <Button
      id="clipBoard"
      color="primary"
      class="!p-2 mr-4"
      on:click="{copyEverything}"
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
    <Button class="!p-2" color="alternative" on:click="{saveNote}">
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
