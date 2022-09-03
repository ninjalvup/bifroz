const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const autodecimalController = require('./../controllers/autodecimalController');



router.post('/autodecimal/:key', autodecimalController.autodecimal);

router.post('/deposit',[
    body('amount').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
],[passportJWT.isLogin],autodecimalController.deposit);

module.exports = router;
