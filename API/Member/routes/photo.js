const express = require('express');
const router = express.Router();
const photoController = require('./../controllers/photoController');

const passportJWT = require('../middleware/passportJWT');

/* GET home page. ,[passportJWT.isLogin] */
router.get('/',photoController.index);

router.get('/prefix',photoController.getprefix);

router.post('/',photoController.photo);

module.exports = router;
