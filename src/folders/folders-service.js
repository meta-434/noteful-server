// folders can only be queried of added, not deleted or changed.
const FoldersService = {
    getAllFolders(knex) {
        return knex
            .select('*')
            .from('noteful_folders');
    },
    insertFolder(knex, newFolder) {
        return knex
            .insert({'folder_name':newFolder})
            .into('noteful_folders')
            .returning('*')
            .then(rows => {
                return rows[0]
            });
    },
    getById(knex, id) {
        // may need to change to get by id due to UUID constraints
        return knex
            .from('noteful_folders')
            .select('*')
            .where('id', id)
            .first();
    },
    deleteFolder(knex, id) {
        return knex('noteful_folders')
            .where({id})
            .delete();
    }
};

module.exports = FoldersService;