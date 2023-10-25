<script>
  import Templates from "./Templates.svelte";
</script>

<div class="side-bar">
  <!-- <ul class="side-bar-menu">
    <li>
      <button class="side-bar-button" on:click={() => (showModal = true)}>
        About
      </button>
    </li>
    <li>
      <button class="side-bar-button" on:click={() => (showModal = true)}>
        About
      </button>
    </li>
    <li>
      <button class="side-bar-button" on:click={() => (showModal = true)}>
        About
      </button>
    </li>
  </ul> -->
</div>

<style>
  .side-bar {
    width: 2%;
    background-color: #ff5733;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: none;
    transition: all 0.25s ease;
  }

  .side-bar:hover {
    width: 5%;
    transition: all 0.25s ease;
  }

  .side-bar:hover .side-bar-menu {
    width: auto;
    transition: all 0.25s ease;
    opacity: 1;
    display: flex;
  }
  .side-bar:hover .side-bar-button {
    width: auto;
    transition: all 0.1s ease;
    opacity: 1;
    display: flex;
  }

  .side-bar-menu {
    width: 0;
    opacity: 0;

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.25s ease;
    list-style: none;
  }

  .side-bar-button {
    width: 0;
    display: none;
    margin-top: 4px;
    margin-bottom: 4px;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
