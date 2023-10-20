import "./styles.css";
import App from "./App.svelte";
import { DB } from "./db/index.js";
// import { dbService } from "./db/service.js";
 export const db = new DB()
//  console.log(await dbService.templates.getById(1));
 
const app = new App({
  target: document.getElementById("app")!,
});

export default app;
