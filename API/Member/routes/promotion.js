const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const promotionController = require('./../controllers/promotionController');


router.get('/',[passportJWT.isLogin], promotionController.getpromotion);


router.post('/deposit',[
    body('amount').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
],[passportJWT.isLogin],promotionController.deposit);

router.put('/bonus',[passportJWT.isLogin],promotionController.bonus);


module.exports = router;
