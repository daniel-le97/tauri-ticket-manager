<script lang="ts">
  import { Button } from "flowbite-svelte";
  import CheckLists from "./CheckLists.svelte";
  import Modal from "./Modal.svelte";

  let showModal = false;
</script>

<div class="menu-section  p-1 pt-0">
  <ul class="line-row space-x-1">
    <li class="line-item">
      <Button
        color="blue"
        class=" rounded-sm p-1.5"
        on:click={() => (showModal = true)}>CheckList</Button
      >
    </li>
    <li class="line-item">
      <Button
        color="blue"
        class=" rounded-sm p-1.5"
        on:click={() => (showModal = true)}>ESC</Button
      >
    </li>
    <li class="line-item">
      <Button
        color="blue"
        class=" rounded-sm p-1.5"
        on:click={() => (showModal = true)}>Toggle</Button
      >
    </li>
  </ul>

  <Modal bind:showModal>
    <h2 slot="header">CheckLists</h2>

    <CheckLists />
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
