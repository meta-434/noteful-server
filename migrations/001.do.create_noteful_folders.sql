create extension if not exists "uuid-ossp";
create table noteful_folders (
    id uuid default uuid_generate_v4(),
    folder_name text not null unique,
    primary key (id)
);
