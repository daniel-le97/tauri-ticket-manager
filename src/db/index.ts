import Database from "tauri-plugin-sql-api";
import { Note, NoteDTO } from "./types.js";
import { appState, resetAppState } from "../lib/stores/appState.js";

class DBInit {
    _db: Promise<Database>
    constructor(){
        this._db = Database.load("sqlite:test.db")
        this.applyShemas(this._db)
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
   private async applyShemas(db: Promise<Database>){
    const isMade = await (await db)
    .select(`SELECT name FROM sqlite_master WHERE type="table"`) as {name:string}[]

    if (isMade.length === 3) {
        // console.log('not running');
        return 
        
    }
    console.log('creating database');
    
        
    const createTemplates = await (await db).execute(`CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT,
        tag TEXT DEFAULT 'default'
    );`);    
    
    console.log(createTemplates.rowsAffected);
    

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

    console.log(createNotes.rowsAffected);
    
    
    // const fakeNoes = await (await db).execute(`INSERT INTO notes (
    //     id,
    //     created_at,
    //     updated_at,
    //     description,
    //     phone,
    //     asset,
    //     "current",
    //     email
    //   ) VALUES
    //   (1, '2023-10-23 10:00:00', '2023-10-23 10:30:00', 'Fake Note 1', '555-555-5555', 'Asset 1', 1, 'fake1@example.com'),
    //   (2, '2023-10-23 11:00:00', '2023-10-23 11:30:00', 'Fake Note 2', '555-555-5556', 'Asset 2', 0, 'fake2@example.com'),
    //   (3, '2023-10-23 12:00:00', '2023-10-23 12:30:00', 'Fake Note 3', '555-555-5557', 'Asset 3', 0, 'fake3@example.com'),
    //   (4, '2023-10-23 13:00:00', '2023-10-23 13:30:00', 'Fake Note 4', '555-555-5558', 'Asset 4', 0, 'fake4@example.com'),
    //   (5, '2023-10-23 14:00:00', '2023-10-23 14:30:00', 'Fake Note 5', '555-555-5559', 'Asset 5', 0, 'fake5@example.com'),
    //   (6, '2023-10-23 15:00:00', '2023-10-23 15:30:00', 'Fake Note 6', '555-555-5560', 'Asset 6', 0, 'fake6@example.com'),
    //   (7, '2023-10-23 16:00:00', '2023-10-23 16:30:00', 'Fake Note 7', '555-555-5561', 'Asset 7', 0, 'fake7@example.com'),
    //   (8, '2023-10-23 17:00:00', '2023-10-23 17:30:00', 'Fake Note 8', '555-555-5562', 'Asset 8', 0, 'fake8@example.com'),
    //   (9, '2023-10-23 18:00:00', '2023-10-23 18:30:00', 'Fake Note 9', '555-555-5563', 'Asset 9', 0, 'fake9@example.com'),
    //   (10, '2023-10-23 19:00:00', '2023-10-23 19:30:00', 'Fake Note 10', '555-555-5564', 'Asset 10', 0, 'fake10@example.com');
    //   `);
    const note = new Note()
    const insertNote = await (await db).execute("INSERT into notes (asset, description, email, phone) VALUES ($1, $2, $3, $4)", [note.asset,note.description,note.email,note.phone]);
    const insertedNote = (await (await db).select<NoteDTO[]>(`SELECT * from notes where id = $1`, [insertNote.lastInsertId]))[0]
    resetAppState(insertedNote)
     
    // NOTE do not reformat this, needs to be like this for correct spacing
    const insertTemplate = await (await db).execute(`INSERT INTO templates (title, content) VALUES (
        'General Call Template',
        "User's Stated Issue:
When did it last work:
How many users are affected: 
        
Troubleshooting Steps:
-------------------------------"
    );`);           
    }
}

export const db = new DBInit()