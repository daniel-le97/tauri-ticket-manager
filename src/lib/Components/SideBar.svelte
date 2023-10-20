<script>
  import CheckLists from "./CheckLists.svelte";
import Modal from "./Modal.svelte";

  let showModal = false;
</script>

<div class="side-bar">
  <ul class="side-bar-menu">
    <li>
      <div class="">
        <button class="side-bar-button" on:click={() => (showModal = true)}>
          About
        </button>
      </div>
    </li>
    <li>
      <div class="">
        <button class="side-bar-button" on:click={() => (showModal = true)}>
          About
        </button>
      </div>
    </li>
    <li>
      <div class="">
        <button class="side-bar-button" on:click={() => (showModal = true)}>
          About
        </button>
      </div>
    </li>
    <li>
      <div class="">

    
        <button class="side-bar-button" on:click={() => (showModal = true)}>
          About
        </button>
      </div>
    </li>
  </ul>

  <Modal bind:showModal>
    <h2 slot="header">About</h2>

    <ol class="definition-list">
      <li>of or relating to modality in logic</li>
      <li>
        containing provisions as to the mode of procedure or the manner of
        taking effect —used of a contract or legacy
      </li>
      <li>of or relating to a musical mode</li>
      <li>of or relating to structure as opposed to substance</li>
      <li>
        of, relating to, or constituting a grammatical form or category
        characteristically indicating predication
      </li>
      <li>of or relating to a statistical mode</li>
    </ol>

    <a href="https://www.merriam-webster.com/dictionary/modal"
      >merriam-webster.com</a
    >

    <CheckLists/>
  </Modal>
</div>

<style>
  .side-bar {
    width: 2%;
    background-color: #ff5733;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease;
  }

  .side-bar:hover {
    width: 5%;
    transition: all 0.25s ease;
  }

  .side-bar:hover .side-bar-menu {
    /* Your styles for .side-bar-menu here */
    width: auto; /* For example, change the width to 100% */
    transition: all 0.25s ease;
    opacity: 1;
  }

  .side-bar-menu {
    display: none;

    opacity: 0;
    padding-left: 0px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.25s ease;
    list-style: none;
  }

  .side-bar-button {
    margin-top: 4px;
    margin-bottom: 4px;
    padding-left: 4px;
    padding-right: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
</style>
