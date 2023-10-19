import "./styles.css";
import App from "./App.svelte";
import { DB } from "./db/initializeDb.js";
 export const db = new DB()
const app = new App({
  target: document.getElementById("app")!,
});

export default app;
