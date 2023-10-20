<!-- Checklist.svelte -->
<script lang="ts">
  import { clipboard , notification} from "@tauri-apps/api";
  import {
    Popover,
    GradientButton,
  } from "flowbite-svelte";
    import { title, content, tag } from "../stores/template.js";
    import { Template, type ITemplate } from "../../db/types.js";
    import { dbService } from "../../db/service.js";
    import { templateService } from "../services/template.js";
    
  const templatesPromise = dbService.templates.getAll()

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
    <form>
      <div class="flex">
        <input
        type="text"
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
        bind:value={$content}
        placeholder="Add Content"
        id="new-Template"
        />
      </div>
      <button type="submit" class=" bg-blue-400" on:click|preventDefault|stopPropagation={templateService.addTemplate}>add template</button>
    </form>
    </div>
    
    <div class="mt-4">
    <span class="text=xl font-semibold mb-4">Templates:</span>
    {#await templatesPromise}
	<p>...getting templates</p>
{:then templates}
<ul class="mt-4">
    <li>
      {#each templates as template}
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
      {/each}
    </li>
  </ul>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
  </div>
</div>

<style>
  input {
    color: black !important;
  }
</style>
