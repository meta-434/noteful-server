insert into noteful_notes (note_name, note_content, assigned_folder)
values
    ('note 1 @ folder 1', 'content for note 1 in folder 1', (select id from noteful_folders where folder_name = 'folder 1')),
    ('note 2 @ folder 1', 'content for note 2 in folder 1', (select id from noteful_folders where folder_name = 'folder 1')),
    ('note 1 @ folder 2', 'content for note 1 in folder 2', (select id from noteful_folders where folder_name = 'folder 2')),
    ('note 1 @ folder 3', 'content for note 1 in folder 3', (select id from noteful_folders where folder_name = 'folder 3')),
    ('note 2 @ folder 3', 'content for note 1 in folder 3', (select id from noteful_folders where folder_name = 'folder 3')),
    ('note 3 @ folder 3', 'content for note 1 in folder 3', (select id from noteful_folders where folder_name = 'folder 3'))
;