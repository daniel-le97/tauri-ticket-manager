


import { db } from "./index.js";
import type { TemplateDTO, Template, Note, Common } from "./types.js";
import * as dialog from '@tauri-apps/api/dialog'
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
        },
        async create(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
            const { asset, description, email, ipv4, phone } = note
            return (await db.execute("INSERT into notes (asset, description, email, ipv4, phone) VALUES ($1, $2, $3, $4, $5)", [asset,description,email,ipv4,phone]))
        },
    }
    templates = {
        async getAll(){
            return await db.select<TemplateDTO[]>(`SELECT * FROM templates`)
        },
        async getById(id: string | number){
            return await db.select<TemplateDTO>(`SELECT * FROM template where id = $1`, [id])
        },
        async deleteById(id: number) {
          
            
            return await db.execute(`DELETE FROM templates where id = $1`, [id])
        },
        async update(checklist: TemplateDTO){
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
            const response =  (await db.execute("INSERT into templates (title, content, tag) VALUES ($1, $2, $3)", [title, content, tag]))
            if (response.rowsAffected === 0) {
              dialog.message("there was an issue creating the template please submit again")
            }
            return response
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