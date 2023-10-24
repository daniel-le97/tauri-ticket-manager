<script lang="ts">
  import {
    NoteDTO,
  } from "../../db/types.js";
  import { dbService } from "../../db/service.js";
  import { onMount } from "svelte";
  import { getDate } from "../utils/date.js";

  let tickets: NoteDTO[];

  onMount(async () => {
    await getTickets();
  });

  async function getTickets() {
    try {
      tickets = await dbService.notes.getAll();
      console.log(tickets);
      
    } catch (error) {
      
    }
  }
</script>

{#if tickets}
<table>
  <thead>
    <tr>
      <th>Ticket ID</th>
      <th>Asset</th>
      <th class="" on:click={() => console.log('hello world')}>Created At</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Last updated</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#each tickets as item (item.id)}
      <tr>
        <td>{item.id}</td>
        <td>{item.asset}</td>
        <td>{getDate(item.created_at)}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{getDate(item.updated_at)}</td>
        <td>{item.description}</td>
      </tr>
    {/each}
  </tbody>
</table>
{/if}

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
  }

  th {
    cursor: pointer; /* Add pointer cursor to indicate clickability */
    user-select: none; /* Prevent text selection on header */
  }

  th:hover {
    background-color: #f0f0f0; /* Change background on hover to indicate interactivity */
  }
</style>