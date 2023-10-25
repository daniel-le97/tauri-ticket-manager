<script lang="ts">
  import { NoteDTO } from "../../db/types.js";
  import { dbService } from "../../db/service.js";
  import { onMount } from "svelte";
  import { getDate } from "../utils/date.js";
  import { resetAppState } from "../stores/appState.js";
  import { ticketModal } from "../stores/modals.js";
  import {Spinner} from 'flowbite-svelte'

  let tickets: NoteDTO[] = [];
  let filteredTickets: NoteDTO[] = []; // Initialize filteredTickets
  let filterCriteria = "";
  let noValidSearch = false;

  onMount(async () => {
    await getTickets();

    // Initialize filteredTickets with all tickets
    filteredTickets = tickets
  });

  async function getTickets() {
    try {
      tickets = await dbService.notes.getAll();
      console.log(filteredTickets);
    } catch (error) {}
  }

  function handleClick(ticket: NoteDTO) {
    resetAppState(ticket);
    $ticketModal = !$ticketModal;
  }
  // function filterTickets() {
  //   if (filterCriteria.includes('phone=')) {
  //     const filter = filterCriteria.slice(6).trim()
  //     console.log('filtering', filter);
      
  //     filteredTickets = tickets.filter(ticket => {

  //       const ticker = ticket.phone.toString().includes(filter)
  //       console.log({ticket: ticket.phone.toString(), phone: filter});
        
  //       if (ticker) {
  //         return ticket
  //       }else{
  //         return false
  //       }
  //     }).filter(Boolean)
  //   }
  // }

  function filterTickets() {
    filteredTickets = tickets.filter((ticket) => {
      noValidSearch = true;
      let search = filterCriteria.toLowerCase()
      switch (true) {
        case search.startsWith("id="):
          const idToSearch = filterCriteria.slice(3).trim();
          return ticket.id.toString().includes(idToSearch)

        case search.startsWith("phone="):
          const phoneToSearch = filterCriteria.slice(6).trim();
          return ticket.phone.toString().includes(phoneToSearch);

        case search.startsWith("asset="):
          const assetToSearch = filterCriteria.slice(6).trim();
          return ticket.asset.includes(assetToSearch);

        case search.startsWith("date="):
          const dateToSearch = filterCriteria.slice(5).trim();
          const formattedDate = getDate(ticket.created_at).toLocaleLowerCase();
          return formattedDate.includes(dateToSearch.toLocaleLowerCase());

        case search.startsWith("description="):
          const descriptionToSearch = filterCriteria.slice(12).trim();
          return ticket.description.toLowerCase().includes(descriptionToSearch);

        case search.startsWith("email="):
          const email = filterCriteria.slice(6).trim();
          return ticket.email.toLowerCase().includes(email);

        default:
          return true; // Show all tickets if no valid filter criteria is provided
      }
    });
  }


</script>

<input
  class="text-black"
  type="text"
  bind:value="{filterCriteria}"
  placeholder="ex: id= || description ="
  on:input="{filterTickets}"
/>

<table class="">
  <thead>
    <tr>
      <th>Ticket ID</th>
      <th>Asset</th>
      <th class="" on:click="{() => console.log('hello world')}">Date</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {#if filteredTickets}
      {#each filteredTickets as item (item.id)}
        <tr on:click="{() => handleClick(item)}">
          <td>{item.id}</td>
          <td>{item.asset}</td>
          <td>{getDate(item.created_at)}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td class="truncate overflow-x-clip">{item.description}</td>
        </tr>
      {/each}
      {:else}
      <Spinner></Spinner>
    {/if}
  </tbody>
</table>

<style>
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
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
  .auto-width-table {
    table-layout: auto;
    border-collapse: collapse;
  }

  .auto-width-table td {
    width: auto;
    padding: 5px;
    border: 1px solid #000;
  }

  td {
    width: fit-content !important;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .overflow-x-clip {
    max-width: 100px; /* Adjust this value to control the width before text truncation occurs */
  }

  .fit-content-and-truncate {
    max-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
