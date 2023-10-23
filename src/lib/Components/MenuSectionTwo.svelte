<script lang="ts">
  import { clipboard, dialog } from "@tauri-apps/api";
  import {
    Badge,
    Button,
    GradientButton,
    Modal,
    Tooltip,
    CloseButton,
    Drawer,
    Popover,
  } from "flowbite-svelte";
  import CheckLists from "./CheckLists.svelte";
  import Timer from "./Timer.svelte";
  import { InfoCircleSolid, ArrowRightOutline } from "flowbite-svelte-icons";
  import UsageGuide from "./UsageGuide.svelte";
  import { sineIn } from "svelte/easing";
  import type { TemplateDTO } from "../../db/types";
  import { dbService } from "../../db/service";
  import { onDestroy, onMount } from "svelte";
  import { appState } from "../stores/appState";
  import TicketHistory from "./TicketHistory.svelte";
  import { writable } from "svelte/store";
  let defaultModal = false;
  let scrollingModal = false;
  let informationModal = false;
  let ticketModal = false;
  let hiddenDrawer = true;
  let size;
  // Create a writable store for the current time
  let currentTime = writable(new Date());

  // Function to update the time every second
  function updateCurrentTime() {
    currentTime.set(new Date());
  }

  let transitionParamsRight = {
    x: 320,
    duration: 200,
    easing: sineIn,
  };

  let templates: TemplateDTO[];

  async function getTemplates() {
    templates = await dbService.templates.getAll();
  }

  onMount(getTemplates);

  async function copyToClipboard(Template: string) {
    const textToCopy = Template;
    try {
      await clipboard.writeText(textToCopy);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }






    // Set up the interval to update the time
  let interval: string | number | NodeJS.Timeout | undefined;
  onMount(() => {
    interval = setInterval(updateCurrentTime, 1000); // 1000 milliseconds = 1 second
  });

  // Clear the interval when the component is unmounted
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="menu-section px-1">
  <ul class="line-row space-x-1">
    <li class="line-item">
      <GradientButton
        color="red"
        class=" rounded-sm "
        on:click="{() => (scrollingModal = true)}"
        >Configure Templates</GradientButton
      >
    </li>
    <!-- <li class="line-item">
      <GradientButton
        color="red"
        class=" rounded-sm "
        on:click="{() => (defaultModal = true)}">ESC</GradientButton
      >
    </li> -->

    <li class="line-item">
      <GradientButton
        color="purple"
        class=" rounded-sm "
        on:click="{() => (ticketModal = true)}">Tickets</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton
        color="green"
        class=" rounded-sm "
        on:click="{() => (defaultModal = true)}">Settings</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton
        class=" rounded-sm "
        on:click="{() => (hiddenDrawer = false)}">Templates</GradientButton
      >
    </li>
  </ul>

  <Badge class=" badge ">
 {currentTime}

  </Badge>
  <div class="flex items-end space-x-2">
    <Button
      color="yellow"
      class=" p-0 m-0 bg-transparent  "
      on:click="{() => (informationModal = true)}"
    >
      <InfoCircleSolid size="lg" />
      <Tooltip color="blue">How To Use</Tooltip>
    </Button>
    <Timer />
  </div>

  <Modal class="mt-8 " size="xl" bind:open="{scrollingModal}">
    <CheckLists />
  </Modal>

  <Modal size="xl" class="mt-12" bind:open="{informationModal}" outsideclose>
    <UsageGuide />
  </Modal>

  <Modal size="lg" title="" bind:open="{ticketModal}" autoclose>
    <TicketHistory />
  </Modal>

  <Drawer
    placement="right"
    transitionType="fly"
    transitionParams="{transitionParamsRight}"
    bind:hidden="{hiddenDrawer}"
    id="sidebar6"
    class="pt-10 overflow-x-auto bg-black"
    backdrop="{false}"
  >
    <div class=" flex flex-col space-y-2 pt-20">
      {#each templates as template (template.id)}
        <GradientButton
          shadow
          color="blue"
          on:click="{() => copyToClipboard(template.content)}"
        >
          {template.title}</GradientButton
        >
        <Popover placement="top" class="text-sm ">
          <div><pre>{@html template.content}</pre></div>
        </Popover>
      {/each}
    </div>
  </Drawer>
</div>

<style>
  .menu-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .line-row {
    display: flex;
    justify-content: center;
    align-items: center;

    list-style: none;
  }
  .line-item {
    margin-left: 1px;
    margin-right: 1px;
    cursor: pointer;
  }
</style>
