<!-- Checklist.svelte -->
<script lang="ts">
  import { clipboard , notification} from "@tauri-apps/api";
  import {
    Popover,
    GradientButton,
  } from "flowbite-svelte";
    import { title, content, tag } from "../stores/template.js";
    import { Template, type ITemplate, TemplateDTO } from "../../db/types.js";
    import { dbService } from "../../db/service.js";
    import { templateService } from "../services/template.js";
    import { onMount } from "svelte";
    
  let templates: TemplateDTO[];
  onMount(async() => {
    await getTemplates()
  })

  async function getTemplates(){
    templates = (await dbService.templates.getAll())
  }
  async function addTemplate(){
    const template = templateService.addTemplate()
    await getTemplates()
  }
  async function copyToClipboard(Template: string) {
    const textToCopy = Template;
    try {
      await clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

</script>

<div class="  flex flex-col p-3 bg-red-50">
  <span>Create Template</span>
  
  <div class="flex flex-col space-y-3">
    <form on:submit|preventDefault|stopPropagation={addTemplate}>
      <div class="flex">
        <input
        type="text"
        required
        min="1"
        minlength="1"
        bind:value={$title}
        placeholder="Title"
        id="new-title"
        />
        
      </div>
      <div class="flex">
        <input
        type="text"
        bind:value={$tag}
        placeholder="Tag"
        id="new-tag"
        />
      </div>
      
      <div>
        <textarea
        cols="70"
        rows="7"
        required
        minlength="1"
        bind:value={$content}
        placeholder="Add Content"
        id="new-Template"
        />
      </div>
      <button type="submit" class=" bg-blue-400" >add template</button>
    </form>
    </div>
    
    <div class="mt-4">
    <span class="text=xl font-semibold mb-4">Templates:</span>
 
  {#if templates}
  <ul class="mt-4">
    {#each templates as template (template.id)}
    <li>
      <GradientButton
          shadow
          color="blue"
          on:click={() => copyToClipboard(template.content)}
        >
          {template.title}</GradientButton
        >
        <Popover placement="top" class="w-80 text-sm">
          <div><pre>{@html template.content}</pre></div>
        </Popover>
    </li>
    {/each}
  </ul>
{:else}
  <p>Loading data...</p>
{/if}
  </div>
</div>

<style>
  input {
    color: black !important;
  }
</style>
