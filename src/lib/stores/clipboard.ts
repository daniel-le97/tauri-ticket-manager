import { readText } from "@tauri-apps/api/clipboard";
import { writable } from "svelte/store";

export const clipBoardText = writable<string | null>("");
let text: string | null;
export const clipboardCheckInterval = setInterval(() => {
  copyClipBoard();
}, 1000);

export async function copyClipBoard() {
  try {
    clipBoardText.set(await readText());
  
  } catch (error) {
    console.error("Error reading clipboard text:", error);
  }
}
