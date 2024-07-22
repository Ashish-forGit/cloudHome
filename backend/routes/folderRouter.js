const exprees = require('express');
const {  createFolder } = require('../controller/folderControllers.js');


const folderRouter = exprees.Router();

folderRouter.post('/create', createFolder)




module.exports = { folderRouter };