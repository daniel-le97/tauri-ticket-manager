import { db } from "../main.js";
// import { useDB } from "./index.js";

class DBService {
    notes = {
        async getAllNotes(){
            return await db.select<Notes>(`SELECT * FROM notes`)
        },
        async getNoteById(id: string){
            return await db.select<Notes>(`SELECT * FROM notes where id = ?1`, [id])
        }
    }
    checklists = {
        async getChecklists(){
            return await db.select(`SELECT * FROM checklists`)
        }
    }
}


export const dbService = new DBService()
