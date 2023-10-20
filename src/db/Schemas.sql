CREATE TABLE IF NOT EXISTS checklists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT
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