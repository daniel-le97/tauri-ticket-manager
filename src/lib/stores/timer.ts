import { writable } from "svelte/store";
export const timer = writable(false)


  let totalSeconds = 0;
  let formattedTime = "00:00:00";


   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;
   formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
     minutes < 10 ? "0" : ""
   }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

   export const formateTime = writable(formattedTime)