CREATE TABLE IF NOT EXISTS checklists (
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


drop TABLE notes;
DROP TABLE checklists;

INSERT INTO checklists (title, questions, is_template, template, tag) VALUES
    ('Checklist 1', 'Question 1, Question 2', 1, 'Template 1', 'Tag A'),
    ('Checklist 2', 'Question 3, Question 4', 0, NULL, 'Tag B'),
    ('Checklist 3', 'Question 5, Question 6', 1, 'Template 2', 'Tag C'),
    ('Checklist 4', 'Question 7, Question 8', 0, NULL, 'Tag A'),
    ('Checklist 5', 'Question 9, Question 10', 1, 'Template 3', 'Tag B');

-- Insert 5 records into the "notes" table
INSERT INTO notes (description, phone, asset, machine) VALUES
    ('Note 1: Description A', 12345, 'Asset X', 'Machine Alpha'),
    ('Note 2: Description B', 54321, 'Asset Y', 'Machine Beta'),
    ('Note 3: Description C', 98765, 'Asset Z', 'Machine Gamma'),
    ('Note 4: Description D', 45678, 'Asset X', 'Machine Alpha'),
    ('Note 5: Description E', 87654, 'Asset Z', 'Machine Delta');