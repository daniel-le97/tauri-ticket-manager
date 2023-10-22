import Database from "tauri-plugin-sql-api";

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
   private async applyShemas(db: Promise<Database>){
    const isMade = await (await db)
    .select(`SELECT name FROM sqlite_master WHERE type="table"`) as {name:string}[]

    if (isMade.length === 3) {
        console.log('not running');
        return 
    }
    console.log('running');
    
        
    const createTemplates = await (await db).execute(`CREATE TABLE IF NOT EXISTS templates (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        title TEXT NOT NULL,
        content TEXT,
        tag TEXT DEFAULT 'default'
    );`);     

    const createNotes = await (await db).execute(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        phone INTEGER,
        asset TEXT,
        machine TEXT
    );`);
     
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