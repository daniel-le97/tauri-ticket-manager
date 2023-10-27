<script setup lang="ts">
  import { appWindow } from "@tauri-apps/api/window";

  function minimize() {
    appWindow.minimize();
  }
  function toggleMaximize() {
    appWindow.toggleMaximize();
  }
  function close() {
    appWindow.close();
  }
</script>

<div data-tauri-drag-region class="titlebar">
  <div
    data-tauri-drag-region
    class=" absolute left-3  space-x-3 flex items-center"
  >
    <img
      data-tauri-drag-region
      src="src-tauri\icons\icon.png"
      alt="tauri"
      width="20"
    />
      <img
      data-tauri-drag-region
      src="svelte.svg"
      alt="svelte"
      width="16"
    />
      <img
      data-tauri-drag-region
      src="vite.svg"
      alt="vite"
      width="18"
    />
 
      <img
      data-tauri-drag-region
      src="tailwind-css.svg"
      alt="tailwind"
      width="20"
    />
   <div class="flex">
       <img
      data-tauri-drag-region
      src="https://cdn-icons-png.flaticon.com/128/657/657695.png"
      alt="database"
      width="18"
    />
     <span   data-tauri-drag-region class="  text-yellow-200 text-xs  flex items-center ">SQL</span>
   </div>
  
    <span data-tauri-drag-region class="text-white">NoteTaker</span>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="titlebar-button" id="titlebar-minimize" on:click="{minimize}">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 12H18"
        stroke="#fff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
    </svg>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="titlebar-button"
    id="titlebar-maximize"
    on:click="{toggleMaximize}"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 9V6.5C2 4.01 4.01 2 6.5 2H9"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
      <path
        d="M15 2H17.5C19.99 2 22 4.01 22 6.5V9"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
      <path
        d="M22 16V17.5C22 19.99 19.99 22 17.5 22H16"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
      <path
        d="M9 22H6.5C4.01 22 2 19.99 2 17.5V15"
        stroke="#ffffff"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"></path>
    </svg>
  </div>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="titlebar-button" id="titlebar-close" on:click="{close}">
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      version="1.1"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="close" fill-opacity="1">
        <path
          d="M0 0L24 0L24 24L0 24L0 0Z"
          id="close"
          fill="none"
          fill-rule="evenodd"
          stroke="none"></path>
        <g id="close">
          <path
            d="M2 22L22 2"
            id="Vector"
            fill="none"
            fill-rule="evenodd"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"></path>
          <path
            d="M22 22L2 2"
            id="Vector"
            fill="none"
            fill-rule="evenodd"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"></path>
          <path
            d="M24 0L24 24L0 24L0 0L24 0Z"
            id="Vector"
            fill="none"
            fill-rule="evenodd"
            stroke="none"></path>
        </g>
      </g>
    </svg>
  </div>
</div>

<style>
  .titlebar {
    @apply bg-zinc-950;

    height: 35px;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    align-items: center;
    padding-inline: 2px;
  }

  .titlebar-button {
    display: flex;
    justify-content: center;
    align-items: center;
    fill: white;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    margin-inline: 3px;
    padding: 0;
  }

  .titlebar-button:last-child {
    margin-right: 6px;
  }

  .titlebar-button:hover {
    background: #303030;
  }

  #titlebar-close:hover {
    background-color: #e06c75;
  }
</style>
