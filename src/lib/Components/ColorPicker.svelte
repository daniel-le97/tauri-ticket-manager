<!-- ColorPicker.svelte -->
<script lang="ts">
  import { Button } from "flowbite-svelte";
  import { activeTheme, menuColor, noteColor, themeColor } from "../stores/colorTheme";
    import { themesService } from "../services/themes.js";
    import ThemeButtons from "./themeButtons.svelte";


  function updateNoteAreaColor(event: { target: { value: string; }; }) {

  }


    function updateMenuColor(event: { target: { value: string; }; }) {
    
  }

  async function saveTheme(){
    try {
      await themesService.createTheme()
    } catch (error) {
      
    }
  }
</script>

<div class="flex flex-col">
  <Button color="dark" class="w-fit" on:click="{saveTheme}">Save as Theme</Button>
  THEMES:

  <div class="">

   <div class="flex flex-col space-y-2">
  Menu:  {$menuColor}
<span>  NoteArea:  {$noteColor}</span>
</div>
  </div>
  <ul>
    {#each $themeColor as theme }
      <li>
        {theme.menu_color} and {theme.note_color}
      </li>
    {/each}
  </ul>
</div>
<div class="flex justify-center space-x-5">
  <div class="color-picker">
    <div class="">
      <input
        class=" p-0 m-0"
        type="color"
        
     
        bind:value="{$noteColor}"
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
        bind:value="{$menuColor}"
      />
    </div>

    <div class="selected-color">
      <div class="">Menu</div>
      <span>{$noteColor}</span>
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
