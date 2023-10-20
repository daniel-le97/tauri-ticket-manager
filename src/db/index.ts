import Database from "tauri-plugin-sql-api";
import * as tauri from "@tauri-apps/api"

export class DB {
    db: Promise<Database>
    constructor(){
        this.db = Database.load("sqlite:test.db")
        this.applyShemas(this.db)
    }
    async select<T>(query:string, bindValues?: unknown[] | undefined){
        return (await this.db).select<T>(query, bindValues ? bindValues : undefined)
    }
    async execute(query:string, bindValues?: unknown[] | undefined){
        return (await this.db).execute(query, bindValues ? bindValues : undefined)
    }
   private async applyShemas(db: Promise<Database>){
       console.log('applying schemas');
       
        
    }
}

const schemas = {
    "notes": `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER
        description TEXT,
        phone INTEGER,
        asset TEXT,
        machine TEXT);`
}