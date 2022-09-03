const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const apiExternalController = require('./../controllers/apiExternalController');



router.get('/',[passportJWT.isLogin], apiExternalController.getCredit);



module.exports = router;
