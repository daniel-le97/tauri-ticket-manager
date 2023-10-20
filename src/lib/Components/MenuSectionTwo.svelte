<script lang="ts">
  import { dialog } from "@tauri-apps/api";
  import { Badge, Button, Modal } from "flowbite-svelte";
  import CheckLists from "./CheckLists.svelte";
  import Timer from "./Timer.svelte";
  let defaultModal = false;
  let scrollingModal = false;
  let size;
</script>

<div class="menu-section pt-5 px-1">
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
        color="yellow"
        class=" rounded-sm "
        on:click={() => (scrollingModal = true)}>Templates</Button
      >
    </li>
    <li class="line-item">
      <Button
        color="green"
        class=" rounded-sm "
        on:click={() => (defaultModal = true)}>ESC</Button
      >
    </li>
    <li class="line-item">
      <Button
        color="purple"
        class=" rounded-sm "
        on:click={() => (defaultModal = true)}>Toggle</Button
      >
    </li>
  </ul>
  <Badge large>
    <Timer />
  </Badge>
  <Modal size="xl" title="Templates" bind:open={scrollingModal} autoclose>
    <CheckLists />
    <svelte:fragment slot="footer">
      <Button on:click={() => dialog.message("Handled Success")}
        >I accept</Button
      >
      <Button color="alternative">Decline</Button>
    </svelte:fragment>
  </Modal>

  <!-- <Modal bind:showModal>
    <h2 slot="header">CheckLists</h2>

    <CheckLists />
  </Modal> -->
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
