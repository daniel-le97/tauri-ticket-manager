


import { db } from "./index.js";
import { type TemplateDTO, type Template, type Note, NoteDTO, type Common } from "./types.js";
import { defu } from 'defu'
// import * as dialog from '@tauri-apps/api/dialog'
// import { useDB } from "./index.js";

class DBService {
    notes = {
        async getAll(){
            return await db.select<Note[]>(`SELECT * FROM notes`)
        },
        async getById(id: string | number){
            return await db.select<NoteDTO>(`SELECT * FROM notes where id = $1`, [id])
        },
        async deleteById(id: string) {
            return await db.execute(`DELETE FROM notes where id = $1`, [id])
        },
        async create(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
            const { asset, description, email, phone } = note
            return (await db.execute("INSERT into notes (asset, description, email, phone) VALUES ($1, $2, $3, $4)", [asset,description,email,phone]))
        },
        async getCurrent(){
            return (await db.select<NoteDTO[]>(`SELECT * from notes where current = 1`))[0]
        },
        async update(note: NoteDTO){
            const oldNote = await this.getById(note.id)
            const merged = defu(oldNote, note)
            console.log(merged, oldNote);
        }
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
        async update(template: TemplateDTO){
            const foundChecklist = await this.getById(template.id)
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
            let { title, content, tag } = template
          
            const response =  (await db.execute("INSERT into templates (title, content, tag) VALUES ($1, $2, $3)", [title, content, tag]))
            if (response.rowsAffected === 0) {
            //   dialog.message("there was an issue creating the template please submit again")
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