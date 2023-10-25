<script lang="ts">
  import { GradientButton } from "flowbite-svelte";
  import ColorPicker from "./ColorPicker.svelte";
  import { invoke } from "@tauri-apps/api/tauri";
  import Greet from "./Greet.svelte";
  // const invoke = window.__TAURI__.invoke
  
  async function openFileExplorerToDb() {
try {
 await invoke('my_custom_command')
  } catch (error) {
  
  }
  }
</script>

<div class="">
  <ColorPicker />
  <GradientButton on:click="{() => openFileExplorerToDb}">DB</GradientButton>
  <Greet/>
</div>
