

import { db } from "../main.js";
import type { CheckLists, Notes } from "./types.js";
// import { useDB } from "./index.js";

class DBService {
    notes = {
        async getAll(){
            return await db.select<Notes[]>(`SELECT * FROM notes`)
        },
        async getById(id: string){
            return await db.select<Notes>(`SELECT * FROM notes where id = $1`, [id])
        },
        async deleteById(id: string) {
            return await db.execute(`DELETE FROM notes where id = $1`, [id])
        }
    }
    checklists = {
        async getAll(){
            return await db.select<CheckLists[]>(`SELECT * FROM checklists`)
        },
        async getById(id: string){
            return await db.select<CheckLists>(`SELECT * FROM checklists where id = $1`, [id])
        },
        async deleteById(id: string) {
            return await db.execute(`DELETE FROM checklists where id = $1`, [id])
        },
        async update(checklist: CheckLists){
            const foundChecklist = await this.getById(checklist.id)
            return await db.execute(
           `UPDATE 
            checklists 
          SET 
            title = $2,
            questions = $2,
            is_template = $3,
            template = $4
          WHERE 
            id = $1;`, [])
        },
        async create(checklist: Omit<CheckLists, 'id'>) {
            const { isTemplate, title, template, questions} = checklist
            return (await db.execute("INSERT into checklists (title, template, questions, isTemplate) VALUES ($1, $2, $3, $4)", [title, template, questions, isTemplate]))
        },
        
    }
}


export const dbService = new DBService()

// class Service<T>{
//     table: "notes" | "checklists";
 
//     constructor(table: "notes" | "checklists") {
//         this.table = table;

//     }
//     async getAll() {
//         return await db.select<T>(`SELECT * FROM ${this.table}`);
//     }

//     async getById(id: string) {
//         return await db.select<T>(`SELECT * FROM ${this.table} where id = ?1`, [id] );
//     }

//     async deleteById(id: string) {
//         return await db.execute(`DELETE FROM ${this.table} where id = ?1`, [id])
//     }
// }

// class NOTES extends Service<Notes>{
//     constructor(){
//         super('notes')
//     }

// }