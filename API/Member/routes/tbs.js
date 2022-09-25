const express = require('express');
const router = express.Router();
const apiExternalController = require('../controllers/apiExternalController');


router.post('/getotp', apiExternalController.callTBSGetOTP);
router.post('/verifyotp', apiExternalController.callTBSVerifyOTP);

module.exports = router;
