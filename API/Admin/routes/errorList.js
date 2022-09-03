const express = require('express');
const router = express.Router();
const errorListController = require('../controllers/errorListController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.get('/', [passportJWT.isLogin, ] , errorListController.index);
router.post('/', [passportJWT.isLogin, ] , errorListController.create);

module.exports = router;