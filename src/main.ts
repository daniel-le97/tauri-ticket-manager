import "./styles.css";
import App from "./App.svelte";
import  {db} from "./db/index.js";

// let init = db.resetDb()

//  console.log(await dbService.templates.getById(1));
db.applyShemas().catch().finally(() => {
  const app = new App({
    target: document.getElementById("app")!,
  });
})

