import Database from "tauri-plugin-sql-api";

// sqlite. The path is relative to `tauri::api::path::BaseDirectory::App`.
// const db = await Database.load("sqlite:test.db");
let db: Database | null = null

export const useDB = async() => {
    if (!db) {
        
        db = await Database.load("sqlite:test.db");
        console.log(db.path);
        
        db.execute(`CREATE TABLE IF NOT EXISTS users (name TEXT, age INTEGER);INSERT INTO users VALUES ('steve', 42);`)
    }
    return db
}