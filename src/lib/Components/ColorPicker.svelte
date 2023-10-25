<!-- ColorPicker.svelte -->
<script>
  import { menuColor, noteTakerColor } from "../stores/colorTheme";

  function updateNoteAreaColor(event) {
    $noteTakerColor = event.target.value;
  }

    function updateMenuColor(event) {
    $menuColor = event.target.value;
  }
</script>

<div class="flex justify-around">
  <div class="color-picker">
    <div class="">
      <input
        class=" p-0 m-0"
        type="color"
        bind:value="{$noteTakerColor}"
        on:input="{updateNoteAreaColor}"
      />
    </div>

    <div class="selected-color">
      <div class="">Note Area</div>
      <span>{$noteTakerColor}</span>
    </div>
  </div>

  <div class="color-picker">
    <div class="">
      <input
        class=" p-0 m-0"
        type="color"
        bind:value="{$menuColor}"
        on:input="{updateMenuColor}"
      />
    </div>

    <div class="selected-color">
      <div class="">Menu</div>
      <span>{$menuColor}</span>
    </div>
  </div>
</div>

<style>
  .color-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .selected-color {
    margin-top: 10px;
  }
</style>
