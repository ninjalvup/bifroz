const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');
const bankScbController = require('../controllers/bank_withdraw/appScb');


const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');


// test

router.get('/status',bankScbController.getUUid);



//set app-scb
router.get('/scb',[passportJWT.isLogin] , bankScbController.index);
router.post('/createscb',[passportJWT.isLogin] , bankScbController.createScb);
router.put('/updatescb/:uuid',[passportJWT.isLogin] , bankScbController.updateScb);
router.put('/updatestatus/:uuid',[passportJWT.isLogin] , bankScbController.updateStatus);

// logs
router.get('/logtransaction',[passportJWT.isLogin] , bankScbController.logTransaction);


router.get('/', [passportJWT.isLogin] , bankController.index);
router.get('/account', [passportJWT.isLogin, ] , bankController.mainBank);
router.get('/account-withdraw', [passportJWT.isLogin, ] , bankController.bankWitdraw);
router.get('/:uuid', [passportJWT.isLogin, ] , bankController.edit);
router.post('/', [passportJWT.isLogin, ] , bankController.create);
router.put('/:uuid', [passportJWT.isLogin, ] , bankController.update);
router.delete('/:uuid', [passportJWT.isLogin, ] , bankController.deleteBank);
router.put('/system/:uuid/:status_system', [passportJWT.isLogin, ] , bankController.updateStatusSystem);




module.exports = router;
