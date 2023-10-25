<!-- ColorPicker.svelte -->
<script lang="ts">
  import { Button } from "flowbite-svelte";
  import {
    activeTheme,
    menuColor,
    noteColor,
    themeColor,
  } from "../stores/colorTheme";
  import { themesService } from "../services/themes.js";
  import ThemeButtons from "./themeButtons.svelte";
  import { CheckCircleSolid } from "flowbite-svelte-icons";
    import type { Theme } from "../../db/types.js";

  function updateNoteAreaColor(event: { target: { value: string } }) {}

  function updateMenuColor(event: { target: { value: string } }) {}

  async function saveTheme() {
    try {
      await themesService.createTheme();
    } catch (error) {}
  }

  async function changeTheme(theme: Theme) {
    try {
      if (theme.active === 1) {
        return
      }
      await themesService.save(theme)

    } catch (error) {}
  }
</script>

<div class="flex space-x-4 w-full items-end">
  <div class="flex flex-col w-2/3">
    <div class="!text-black font-semibold font-1">Themes:</div>
    <div class="flex justify-start space-x-16 border-b !text-black">
      <span>Note Area</span>
      <span>Menu</span>
    </div>
    <ul class="  h-80 overflow-y-scroll py-2">
      {#each $themeColor as theme, index}
        <li class="p-1 flex my-2 justify-between gap-2">
          <div class="flex shadow-md bg-gray-300 p-1 rounded-md space-x-2">
            <span class=" pr-1 !text-black"> {index}</span>
            <span
              class="p-1 rounded-md px-3 text-white"
              style="background-color: {theme.note_color};"
              >{theme.note_color}</span
            >
            <span
              class="p-1 rounded-md px-3 text-white"
              style="background-color: {theme.menu_color};"
              >{theme.menu_color}</span
            >
          </div>
          <Button
            color="alternative"
            class="px-3"
            on:click="{() => changeTheme(theme)}"><CheckCircleSolid /></Button
          >
        </li>
      {/each}
    </ul>
  </div>

  <div
    class="flex flex-col h-4/5 py-2 space-y-4 justify-around items-center w-1/3 space-x-5 bg-gray-300 rounded-md px-2"
  >
    <div
      class="flex flex-col border border-zinc-900 rounded-md w-full text-white border"
    >
      <div
        class=" p-5 h-40 flex justify-center items-center"
        style="background-color: {$noteColor};"
      >
        {$noteColor}
      </div>
      <div
        class="h-1/3 p-2 flex justify-center items-center"
        style="background-color: {$menuColor};"
      >
        {$menuColor}
      </div>
    </div>

    <div class="flex space-x-4">
      <div class="color-picker">
        <div class=" rounded-md" style="background-color: {$noteColor};">
          <input
            class=" p-0 m-0 outline-none border-none"
            type="color"
            bind:value="{$noteColor}"
          />
        </div>

        <!-- <div class="selected-color">
          <div class="">Note Area</div>
          <span>{$menuColor}</span>
        </div> -->
      </div>

      <div class="color-picker">
        <div class=" rounded-md" style="background-color: {$menuColor};">
          <input
            class=" p-0 m-0 outline-none border-none"
            type="color"
            bind:value="{$menuColor}"
          />
        </div>

        <!-- <div class="selected-color">
          <div class="">Menu</div>
          <span>{$noteColor}</span>
        </div> -->
      </div>
    </div>

    <Button color="dark" class="w-fit" on:click="{saveTheme}"
      >Save as Theme</Button
    >

    <!-- <div class="flex flex-col space-y-2">
      Menu: {$menuColor}
      <span> NoteArea: {$noteColor}</span>
    </div>
 -->
  </div>
</div>

<style>
</style>
