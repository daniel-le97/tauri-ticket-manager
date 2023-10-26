<script lang="ts">
  import { NoteDTO } from "../../db/types.js";
  import { dbService } from "../../db/service.js";
  import { onMount } from "svelte";
  import { getDate } from "../utils/date.js";
  import { resetAppState } from "../stores/appState.js";
  import { ticketModal } from "../stores/modals.js";
  import { Input, Popover, Spinner } from "flowbite-svelte";
  import { ListPlaceholder } from "flowbite-svelte";
  import logger from "../utils/logger.js";
  import { CheckOutline, CloseOutline, InfoCircleSolid } from "flowbite-svelte-icons";
    import { noteService } from "../services/notes.js";
  let tickets: NoteDTO[] = [];
  let filteredTickets: NoteDTO[] = []; // Initialize filteredTickets
  let filterCriteria = "";
  let noValidSearch = false;
  let loadingTickets = true;
  onMount(async () => {
    // await getTickets();
    debounce()

    // Initialize filteredTickets with all tickets
    filteredTickets = tickets;
    loadingTickets = false;
  });

  async function getTickets() {
    try {
      tickets = await dbService.notes.getAll();
    } catch (error) {
      logger()?.error(error);
    }
  }

  function handleClick(ticket: NoteDTO) {
    resetAppState(ticket);
    $ticketModal = !$ticketModal;
  }

  function filterTickets() {
    filteredTickets = tickets.filter((ticket) => {
      noValidSearch = false;
      let search = filterCriteria.toLowerCase();
      switch (true) {
        case search.startsWith("id="):
          const idToSearch = filterCriteria.slice(3).trim();
          return ticket.id.toString().includes(idToSearch);

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

    if (filteredTickets.length === 0) {
      noValidSearch = true; // Set noValidSearch to true to display the spinner
    }
  }

  function getHighlightClass(filterCriteria: string) {
    switch (true) {
      case filterCriteria.startsWith("id="):
        return "bg-blue-300"; // Use the class for ID
      case filterCriteria.startsWith("phone="):
        return "bg-green-300"; // Use the class for Phone
      case filterCriteria.startsWith("email="):
        return "bg-red-300"; // Use the class for Email
      case filterCriteria.startsWith("description="):
        return "bg-purple-300"; // Use the class for Description
      case filterCriteria.startsWith("asset="):
        return "bg-yellow-300"; // Use the class for Asset
      case filterCriteria.startsWith("date="):
        return "bg-orange-300"; // Use the class for Date
      default:
        return ""; // Default class when no match
    }
  }


	let timer:any;

	const debounce = async() => {
		clearTimeout(timer);
		timer = setTimeout(async() => {
			const notes = await noteService.search(filterCriteria)
      filteredTickets = notes
		}, 1000);
	}
</script>

<Input
  class="text-black"
  type="text"
  bind:value="{filterCriteria}"
  placeholder="Filter Criteria"
  on:keyup="{debounce}"
/>
<Popover class="text-sm w-80"  placement="bottom">

  <div class="grid grid-cols-4 gap-2 my-2">
    <div class="h-1 bg-orange-300 dark:bg-orange-400" />
    <div class="h-1 bg-orange-300 dark:bg-orange-400" />
    <div class="h-1 bg-gray-200 dark:bg-gray-600" />
    <div class="h-1 bg-gray-200 dark:bg-gray-600" />
  </div>

  <ul>
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-2 w-4 h-4 text-green-400 dark:text-green-500" />
      Upper or lower case letters
    </li>
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-2 w-4 h-4 text-green-400 dark:text-green-500" />
      email=fake3@example.com
    </li>
    <li class="flex items-center">
      <CloseOutline class="mr-2 w-4 h-4 text-red-400 dark:text-gray-400" /> fake3@example.com
    </li>
  </ul>
    <ul class="flex flex-wrap gap-2 mt-3">
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-1 w-4 h-4 text-green-400 dark:text-green-500" />
   id=
    </li>
 
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-1 w-4 h-4 text-green-400 dark:text-green-500" />
   asset=
    </li>
 
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-1 w-4 h-4 text-green-400 dark:text-green-500" />
   date=
    </li>
 
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-1 w-4 h-4 text-green-400 dark:text-green-500" />
   email=
    </li>
 
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-1 w-4 h-4 text-green-400 dark:text-green-500" />
   phone=
    </li>
    <li class="flex items-center mb-1">
      <CheckOutline class="mr-1 w-4 h-4 text-green-400 dark:text-green-500" />
   description=
    </li>
 
  </ul>
</Popover>



<table class="rounded-md">
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
  {#if filteredTickets.length !== 0 && !loadingTickets}
    <tbody
      class=" text-black dark:text-white transition-all duration-500 {getHighlightClass(
        filterCriteria
      )}"
    >
      {#each filteredTickets as item (item.id)}
        <tr
          class="hover:bg-neutral-200 transition-all duration-300 cursor-pointer"
          on:click="{() => handleClick(item)}"
        >
          <td>{item.id}</td>
          <td>{item.asset}</td>
          <td>{getDate(item.created_at)}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td class="truncate overflow-x-clip">{item.description}</td>
          {#if item.description.length >=13}
           <Popover class="w-4/5">{item.description}</Popover>
          {/if}
        </tr>
      {/each}
    </tbody>
  {/if}

  {#if loadingTickets}
    <div class=" p-2 justify-center items-center w-screen">
      <ListPlaceholder class=" max-w-3xl " />
    </div>
  {/if}

  {#if filteredTickets.length === 0 && !noValidSearch}
    <div class=" p-2 justify-center items-center w-screen">
      <ListPlaceholder class=" max-w-3xl " />
    </div>
  {/if}

  {#if noValidSearch}
    <div class="flex my-2 p-2 text-xl text-gray-500">NO SEARCH RESULTS</div>
  {/if}
</table>

<style scoped>
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
