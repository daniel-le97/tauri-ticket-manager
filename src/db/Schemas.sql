CREATE TABLE IF NOT EXISTS templates (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,-- 1 for true, 0 for false
    content TEXT,
    tag TEXT default 'default'
);
CREATE TABLE IF NOT EXISTS notes (
id INTEGER PRIMARY KEY AUTOINCREMENT, 
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATERIME DEFAULT CURRENT_TIMESTAMP,
        description TEXT,
        phone INTEGER,
        asset TEXT,
        machine TEXT
        );

INSERT INTO templates (title, content) VALUES (
    'General Call Template',
    'User''s Stated Issue:
When did it last work:
How many users are affected: 

Troubleshooting Steps:
-------------------------------'
);

drop TABLE notes;
DROP TABLE checklists;



-- Insert 5 records into the "notes" table
INSERT INTO notes (description, phone, asset, machine) VALUES
    ('Note 1: Description A', 12345, 'Asset X', 'Machine Alpha'),
    ('Note 2: Description B', 54321, 'Asset Y', 'Machine Beta'),
    ('Note 3: Description C', 98765, 'Asset Z', 'Machine Gamma'),
    ('Note 4: Description D', 45678, 'Asset X', 'Machine Alpha'),
    ('Note 5: Description E', 87654, 'Asset Z', 'Machine Delta');

