const express = require('express');
const router = express.Router();
const errorListTypeController = require('../controllers/errorListTypeController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.get('/', [passportJWT.isLogin, ] , errorListTypeController.index);

module.exports = router;