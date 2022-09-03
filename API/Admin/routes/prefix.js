const express = require('express');
const router = express.Router();
const prefixController = require('../controllers/prefixController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');


router.put('/:uuid',[ passportJWT.isLogin,  ], prefixController.updateprefix);
router.get('/',[ passportJWT.isLogin,  ], prefixController.getprefix);


module.exports = router;