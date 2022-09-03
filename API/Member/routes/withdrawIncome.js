const express = require('express');
const router = express.Router();
const passportJWT = require('../middleware/passportJWT');
const userTreeController = require('./../controllers/withdrawIncomeController');

router.get('/income-data',[passportJWT.isLogin], userTreeController.getDataIncome);
router.get('/income-data-user',[passportJWT.isLogin], userTreeController.getDataUser);

router.post('/withdraw-income',[passportJWT.isLogin], userTreeController.getDataWithdrawIncome);

module.exports = router;