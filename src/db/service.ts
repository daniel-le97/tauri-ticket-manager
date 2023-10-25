


import { db } from "./index.js";
import { type TemplateDTO, type Template, type Note, NoteDTO, type Common, Theme } from "./types.js";
import { defu } from 'defu'
// import * as dialog from '@tauri-apps/api/dialog'
// import { useDB } from "./index.js";

class DBService {
    settings = {
        async getAll(){
            return await db.select<Theme[]>(`SELECT * FROM themes`)
        },
        async getOne ( id: number ) {
            const note = ( await db.select<Theme[]>( `SELECT * FROM themes where id = $1`, [ id ] ) )[ 0 ];
            return note;
        },
        async create ( theme: Theme ) {
            return await db.execute( `insert into 
            themes ( 
              note_color,
              menu_color
            )
          values
            (
              $1, 
              $2
            );`, [ theme.note_color, theme.menu_color] );
        },
        async save ( theme: Theme ) {
            return await db.execute(
                `UPDATE themes SET
                    active = $1,
                    menu_color = $2,
                    note_color = $3
                    WHERE id = $4;`,
                    [theme.active, theme.menu_color, theme.note_color, theme.id]);
        },
        async delete ( id: string ) {
            return await db.execute( `DELETE FROM themes where id = $1`, [ id ] )
        }
    }
    notes = {
        async count(){
            type Count = {"COUNT(*)": number}
            return (await db.select<Count[]>(`SELECT COUNT(*) FROM notes`))[0]["COUNT(*)"]
        },
        async getAll(){
            return await db.select<NoteDTO[]>(`SELECT * FROM notes`)
        },
        async getSome(number: number, page: number){
            return await db.select<NoteDTO[]>(`SELECT * FROM notes ORDER BY id DESC LIMIT $1 OFFSET ($2 - 1) * 100`, [number, page])
        },
        
        async getById(id: string | number){
            const note = (await db.select<NoteDTO[]>(`SELECT * FROM notes where id = $1`, [id]))[0]
            if (!note) {
                console.error('[DB:note:getById] Error: there was a problem finding id ' + id);
            }
            return note
        },
        async deleteById(id: string) {
            const note = await this.getById(id)
            return await db.execute(`DELETE FROM notes where id = $1`, [note.id])
        },
        async create(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
            const { asset, description, email, phone } = note
            const newNote = (await db.execute("INSERT into notes (asset, description, email, phone) VALUES ($1, $2, $3, $4)", [asset,description,email,phone]))
            return this.getById(newNote.lastInsertId)
        },
        async getCurrent(){
            return (await db.select<NoteDTO[]>(`SELECT * from notes where current = 1`))[0]
        },
        async getPrevious () {
            const response = ( await db.select<NoteDTO[]>( `SELECT n1.*
            FROM notes AS n1
            JOIN notes AS n2 ON n1.created_at < n2.created_at
            WHERE n2.current = 1
            ORDER BY n1.created_at DESC;`) )[ 0 ];
            return response;
        },
        async getNext () {
            const response = (await db.select<NoteDTO[]>(`SELECT n1.*
    FROM notes AS n1
    JOIN notes AS n2 ON n1.created_at > n2.created_at
    WHERE n2.current = 1
       OR (n2.current = 1 AND n1.id > n2.id)
       OR (n2.current = 1 AND n1.id = n2.id)  -- Include the same ID
    ORDER BY n1.created_at ASC, n1.id ASC;
  `))[0];
            return response;
        },
        async update ( note: NoteDTO, current?: number ) {
            const updated = await db.execute(`update 
            notes 
          set 
            description = $2,
            phone = $3,
            asset = $4,
            email = $5,
            current = $6
          where 
            id = $1;`, [ note.id, note.description, note.phone, note.asset, note.email, current ?? note.current ] )
            if (updated.rowsAffected !== 1) {
                console.error('[DB:note:update] Error: there was a problem updating the note id ' + note.id )
            }
            return updated
            
        }
    }
    templates = {
        async getAll(){
            return await db.select<TemplateDTO[]>(`SELECT * FROM templates`)
        },
        async getById(id: string | number){
            return (await db.select<TemplateDTO[]>(`SELECT * FROM template where id = $1`, [id]))[0]
        },
        async deleteById(id: number) {
          
            
            return await db.execute(`DELETE FROM templates where id = $1`, [id])
        },
        async update(template: TemplateDTO){
            return await db.execute(
           `UPDATE 
            templates
          SET 
            title = $2,
            content = $3,
            tag = $4
          WHERE 
            id = $1;`, [template.id, template.title, template.content, template.tag])
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

