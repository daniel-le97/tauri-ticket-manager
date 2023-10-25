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
  import {settingModal, ticketModal} from '../stores/modals'
  import TicketHistory from "./TicketHistory.svelte";
  import { writable } from "svelte/store";
  import Settings from "./Settings.svelte";
  let defaultModal = false;
  let scrollingModal = false;
  let informationModal = false;

  let hiddenDrawer = true;
  let size;
  

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






  let currentTime = new Date().toLocaleString()

  function updateCurrentTime() {
    currentTime = new Date().toLocaleString()
  }

  let interval: string | number | NodeJS.Timeout | undefined;
  onMount(() => {
    interval = setInterval(updateCurrentTime, 1000);
  });

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="menu-section px-1 bg-transparent">
  <ul class="line-row  gap-1">
    <li class="line-item">
      <GradientButton
        color="red"
        class=" rounded-sm "
        on:click="{() => (scrollingModal = true)}"
        >Configure Templates</GradientButton
      >
    </li>


    <li class="line-item">
      <GradientButton
        color="purple"
        class=" rounded-sm "
        on:click="{() => ($ticketModal = true)}">Tickets</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton
        color="green"
        class=" rounded-sm "
        on:click="{() => ($settingModal = true)}">Settings</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton
        class=" rounded-sm "
        on:click="{() => (hiddenDrawer = false)}">Templates</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton
      color='tealToLime'
        class=" rounded-sm ">{currentTime}</GradientButton
      >
    </li>
  </ul>


  <div class="flex items-end space-x-2 p-1 py-2">
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

  <Modal size="lg" title="" bind:open="{$ticketModal}" autoclose>
    <TicketHistory />
  </Modal>

  <Modal size="lg" title="" bind:open="{$settingModal}" autoclose backdropClass="none">
    <!-- <TicketHistory />
     -->
     <Settings/>
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
