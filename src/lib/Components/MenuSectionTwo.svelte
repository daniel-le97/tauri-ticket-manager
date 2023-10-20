<script lang="ts">
  import CheckLists from "./CheckLists.svelte";
  import Modal from "./Modal.svelte";

  let showModal = false;
</script>

<div class="menu-section1">
  <ul class="line-row">
    <li class="line-item">
      <button class="bg-transparent py-1" on:click={() => (showModal = true)}>
        CheckList
      </button>
    </li>
  </ul>

  <Modal bind:showModal>
    <h2 slot="header">CheckLists</h2>

    <CheckLists />
  </Modal>
</div>

<style>
  input {
    border: 2px solid #000;
    outline: none;
    padding: 6px;
    background: transparent;
    border-radius: 0px;
    outline: none;
    border: none;
    font-weight: 400;
    background-color: #8b5cf6;
    cursor: pointer;
    width: auto; /* Set the width to automatically grow as needed */
    max-width: 100px;
  }
  input:focus {
    border: #ff5733 2px solid;
    outline: none;
  }
  .menu-section1 {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .line-row {
    display: flex;
    padding: 2.5px;
    margin-top: 2px;
    margin-bottom: 2px;
    list-style: none;
  }
  .line-item {
    margin-left: 1px;
    margin-right: 1px;
    background-color: #8b5cf6;
    cursor: pointer;
    border: 2px solid #000;
  }
</style>
