CREATE TABLE IF NOT EXISTS checklists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    questions JSON NOT NULL,
    is_template INTEGER NOT NULL, -- 1 for true, 0 for false
    template TEXT
);
CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        phone INTEGER,
        asset TEXT,
        machine TEXT
        );


drop TABLE notes;
DROP TABLE checklists;