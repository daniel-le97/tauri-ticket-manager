<!-- Checklist.svelte -->
<script lang="ts">
  import { clipboard, notification } from "@tauri-apps/api";
  import {
    Popover,
    GradientButton,
    Button,
    Spinner,
    Input,
    Textarea,
  } from "flowbite-svelte";
  import { title, content, tag } from "../stores/template.js";
  import { Template, type ITemplate, TemplateDTO } from "../../db/types.js";
  import { dbService } from "../../db/service.js";
  import { templateService } from "../services/template.js";
  import { onMount } from "svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { confirm } from "@tauri-apps/api/dialog";

  let templates: TemplateDTO[];
  let editMode: boolean = false;

  
 

  onMount(async () => {
    await getTemplates();
  });

  async function getTemplates() {
    templates = await dbService.templates.getAll();
  }
  async function addTemplate() {
    const template = await templateService.addTemplate();
    await getTemplates();
  }

  async function editTemplate() {
    console.log("edit");
  }
  async function copyToClipboard(Template: string) {
    const textToCopy = Template;
    try {
      await clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  function handleEdit(template: any) {
    ($title = template.title),
      ($content = template.content),
      ($tag = template.tag);
  } 

  async function handleDelete(id: number) {
    try {
      if (await confirm("Delete?")) {
        await templateService.deleteTemplate(id);

       await getTemplates();
      }
    } catch (error) {

    }
  }
</script>

<div class="  flex  p-3 space-x-3 relative ">
  <div class=" w-1/2 flex flex-col space-y-3  ">
    {#if !editMode}
      <div class="text-base font-semibold">Create Template</div>
      <form
        on:submit|preventDefault|stopPropagation="{addTemplate}"
        class="flex flex-col space-y-1"
      >
        <div class="flex">
          <Input
            type="text"
            required
            min="1"
            minlength="1"
            size="sm"
            bind:value="{$title}"
            placeholder="Title"
            class="w-1/3"
            id="new-title"
          />
        </div>
        <div class="flex">
          <Input
            type="text"
            class="w-1/3"
            size="sm"
            bind:value="{$tag}"
            placeholder="Tag"
            id="new-tag"
          />
        </div>

        <div>
          <Textarea
            cols="70"
            rows="7"
            required
            minlength="1"
            bind:value="{$content}"
            placeholder="Add Content"
            id="new-Template"
          />
        </div>
        <div>
          <GradientButton type="submit" color="green">Add</GradientButton>
        </div>
      </form>
    {:else}
    <div class="sticky top-0">
  <div class="text-base font-semibold">Edit Template</div>
      <form
        on:submit|preventDefault|stopPropagation="{editTemplate}"
        class="flex flex-col space-y-1"
      >
        <div class="flex">
          <Input
            type="text"
            required
            min="1"
            minlength="1"
            size="sm"
            bind:value="{$title}"
            placeholder="Title"
            class="w-1/3 bg-red-100"
            id="new-title"
          />
        </div>
        <div class="flex">
          <Input
            type="text"
            class="w-1/3 bg-red-100"
            size="sm"
            bind:value="{$tag}"
            placeholder="Tag"
            id="new-tag"
          />
        </div>

        <div>
          <Textarea
            cols="70"
            rows="7"
            required
            minlength="1"
            bind:value="{$content}"
            placeholder="Add Content"
            class="bg-red-100"
            id="new-Template"
          />
        </div>
        <div class="">
          <GradientButton type="submit" color="green">Edit</GradientButton>
        </div>
      </form>

    </div>
    {/if}
  </div>

  <div class="mt-4 w-1/2">
    <span class="text=xl font-semibold mb-4">Templates:</span>
    <Button color="red" on:click="{() => (editMode = !editMode)}"
      >Edit Templates</Button
    >

   {#if  editMode}
      <ul class="mt-4 flex gap-2 flex-wrap">
        {#each templates as template (template.id)}
          <li>
            <GradientButton
              color="red"
              class=""
              on:click="{ () => handleEdit(template)}"
            >
              {template.title}</GradientButton
            >
            <Popover placement="top" class="w-80 text-sm">
              <div><pre>{@html template.content}</pre></div>
              <Button
                outline="{true}"
                class="!p-2"
                size="sm"
                on:click="{() => handleDelete(template.id)}"
              >
                <TrashBinSolid class="w-3 h-3 " />
              </Button>
            </Popover>
          </li>
        {/each}
      </ul>
    {:else if !templates && editMode}
      <Spinner />
    {/if}
  </div>
</div>




<!-- 


 {#if templates && !editMode}
      <ul class="mt-4 flex gap-2 flex-wrap">
        {#each templates as template (template.id)}
          <li>
            <GradientButton
              shadow
              color="blue"
              on:click="{() => copyToClipboard(template.content)}"
            >
              {template.title}</GradientButton
            >
            <Popover  placement="top" class="w-80 text-sm">
              <div><pre>{@html template.content}</pre></div>
            </Popover>
          </li>
        {/each}
      </ul>
    {:else }

 -->
<style>
</style>
