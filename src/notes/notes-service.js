const NotesService = {
    getAllNotes(knex) {
        return knex
            .select('*')
            .from('noteful_notes');
    },
    insertNote(knex, newNote) {
        return knex
            .insert({
                'note_name':`${newNote.note_name}`,
                'note_content':`${newNote.note_content}`,
                'assigned_folder':`${newNote.assigned_folder}`
            })
            .into('noteful_notes')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getById(knex, id) {
        return knex
            .from('noteful_notes')
            .select('*')
            .where('id', id)
            .first();
    },
    deleteNote(knex, id) {
        return knex('noteful_notes')
            .where({id})
            .delete();
    }
};

module.exports = NotesService;