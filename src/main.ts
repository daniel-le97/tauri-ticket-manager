import "./styles.css";
import App from "./App.svelte";
import { db } from "./db/index.js";
import { noteService } from "./lib/services/notes.js";
import { get } from "svelte/store";
import { appState } from "./lib/stores/appState.js";
let init = db




//  console.log(await dbService.templates.getById(1));
 
const app = new App({
  target: document.getElementById("app")!,
});

export default app;
