<!-- Checklist.svelte -->
<script lang="ts">
  import { clipboard } from "@tauri-apps/api";
  import { Popover, GradientButton, Button } from "flowbite-svelte";
  let checkLists = [
    {
      title: "General Call Template",
      list: [
        `User's Stated Issue:`,
        "When did it last work:",
        "How many users are affected: ",
        "",
        "",
        "Troubleshooting Steps:",
        "-------------------------------",
      ],
    },
    {
      title: "Software Installation",
      list: [
        `User's Stated Issue:`,
        "Operating System:",
        "Installation Date:",
        "Error Message:",
        "Troubleshooting Steps:",
        "-------------------------------",
      ],
    },
    {
      title: "Network Connection",
      list: [
        `User's Stated Issue:`,
        "Wired or Wireless:",
        "Router Model:",
        "IP Address:",
        "Troubleshooting Steps:",
        "-------------------------------",
      ],
    },
    {
      title: "Password Reset",
      list: [
        `User's Stated Issue:`,
        "Account Username:",
        "Last Successful Login:",
        "Security Questions:",
        "Troubleshooting Steps:",
        "-------------------------------",
      ],
    },
    {
      title: "Hardware Issue",
      list: [
        `User's Stated Issue:`,
        "Device Type:",
        "Serial Number:",
        "Description of Issue:",
        "Troubleshooting Steps:",
        "-------------------------------",
      ],
    },
  ];
  let newCheckList = {
    title: "",
    list: [""],
  };

  let newListItem = "";

  function addListItem() {
    if (newListItem) {
      newCheckList.list = [...newCheckList.list, newListItem];

      newListItem = ""; // Clear the input field after adding
    }
  }

  async function copyToClipboard(list: string[]) {
    const textToCopy = list.join("\n");
    try {
      await clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  $: {
    newCheckList;
  }
</script>

<div class=" my-10 flex flex-col p-3">
  <div class="flex flex-col space-y-3">
    <div class="flex">
      <input
        type="text"
        bind:value={newCheckList.title}
        placeholder="Title"
        id="new-title"
      />
    </div>

    <div class="flex space-x-3">
      <textarea
        cols="30"
        bind:value={newListItem}
        placeholder="Add Item"
        id="new-item"
      />
      <Button color="dark" disabled={newListItem === ""} on:click={addListItem}
        >Add list Item</Button
      >
    </div>

    <div class="checklist-preview my-3">
      <span class="text-lg font-semibold"> Title: {newCheckList.title}</span>
      <br />

      <div>{@html newCheckList.list.join("<br>")}</div>
    </div>
  </div>

  <div class="my-10">
    <span class="text=xl font-semibold mb-4"> CheckLists | Templates</span>
    <ul class="mt-4">
      <li>
        {#each checkLists as c}
          <GradientButton
            shadow
            color="blue"
            on:click={() => copyToClipboard(c.list)}
          >
            {c.title}</GradientButton
          >
          <Popover placement="top" class="w-80 text-sm">
            <div>{@html c.list.join("<br>")}</div>
          </Popover>
        {/each}
      </li>
    </ul>
  </div>
</div>

<style>
  input {
    color: black !important;
  }
</style>
