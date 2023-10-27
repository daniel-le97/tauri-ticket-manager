<script lang="ts">
  import {
    informationModal,
    settingModal,
    templateDrawer,
    templateModal,
    ticketModal,
  } from "../stores/modals";
  import { GradientButton, Modal, Drawer, Popover } from "flowbite-svelte";
  import Templates from "./Templates.svelte";
  import UsageGuide from "./UsageGuide.svelte";
  import TicketHistory from "./TicketHistory.svelte";
  import { sineIn } from "svelte/easing";
  import type { TemplateDTO } from "../../db/types";
  import { clipboard } from "@tauri-apps/api";
  import { dbService } from "../../db/service";
  import { onMount } from "svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import logger from "../utils/logger";
    import { templates } from "../stores/template.js";




  let transitionParamsRight = {
    x: 320,
    duration: 200,
    easing: sineIn,
  };



  async function copyToClipboard(Template: string) {
    const textToCopy = Template;
    try {
      await clipboard.writeText(textToCopy);
    } catch (error) {
      logger()?.error(error);
    }
  }

</script>

<Modal class="mt-8  " size="xl" title="Templates" bind:open="{$templateModal}">
  <Templates />
</Modal>

<Modal size="xl" class="mt-12" bind:open="{$informationModal}" outsideclose>
  <UsageGuide />
</Modal>

<Modal size="xl" title="Ticket History" class="mt-6" bind:open="{$ticketModal}" autoclose>
  <TicketHistory />
</Modal>

<Modal size="lg" title="Themes" bind:open="{$settingModal}" outsideclose>
  <ColorPicker />
</Modal>

  <Drawer
  placement="right"
  transitionType="fly"
  transitionParams="{transitionParamsRight}"
  bind:hidden="{$templateDrawer}"
  id="sidebar6"
  class="pt-10 overflow-x-auto "
  backdrop="{false}"
  >
  <div class=" flex flex-col space-y-2 pt-20">
    {#if $templates}
    {#each $templates as template (template.id)}
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
    {/if}
  </div>
</Drawer>


<style></style>
