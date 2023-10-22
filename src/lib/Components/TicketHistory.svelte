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
  import {
    Template,
    type ITemplate,
    TemplateDTO,
    Note,
  } from "../../db/types.js";
  import { dbService } from "../../db/service.js";
  import { templateService } from "../services/template.js";
  import { onMount } from "svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { confirm } from "@tauri-apps/api/dialog";

  let tickets: Note[];

  onMount(async () => {
    await getTickets();
  });

  async function getTickets() {
    try {
      tickets = await dbService.notes.getAll();
      console.log(tickets);
      
    } catch (error) {}
  }
</script>

{#if tickets}
  {#each tickets as t}
    {JSON.stringify(t)}
  {/each}
{/if}
