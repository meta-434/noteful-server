const express = require('express');
const xss = require('xss');
const FoldersService = require('./folders-service');

const foldersRouter = express.Router();
const jsonParser = express.json();

const serializeFolder = folder => (
    {
        folder_name: xss(folder.folder_name),
        id: folder.id
    }
);

foldersRouter
    .route('/')
    .get(function(req, res, next) {
        const knexInstance = req.app.get('db');
        FoldersService.getAllFolders(knexInstance)
            .then(folders => {
                res.json(folders.map(serializeFolder))
            })
            .catch(next);
    })
    .post(jsonParser, function(req, res, next) {
        const { folder_name } = req.body;

        if (!folder_name) {
            return res.status(400).json({
                error: { message: `Missing folder_name in request body`}
            });
        }

        FoldersService.insertFolder(
            req.app.get('db'),
            folder_name
        )
            .then(folder => {
                res
                    .status(201)
                    .location(`/api/folders/${folder.id}`)
                    .json(serializeFolder(folder))
                    .end();
            })
            .catch(next);
    });

foldersRouter
    .route('/:folder_id')
    .all(function(req, res, next) {
        FoldersService.getById(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(folder => {
                if (!folder) {
                    return res.status(404).json({
                        error: { message: `folder doesn't exist`}
                    });
                }
            })
            next();
    })
    .get(function(req, res, next) {
       res.json(serializeFolder(res.folder));
    })
    .delete(function(req, res, next) {
        FoldersService.deleteFolder(
            req.app.get('db'),
            req.params.folder_id
        )
            .then(numRowsAffected => {
                res
                    .status(204)
                    .end();
            })
            .catch(next);
    });

module.exports = foldersRouter;