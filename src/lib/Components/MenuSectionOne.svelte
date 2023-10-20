<script lang="ts">
  import { clipboard } from "@tauri-apps/api";
  import { readText, writeText } from "@tauri-apps/api/clipboard";
  import { Button, Input } from "flowbite-svelte";

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

  $: {
    if (clipBoardText) {
      watchClipboardChanges();
    }
  }
</script>

<div class="menu-section  p-1">
  <ul class="line-row space-x-1 flex-wrap">
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
    <!-- <li class="flex items-center">
      <Input
        size="sm"
        placeholder="UserEmail"
        class=" rounded-sm"
      />
    </li> -->
  </ul>

  <div class="change-ticket-buttons flex justify-center items-center space-x-1">
    <Button class="py-1 rounded-sm" on:click={copyEverything}>
      Copy Everything
    </Button>
  <Button class="!p-2" color="alternative">   <img
        src="https://cdn-icons-png.flaticon.com/128/32/32766.png"
        alt="button"
        width="15"
        height="15"
      /></Button>
  <Button class="!p-2" color="alternative">   <img
        src="https://cdn-icons-png.flaticon.com/128/54/54366.png"
        alt="button"
        width="15"
        height="15"
      /></Button>
    
   
  </div>
</div>

<style>
  input {
    outline: none;
    padding: 3px;

    border-radius: 0px;
    outline: none;
    border: none;
    font-weight: 400;

    cursor: pointer;
    width: auto; /* Set the width to automatically grow as needed */
    max-width: 100px;
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

  .line-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .line-item {
    cursor: pointer;
  }
</style>
