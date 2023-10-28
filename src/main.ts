import "./styles.css";
import App from "./App.svelte";
import  {db} from "./db/index.js";

db.applyShemas().catch().finally(() => {
  const app = new App({
    target: document.getElementById("app")!,
  });
})

