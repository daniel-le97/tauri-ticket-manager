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
      const createTemplates =  (await (await db).execute(`CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            title TEXT NOT NULL,
            content TEXT,
            tag TEXT default 'default'
        );`))

        const notes = (await (await db).execute(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATERIME DEFAULT CURRENT_TIMESTAMP,
                    description TEXT,
                    phone INTEGER,
                    asset TEXT,
                    machine TEXT
                    );`))
        
        if (createTemplates.rowsAffected >= 1 && notes.rowsAffected >= 1) {
            (await db).execute(`INSERT INTO templates (title, content) VALUES (
                'General Call Template',
                'User''s Stated Issue:
            When did it last work:
            How many users are affected: 
            
            Troubleshooting Steps:
            -------------------------------'
            );`)
        }
       
        
    }
}

