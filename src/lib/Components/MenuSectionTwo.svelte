<script lang="ts">
  import {
    Button,
    DarkMode,
    GradientButton,
    Tooltip,
  } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { onDestroy, onMount } from "svelte";
  import {
    informationModal,
    settingModal,
    templateDrawer,
    templateModal,
    ticketModal,
  } from "../stores/modals";
  import {templates} from '../stores/template.js'
  import ModalsAndDrawers from "./ModalsAndDrawers.svelte";
  import TimerComponent from "./TimerComponent.svelte";
    import { templateService } from "../services/template.js";
    import { dbService } from "../../db/service.js";
    import logger from "../utils/logger.js";


  
  let currentTime = new Date().toLocaleString();

  function updateCurrentTime() {
    currentTime = new Date().toLocaleString();
  }

  let interval: string | number | NodeJS.Timeout | undefined;
  onMount(() => {
    interval = setInterval(updateCurrentTime, 1000);
  });

  async function getTemplates(){
    try {
      $templates = await dbService.templates.getAll()
    } catch (error) {
      logger()?.error(error)
    }
  }

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="menu-section px-1 bg-transparent">
  <ul class="line-row gap-1">
    <li class="line-item">
      <GradientButton
        color="red"
        class=" rounded-sm "
        on:click="{() => ($templateModal = true)}"
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
        on:click="{() => ($settingModal = true)}">Themes</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton
        class=" rounded-sm "
        on:click="{() => {($templateDrawer = false);getTemplates()}}">Templates</GradientButton
      >
    </li>
    <li class="line-item">
      <GradientButton color="tealToLime" class=" rounded-sm "
        >{currentTime}</GradientButton
      >
    </li>
  </ul>


  <div class="flex items-end space-x-2 p-1 py-2">
    <DarkMode btnClass=" p-1 !bg-transparent dark:text-white" size="md"/>
    <Button
    color="yellow"
    class=" p-0 m-0 bg-transparent  dark:text-gray-800 "
    on:click="{() => ($informationModal = true)}"
    >
    <InfoCircleSolid size="lg" class="dark:text-white"/>
    <Tooltip color="blue">How To Use</Tooltip>
  </Button>
  <TimerComponent/>
  </div>

  <ModalsAndDrawers />

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
