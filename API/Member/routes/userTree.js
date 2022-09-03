const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const userTreeController = require('./../controllers/userTreeController');

router.get('/search-tree',[passportJWT.isLogin], userTreeController.userTree);
router.get('/search-tree-uuid/:uuid',[passportJWT.isLogin], userTreeController.userTreeUUID);

module.exports = router;