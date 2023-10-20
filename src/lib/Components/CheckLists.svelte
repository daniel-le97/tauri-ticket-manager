<!-- Checklist.svelte -->
<script lang="ts">
  let items: string[];
  let newItem: string;

  function addItem() {
    if (newItem) {
      items = [...items, newItem];
      newItem = "";
    }
  }

  function copyToClipboard() {
    const textToCopy = items.join("\n");
    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Checklist copied to clipboard!");
    });
  }
</script>

<div>
  <input
    type="text"
    bind:value={newItem}
    placeholder="Add an item"
    on:keydown={(e) => e.key === "Enter" && addItem()}
  />
  <button on:click={addItem}>Add</button>
</div>

<div>
  {#if items}
 <ul>
    {#each items as item (item)}
      <li>{item}</li>
    {/each}
  </ul>
  {/if}
</div>

<div>
  <button on:click={copyToClipboard}>Copy to Clipboard</button>
</div>
