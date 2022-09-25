const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const apiExternalController = require('./../controllers/apiExternalController');


router.post('/withdraw',[
    body('amount').not().isEmpty().withMessage('กรุณากรอกamountด้วย'),
],[passportJWT.isLogin],apiExternalController.withdraw);

// withdraw income
router.get('/withdraw-income',[passportJWT.isLogin], apiExternalController.withdrawIncome);

module.exports = router;
