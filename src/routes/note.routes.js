const express = require('express');
const { noteController } = require('../controllers');

const noteRoutes = express.Router({});

noteRoutes.get('/', noteController.getList);
noteRoutes.post('/', noteController.addOne);
noteRoutes.get('/count', noteController.getListCount);
noteRoutes.get('/display-settings/', noteController.getConfig);
noteRoutes.get('/:noteId/', noteController.getOne);
noteRoutes.put('/:noteId/', noteController.updateOne);
noteRoutes.post('/:noteId/enable', noteController.enableOne);
noteRoutes.post('/:noteId/disable', noteController.disableOne);
noteRoutes.delete('/:noteId/', noteController.deleteOne);
noteRoutes.get('/name/suggest/:name', noteController.suggestCopyName);

module.exports = noteRoutes;
