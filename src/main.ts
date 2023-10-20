import "./styles.css";
import App from "./App.svelte";
import { DB } from "./db/index.js";
 export const db = new DB()
const app = new App({
  target: document.getElementById("app")!,
});

export default app;
