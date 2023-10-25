-- Active: 1698188609823@@127.0.0.1@3306
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
        current INTEGER DEFAULT 0,
        email TEXT
        );
CREATE TABLE IF NOT EXISTS themes (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  note_color TEXT NOT NULL,
  active INT DEFAULT 1,
  menu_color TEXT NOT NULL
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
DROP TABLE templates;

INSERT into notes (asset, description, email, phone) VALUES (123456,'some content', "daniel97.le@gmail.com", "2088632203");

-- Insert 5 records into the "notes" table
INSERT INTO notes (description, phone, asset, machine) VALUES
    ('Note 1: Description A', 12345, 'Asset X', 'Machine Alpha'),
    ('Note 2: Description B', 54321, 'Asset Y', 'Machine Beta'),
    ('Note 3: Description C', 98765, 'Asset Z', 'Machine Gamma'),
    ('Note 4: Description D', 45678, 'Asset X', 'Machine Alpha'),
    ('Note 5: Description E', 87654, 'Asset Z', 'Machine Delta');

INSERT INTO
    notes (
        created_at,
        updated_at,
        description,
        phone,
        asset,
        email
    )
VALUES (
        '2023-10-23 10:00:00',
        '2023-10-23 10:30:00',
        'Fake Note 1',
        '555-555-5555',
        'Asset 1',
        'fake1@example.com'
    ), (
        '2023-10-23 11:00:00',
        '2023-10-23 11:30:00',
        'Fake Note 2',
        '555-555-5556',
        'Asset 2',
        'fake2@example.com'
    ), (
        '2023-10-23 12:00:00',
        '2023-10-23 12:30:00',
        'Fake Note 3',
        '555-555-5557',
        'Asset 3',
        'fake3@example.com'
    ), (
        '2023-10-23 13:00:00',
        '2023-10-23 13:30:00',
        'Fake Note 4',
        '555-555-5558',
        'Asset 4',
        'fake4@example.com'
    ), (
        '2023-10-23 14:00:00',
        '2023-10-23 14:30:00',
        'Fake Note 5',
        '555-555-5559',
        'Asset 5',
        'fake5@example.com'
    ), (
        '2023-10-23 15:00:00',
        '2023-10-23 15:30:00',
        'Fake Note 6',
        '555-555-5560',
        'Asset 6',
        'fake6@example.com'
    ), (
        '2023-10-23 16:00:00',
        '2023-10-23 16:30:00',
        'Fake Note 7',
        '555-555-5561',
        'Asset 7',
        'fake7@example.com'
    ), (
        '2023-10-23 17:00:00',
        '2023-10-23 17:30:00',
        'Fake Note 8',
        '555-555-5562',
        'Asset 8',
        'fake8@example.com'
    ), (
        '2023-10-23 18:00:00',
        '2023-10-23 18:30:00',
        'Fake Note 9',
        '555-555-5563',
        'Asset 9',
        'fake9@example.com'
    ), (
        '2023-10-23 19:00:00',
        '2023-10-23 19:30:00',
        'Fake Note 10',
        '555-555-5564',
        'Asset 10',
        'fake10@example.com'
    );