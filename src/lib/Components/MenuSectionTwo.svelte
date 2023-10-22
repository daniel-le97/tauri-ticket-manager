<script lang="ts">
  import { dialog } from "@tauri-apps/api";
  import { Badge, Button, Modal, Tooltip } from "flowbite-svelte";
  import CheckLists from "./CheckLists.svelte";
  import Timer from "./Timer.svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import UsageGuide from "./UsageGuide.svelte";
  let defaultModal = false;
  let scrollingModal = false;
  let informationModal = false;
  let size;
</script>

<div class="menu-section pt-4 px-1">
  <ul class="line-row space-x-1">
    <li class="line-item">
      <Button
        color="blue"
        class=" rounded-sm "
        on:click={() => (scrollingModal = true)}>Templates</Button
      >
    </li>
    <li class="line-item">
      <Button
        color="red"
        class=" rounded-sm "
        on:click={() => (defaultModal = true)}>ESC</Button
      >
    </li>

    <li class="line-item">
      <Button
        color="purple"
        class=" rounded-sm "
        on:click={() => (defaultModal = true)}>Tickets</Button
      >
    </li>
    <li class="line-item">
      <Button
        color="green"
        class=" rounded-sm "
        on:click={() => (defaultModal = true)}>Settings</Button
      >
    </li>
  </ul>

  <div class="flex items-end space-x-2">
    <Button
      color="yellow"
      class=" p-0 m-0 bg-transparent  "
      on:click={() => (informationModal = true)}
    >
      <InfoCircleSolid size="lg" />
      <Tooltip color="blue">How To Use</Tooltip>
    </Button>
    <Timer  />
  </div>

  <Modal size="xl" title="Templates" bind:open={scrollingModal}>
    <CheckLists />
    <svelte:fragment slot="footer">
      <Button on:click={() => dialog.message("Handled Success")}
        >I accept</Button
      >
      <Button color="alternative">Decline</Button>
    </svelte:fragment>
  </Modal>

  <Modal
    size="xl"
    title="Application Usage Information"
    bind:open={informationModal}
    autoclose
  >
    <UsageGuide />
  </Modal>
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
