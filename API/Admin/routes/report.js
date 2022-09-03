const express = require('express');
const router = express.Router();
const reportController = require('../controllers/ReportController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.get('/deposit', [passportJWT.isLogin, ] , reportController.reportDeposit);
router.get('/withdraw', [passportJWT.isLogin, ] , reportController.reportWithdraw);
router.get('/summary-promotion', [passportJWT.isLogin, ] , reportController.reportSummaryPromotion);
router.get('/person', [passportJWT.isLogin, ], reportController.reportPerson);
router.get('/decimal', [passportJWT.isLogin, ], reportController.reportDecimal);
router.get('/profit-loss', [passportJWT.isLogin, ], reportController.reportProfitandloss);
router.get('/sms-hide-list', [passportJWT.isLogin, ], reportController.getHideSmsSCB);
router.get('/rank-withdraw', [passportJWT.isLogin, ], reportController.reportWithdrawRank);
router.get('/rank-deposit', [passportJWT.isLogin, ], reportController.reportDepositRank);
router.get('/create-deposit-list', [passportJWT.isLogin, ], reportController.reportCreateDeposit);

module.exports = router;