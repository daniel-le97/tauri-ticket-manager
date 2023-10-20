<!-- Checklist.svelte -->
<script lang="ts">
  import { clipboard } from "@tauri-apps/api";
  import {
    Popover,
    GradientButton,
    Button,
    Toggle,
    AccordionItem,
    Accordion,
  } from "flowbite-svelte";
  let template = [
    {
      title: "General Call Template",
      template: `User's Stated Issue:
When did it last work:
How many users are affected: 


Troubleshooting Steps:
-------------------------------`,
    },
  ];
  let newTemplate = {
    title: "",

    template: "",
  };

  async function copyToClipboard(Template: string) {
    const textToCopy = Template;
    try {
      await clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  $: {
    newTemplate;
  }
</script>

<div class="  flex flex-col p-3 bg-red-50">
  <span>Create Template</span>
  <div class="flex flex-col space-y-3">
    <div class="flex">
      <input
        type="text"
        bind:value={newTemplate.title}
        placeholder="Title"
        id="new-title"
      />
    </div>

    <div>
      <textarea
        cols="70"
        rows="7"
        bind:value={newTemplate.template}
        placeholder="Add Item"
        id="new-Template"
      />
    </div>

    <div class="template-preview my-3 flex flex-col">
      <span class="text-lg font-semibold"> Title: {newTemplate.title}</span>

      <div class=" w-72 max-h-56 overflow-y-scroll">
        <pre>{@html newTemplate.template}</pre>
      </div>
    </div>
  </div>

  <div class="mt-4">
    <span class="text=xl font-semibold mb-4">Templates:</span>
    <ul class="mt-4">
      <li>
        {#each template as c}
          <GradientButton
            shadow
            color="blue"
            on:click={() => copyToClipboard(c.template)}
          >
            {c.title}</GradientButton
          >
          <Popover placement="top" class="w-80 text-sm">
            <div><pre>{@html c.template}</pre></div>
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
