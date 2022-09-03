const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const apiExternalController = require('./../controllers/apiExternalController');
const truemoneyAutoController = require('./../controllers/truemoneyAutoController');
const autodecimalController = require('./../controllers/autodecimalController');




router.post('/qr-deposit',[
    body('amount').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
],[passportJWT.isLogin],apiExternalController.qrdeposit);

router.post('/deposit',[passportJWT.isLogin],autodecimalController.deposit);


// router.post('/deposit',[
//     body('amount').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
// ],[passportJWT.isLogin],apiExternalController.deposit);



router.post('/curl',[
    body('hash_key').not().isEmpty().withMessage('กรุณากรอกhash_keyด้วย'),
    body('title').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
    body('date').not().isEmpty().withMessage('กรุณากรอกtitleด้วย'),
    body('time').not().isEmpty().withMessage('กรุณากรอกdateด้วย'),
    body('amount').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
],apiExternalController.autocurl);

router.post('/truemoney',truemoneyAutoController.autotruemoney);



router.get('/credit',[passportJWT.isLogin], apiExternalController.getCredit);







module.exports = router;
