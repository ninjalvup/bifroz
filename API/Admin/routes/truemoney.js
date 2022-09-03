const express = require('express');
const router = express.Router();
const autoTruemoneyController = require('../controllers/autoTruemoneyController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');




router.get('/', [passportJWT.isLogin, ], autoTruemoneyController.getTruemoney);
router.get('/truemoney-notaccount', [passportJWT.isLogin, ], autoTruemoneyController.getTruemoneyNotaccount);

router.get('/truemoney-transaction/:uuid', [passportJWT.isLogin, ], autoTruemoneyController.getTruemoneyByID);
router.post('/truemoney-transaction/approved-deposit/:uuid', [passportJWT.isLogin, ], autoTruemoneyController.approvedTruemoney);

router.post('/truewallet', autoTruemoneyController.truewallet);

router.get('/deposit', autoTruemoneyController.deposit)


module.exports = router;