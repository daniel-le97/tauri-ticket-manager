import Database from "tauri-plugin-sql-api";
import { Note, NoteDTO } from "./types.js";
import { appState, resetAppState } from "../lib/stores/appState.js";

class DBInit {
    _db: Promise<Database>
    constructor(){
        this._db = Database.load("sqlite:test.db")
        this.applyShemas(this._db)
        // this.generateNotes(2000)
    }
    async select<T>(query:string, bindValues?: unknown[] | undefined){
        return (await this._db).select<T>(query, bindValues ? bindValues : undefined)
    }
    async execute(query:string, bindValues?: unknown[] | undefined){
        return (await this._db).execute(query, bindValues ? bindValues : undefined)
    }
   async resetDb(){
        return ((await this._db).execute(`DROP table notes;DROP table templates`))
    }


    generateDateWithIncrement(number: number) {
        const baseDate = new Date('2023-10-25T21:36:06'); // Base date and time
        const incrementedDate = new Date(baseDate.getTime() + number * 1000); // Increment by 'number' seconds
        return incrementedDate.toISOString().slice(0, 19).replace('T', ' ');
    }
   private async generateNotes(count: number) {
        for await(const i of Array(count).keys()) {
            setTimeout(() => console.log(), 1000)
            const note = {
                asset: `Asset ${i}`,
                description: `Fake Note ${i}`,
                email: `fake${i}@example.com`,
                phone: `555-555-${1000 + i}`,
                created_at: this.generateDateWithIncrement(i)
            };
           
            const insertNote = await (await this._db).execute("INSERT into notes (asset, description, email, phone, created_at) VALUES ($1, $2, $3, $4, $5)", [note.asset,note.description,note.email,note.phone, note.created_at]);
            // console.log(insertNote.lastInsertId);
            
        }
    }
   private async applyShemas(db: Promise<Database>){
    const isMade = await (await db)
    .select(`SELECT name FROM sqlite_master WHERE type="table"`) as {name:string}[]
    
       if ( isMade.length === 4 )
       {
        // console.log('not running');
        return 
        
    }
    // console.log('creating database');
    
       const createThemes = await ( await db ).execute( `CREATE TABLE IF NOT EXISTS themes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        note_color TEXT,
        active INT DEFAULT 1,
        menu_color TEXT
      );`)
    const createTemplates = await (await db).execute(`CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT,
        tag TEXT DEFAULT 'default'
    );`);    
    
    // console.log(createTemplates.rowsAffected);
    

    const createNotes = await (await db).execute(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATERIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        phone INTEGER,
        asset TEXT,
        current INTEGER DEFAULT 1,
        email TEXT
    );`);

    // console.log(createNotes.rowsAffected);
    
    const note = new Note()
    const insertNote = await (await db).execute("INSERT into notes (asset, description, email, phone) VALUES ($1, $2, $3, $4)", [note.asset,note.description,note.email,note.phone]);
    const insertedNote = (await (await db).select<NoteDTO[]>(`SELECT * from notes where id = $1`, [insertNote.lastInsertId]))[0]
    resetAppState(insertedNote)




    // await this.generateNotes(500)
     
    // NOTE do not reformat this, needs to be like this for correct spacing
    const insertTemplate = await (await db).execute(`INSERT INTO templates (title, content) VALUES (
        'General Call Template',
        "User's Stated Issue:
When did it last work:
How many users are affected: 
        
Troubleshooting Steps:
-------------------------------"
    );`);           
       const insertThemes = await ( await db ).execute( `INSERT INTO themes (note_color, menu_color) VALUES ($1, $2);`, ["#000000", "#000000"] );           
   }
}

export const db = new DBInit()

