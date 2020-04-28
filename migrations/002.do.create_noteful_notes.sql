create extension if not exists "uuid-ossp";
create table noteful_notes (
    id uuid default uuid_generate_v4(),
    primary key (id),
    note_name text not null,
    note_content text not null,
    date_modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    assigned_folder uuid references noteful_folders(id) on delete cascade not null
);