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
  import {
    title,
    content,
    tag,
    editingTemplate,
    activeTemplate,
  } from "../stores/template.js";
  import { Template, type ITemplate, TemplateDTO } from "../../db/types.js";
  import { dbService } from "../../db/service.js";
  import { templateService } from "../services/template.js";
  import { onMount } from "svelte";
  import { PenSolid, TrashBinSolid } from "flowbite-svelte-icons";
  import { confirm } from "@tauri-apps/api/dialog";
  import { get, writable } from "svelte/store";

  let templates: TemplateDTO[];

  onMount(async () => {
    await getTemplates();
  });

  async function getTemplates() {
    templates = await dbService.templates.getAll();
  }
  async function addTemplate() {
    try {
      const template = await templateService.addTemplate();
      await getTemplates();
    } catch (error) {
      // handle errors
    }
  }

  async function handleEdit() {
    try {
     await templateService.update();
      await getTemplates();
    } catch (error) {}
  }



  async function editTemplate(template: TemplateDTO) {
    try {
      $editingTemplate = true;

      if (template.id === $activeTemplate?.id) {
        $editingTemplate = false;
      }

      if ($editingTemplate !== true) {
        $title = "";
        $content = "";
        $tag = "";
        $activeTemplate = null;
        return;
      }

      $title = template.title;
      $content = template.content;
      $tag = template.tag;
      $activeTemplate = template;
    } catch (error) {}
  }

  async function handleDelete(id: number) {
    try {
      if (await confirm("Delete?")) {
        await templateService.deleteTemplate(id);

        await getTemplates();
      }
    } catch (error) {}
  }
</script>

<div class="  flex p-3 space-x-3 relative">
  <div class=" w-1/2 flex flex-col space-y-3">
    <div class="text-base font-semibold">Create Template</div>

    <div class="sticky top-0">
      <div class="text-base font-semibold">Edit Template</div>
      <form
        on:submit|preventDefault|stopPropagation="{$editingTemplate
          ? () => handleEdit()
          : () => addTemplate()}"
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
            class="w-1/3 {$editingTemplate? "bg-red-200" : ""}"
            id="new-title"
          />
        </div>
        <div class="flex">
          <Input
            type="text"
            class="w-1/3 "
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
            class=""
            id="new-Template"
          />
        </div>
        <div class="">
          <GradientButton type="submit" color="green"
            >{$editingTemplate ? "Save" : "Add"}</GradientButton
          >
        </div>
      </form>
       
    </div>

  </div>

  <div class=" w-1/2">
    <span class="text=xl font-semibold mb-4">Templates:</span>

    {#if templates}
      <ul class="mt-4 flex gap-2 flex-wrap">
        {#each templates as template (template.id)}
          <li>
            <GradientButton
              color="{template.id === $activeTemplate?.id ? 'red' : 'blue'}"
              class=""
              on:click="{() => editTemplate(template)}"
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
    {:else}
      <Spinner />
    {/if}
  </div>
</div>

<style>
</style>
