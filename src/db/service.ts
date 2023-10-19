import { db } from "../main.js";
// import { useDB } from "./index.js";
export type User = {
    name: string,
    age: number
}
class DBService {
    async getAllNotes(){
        return await db.select<User>(`SELECT * FROM notes`)
    }
    async getNoteById(id: string){
        return await db.select(`SELECT * FROM notes`)
    }
}


export const dbService = new DBService()