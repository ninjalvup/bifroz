const express = require('express');
const router = express.Router();
const autoSmsController = require('../controllers/autoSmsController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.post('/scb/insert-sms-transaction/:key', autoSmsController.insertSms);
router.post('/kbank/insert-sms-transaction/:key', autoSmsController.insertKbankSms);

router.get('/scb/sms-transaction', [passportJWT.isLogin, ], autoSmsController.getSmsListSCB);
router.get('/scb/sms-transaction/list-wait', [passportJWT.isLogin, ], autoSmsController.getSmsListSCBStatusWait);
router.get('/scb/sms-transaction/list-success', [passportJWT.isLogin, ], autoSmsController.getSmsListSCBStatusSuccess);
router.get('/scb/sms-transaction/:uuid', [passportJWT.isLogin, ], autoSmsController.getSmsSCBByUUID);
router.post('/scb/sms-transaction/approved-deposit/:uuid', [passportJWT.isLogin, ], autoSmsController.approvedSmsSCB);
router.post('/scb/sms-transaction/hide/:uuid', [passportJWT.isLogin, ], autoSmsController.hideSmsSCB);
router.post('/scb/sms-transaction/show/:uuid', [passportJWT.isLogin, ], autoSmsController.showSmsSCB);

module.exports = router;