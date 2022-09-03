const express = require('express');
const router = express.Router();
const autoCurlController = require('../controllers/autoCurlController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');


router.get('/scb/curl-transaction', [passportJWT.isLogin, ], autoCurlController.getCurlListSCB);
router.get('/scb/curl-transaction-notaccount', [passportJWT.isLogin, ], autoCurlController.getCurlListSCBnotaccount);

router.get('/curl-transaction/:id', [passportJWT.isLogin, ], autoCurlController.getCurlByID);
router.post('/curl-transaction/approved-deposit/:id', [passportJWT.isLogin, ], autoCurlController.approvedCurl);

module.exports = router;