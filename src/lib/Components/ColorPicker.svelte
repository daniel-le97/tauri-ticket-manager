<!-- ColorPicker.svelte -->
<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { activeTheme, themeColor } from "../stores/colorTheme";

  let noteAreaColor = ""
  let menuColor = ""
  function updateNoteAreaColor(event: { target: { value: string; }; }) {

  }


    function updateMenuColor(event: { target: { value: string; }; }) {
    
  }
</script>

<div class="flex flex-col">
  <Button color="dark" class="w-fit">Save as Theme</Button>
  THEMES:

  <div class="">

   <div class="flex flex-col space-y-2">
  Menu:  {$activeTheme.menu_color}
<span>  NoteArea:  {$activeTheme.note_color}</span>
   </div>
  </div>
</div>
<div class="flex justify-center space-x-5">
  <div class="color-picker">
    <div class="">
      <input
        class=" p-0 m-0"
        type="color"
        
     
        on:input="{()=>updateNoteAreaColor}"
      />
    </div>

    <div class="selected-color">
      <div class="">Note Area</div>
      <span></span>
    </div>
  </div>

  <div class="color-picker">
    <div class="">
      <input
        class=" p-0 m-0"
        type="color"
        bind:value="{menuColor}"
        on:input="{()=>updateMenuColor}"
      />
    </div>

    <div class="selected-color">
      <div class="">Menu</div>
      <span>{menuColor}</span>
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
