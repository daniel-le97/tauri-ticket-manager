<!-- ColorPicker.svelte -->
<script lang="ts">
  import { Button, DarkMode } from "flowbite-svelte";
  import {
    activeTheme,
    menuColor,
    noteColor,
    themeColor,
  } from "../stores/colorTheme";
  import { themesService } from "../services/themes.js";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import type { Theme } from "../../db/types.js";
  import { confirm } from "@tauri-apps/api/dialog";
  import logger from "../utils/logger";
  import { alertState } from "../stores/alert";

  async function saveTheme() {
    try {
      await themesService.createTheme();
    } catch (error) {
      logger()?.error(error);
    }
  }

  async function changeTheme(theme: Theme) {
    try {
      if (theme.active === 1) {
        return;
      }
      await themesService.save(theme);
    } catch (error) {
      logger()?.error(error);
    }
  }

  $: {
    $noteColor = $activeTheme?.note_color || "#000000";
    $menuColor = $activeTheme?.menu_color || "#000000";
  }

  async function deleteTheme(themeId: number) {
    try {
     

      if (themeId === 1) {
        alertState.set({
          color: "red",
          text: "Can't Delete Default Theme!",

          visible: true,
        });
        return;
      }

      if (await confirm("Delete Theme?")) {
        const activeThemeIndex = $themeColor.findIndex(
          (theme) => theme.active === 1
        );
        const nextThemeIndex = (activeThemeIndex + 1) % $themeColor.length;
        const nextTheme = $themeColor[nextThemeIndex];
        await themesService.deleteTheme(themeId);
        $themeColor = $themeColor.filter((theme) => theme.id !== themeId);

        if (nextTheme) {
          await changeTheme(nextTheme);
        }
      }
    } catch (error) {
      logger()?.error(error);
    }
  }
</script>

<div class="flex space-x-4 w-full items-end">
  <div class="flex flex-col w-2/3">
    <div
      class="flex justify-start space-x-16 border-b text-black dark:text-white"
    >
      <span>Note Area</span>
      <span>Menu</span>
    </div>
    <ul class="  h-80 overflow-y-scroll py-2 flex flex-col">
      {#each $themeColor as theme, index}
        <li class=" flex my-2 justify-between gap-2 pr-2">
          <div class="flex space-x-2 w-full">
            <button
              class="!p-0 !m-0 w-full flex flex-col relative rounded-md {theme.active ===
              1
                ? 'bg-orange-500'
                : ''}"
              on:click="{() => changeTheme(theme)}"
            >
              <div class="flex w-full">
                <span
                  class="  !text-black absolute -top-3 left-0 bg-white rounded-r-md"
                >
                  {theme.id}</span
                >
                <span
                  class="p-1 rounded-l-md px-3 text-white w-1/2 border-r-2 border-r-white"
                  style="background-color: {theme.note_color};"
                  >{theme.note_color}</span
                >
                <span
                  class="p-1 rounded-r-md px-3 text-white w-1/2"
                  style="background-color: {theme.menu_color};"
                  >{theme.menu_color}</span
                >
              </div>

              {#if theme.active}
                <span
                  class="text-sm px-2 text-white font-medium font-1 text-center w-full"
                  >{#if theme.id === 1}
                    DEFAULT THEME
                  {:else}
                    ACTIVE
                  {/if}</span
                >
              {/if}
            </button>
            <Button
              color="alternative"
              class="px-3 {theme.active === 1 ? 'bg-orange-500' : ''}"
              on:click="{() => deleteTheme(theme.id)}"><TrashBinSolid /></Button
            >
          </div>
        </li>
      {/each}
    </ul>
  </div>

  <div
    class="flex flex-col h-4/5 py-2 space-y-4 justify-around items-center w-1/3 space-x-5 px-2"
  >
    <div
      class="flex flex-col shadow-md border-zinc-900 rounded-md w-full text-white border"
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

    <!-- COLOR PICKER INPUTS -->
    <div class="flex space-x-4">
      <div class="color-picker">
        <div
          class=" rounded-md shadow-md cursor-pointer hover:brightness-125"
          style="background-color: {$noteColor};"
        >
          <input
            class=" p-0 m-0 outline-none border-none bg-transparent cursor-pointer transition-all duration-300 hover:shadow-lg"
            type="color"
            bind:value="{$noteColor}"
          />
        </div>
      </div>

      <div class="color-picker">
        <div
          class=" rounded-md shadow-md cursor-pointer hover:brightness-125"
          style="background-color: {$menuColor};"
        >
          <input
            class=" p-0 m-0 outline-none border-none bg-transparent cursor-pointer transition-all duration-300 hover:shadow-lg"
            type="color"
            bind:value="{$menuColor}"
          />
        </div>
      </div>
      <div class="color-picker">
        <DarkMode />
      </div>
    </div>

    <Button color="dark" class="w-fit" on:click="{saveTheme}"
      >Save as Theme</Button
    >
  </div>
</div>

<style>
</style>
