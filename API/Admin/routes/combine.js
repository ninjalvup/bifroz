const express = require('express');
const router = express.Router();
const combineController = require('../controllers/combineController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.get('/',  combineController.getcombine);
router.put('/setting/:uuid',  combineController.setting);


module.exports = router;
