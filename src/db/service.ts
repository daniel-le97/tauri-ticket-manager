

import { db } from "../main.js";
import type { Template, Note, Common } from "./types.js";
// import { useDB } from "./index.js";

class DBService {
    notes = {
        async getAll(){
            return await db.select<Note[]>(`SELECT * FROM notes`)
        },
        async getById(id: string | number){
            return await db.select<Note>(`SELECT * FROM notes where id = $1`, [id])
        },
        async deleteById(id: string) {
            return await db.execute(`DELETE FROM notes where id = $1`, [id])
        }
    }
    templates = {
        async getAll(){
            return await db.select<Template[]>(`SELECT * FROM templates`)
        },
        async getById(id: string | number){
            return await db.select<Template>(`SELECT * FROM template where id = $1`, [id])
        },
        async deleteById(id: string) {
            return await db.execute(`DELETE FROM template where id = $1`, [id])
        },
        async update(checklist: Template){
            const foundChecklist = await this.getById(checklist.id)
            return await db.execute(
           `UPDATE 
            template 
          SET 
            title = $2,
            content = $3,
            template = $4
          WHERE 
            id = $1;`, [])
        },
        async create(template: Omit<Template, 'id' | 'created_at' | 'updated_at'>) {
            const { title, content, tag } = template
            return (await db.execute("INSERT into templates (title, content, tag) VALUES ($1, $2, $3)", [title, content, tag]))
        },
        
    }
}


export const dbService = new DBService()

// class Service<T>{
//     table: "notes" | "template";
 
//     constructor(table: "notes" | "template") {
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