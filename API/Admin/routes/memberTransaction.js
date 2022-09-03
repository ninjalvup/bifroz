const express = require('express');
const router = express.Router();
const memberTransactionController = require('../controllers/memberTransactionController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');


router.post('/requeue', [passportJWT.isLogin, ] , memberTransactionController.requeue);
router.get('/withdraw-pending-list', [passportJWT.isLogin, ] , memberTransactionController.withdrawPendingForApprovalList);
router.get('/deposit-pending-list', [passportJWT.isLogin, ] , memberTransactionController.depositPendingForApprovalList);
router.get('/withdraw-dis-approve-list', [passportJWT.isLogin, ] , memberTransactionController.withdrawDisApprovedList);
router.get('/withdraw-approved-list', [passportJWT.isLogin, ] , memberTransactionController.withdrawApprovedList);
router.get('/show-withdraw/:uuid', [passportJWT.isLogin, ] , memberTransactionController.showApproveWithdrawByUUID);
router.post('/approved-withdraw', [passportJWT.isLogin, ] , memberTransactionController.approveWithdraw);
router.get('/check-data/:username',[ passportJWT.isLogin,  ] , memberTransactionController.checkDataMember);
router.post('/make-withdraw', [passportJWT.isLogin, ] , memberTransactionController.makeWithdraw);
router.post('/check-seven-day',[ passportJWT.isLogin,  ] , memberTransactionController.checkSevenDay);
router.post('/approve-withdraw-auto', [passportJWT.isLogin, ] , memberTransactionController.approveWithdrawAuto);
router.post('/approve-withdraw-auto/update-status', [passportJWT.isLogin, ] , memberTransactionController.updateStatusWithdraw);
router.post('/otp-withdraw', memberTransactionController.checkOTP);

module.exports = router;