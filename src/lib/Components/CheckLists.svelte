<!-- Checklist.svelte -->
<script lang="ts">
  import { clipboard } from "@tauri-apps/api";

  let checklist: string[] = [];
  let newItem: string = "";

  function addItem() {
    if (newItem) {
      checklist = [...checklist, ` ${newItem}:`];
      newItem = "";
    }
  }

  async function copyToClipboard() {
    const textToCopy = checklist.join("\n");
    await clipboard.writeText(textToCopy);
  }
</script>

<div class="Modal-Body">
  <input
    type="text"
    bind:value={newItem}
    placeholder="Question"
    id="new-question"
  />

  <button on:click={addItem}>Add</button>
</div>

<div>
  <ul>
    {#each checklist as c}
      <li>
        {c}
      </li>
    {/each}
  </ul>
</div>

<div>
  <button on:click={copyToClipboard}>Copy to Clipboard</button>
</div>

<style>
  input {
    color: black !important;
  }

  .Modal-Body {
    width: 100%;
  }
</style>
