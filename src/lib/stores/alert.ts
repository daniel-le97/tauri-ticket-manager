import { writable } from "svelte/store";



export const alertState = writable({
  visible: false,
  text: "",
  color: "",
});
