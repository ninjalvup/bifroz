const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const passportJWT = require('../middleware/passportJWT');
const memberController = require('./../controllers/memberController');
const memberAccountTransaction = require('./../controllers/memberAccountTransaction');

router.get('/profile',[passportJWT.isLogin], memberController.profile);
router.post('/register',[
  
    body('first_name').not().isEmpty().withMessage('กรุณาป้อนข้อมูลชื่อด้วย'),
    body('last_name').not().isEmpty().withMessage('กรุณากรอกชื่อสกุลด้วย'),
    body('tel').not().isEmpty().withMessage('กรุณากรอกtelด้วย'),
    body('bonus').not().isEmpty().withMessage('กรุณากรอกbonusด้วย'),
    body('bank_name').not().isEmpty().withMessage('กรุณากรอก bank_name ด้วย'),
    body('bank_number').not().isEmpty().withMessage('กรุณากรอก bank_number ด้วย'),
    body('password').not().isEmpty().withMessage('กรุณากรอกรหัสผ่านด้วย').isLength({min: 3}).withMessage('รหัสผ่านต้อง 3 ตัวอักษรขึ้นไป')

], memberController.register);

router.post('/login', memberController.login);
router.get('/redirect', memberController.redirectLogin);
router.get('/logout',[passportJWT.isLogin],memberController.logout);

router.get('/edit',[passportJWT.isLogin], memberController.edit);


router.put('/update',[
    body('first_name').not().isEmpty().withMessage('กรุณาป้อนข้อมูลชื่อด้วย'),
    body('last_name').not().isEmpty().withMessage('กรุณากรอกชื่อสกุลด้วย'),
    body('tel').not().isEmpty().withMessage('กรุณากรอกtelด้วย'),
 
],[passportJWT.isLogin],memberController.update);

router.put('/updatepassword',[  
    body('password').not().isEmpty().withMessage('กรุณาป้อนรหัสใหม่'),
    body('passwordold').not().isEmpty().withMessage('กรุณาป้อนรหัสเก่า')
],[passportJWT.isLogin],memberController.updatepassword);


// report
router.get('/reportdeposit',[passportJWT.isLogin], memberAccountTransaction.reportd);
router.get('/reportwithdraw',[passportJWT.isLogin], memberAccountTransaction.reportw);

//regular-dipost  RegularDeposit
router.post('/regulardeposit',[passportJWT.isLogin], memberAccountTransaction.RegularDeposit);

// getbank
router.get('/bank',[passportJWT.isLogin], memberController.bank);

// gettruemoney
router.get('/truemoney',[passportJWT.isLogin], memberController.getTruemoney);

// getshowmlm
router.get('/showmlm',[passportJWT.isLogin], memberController.showMLM);

router.post('/header', memberController.header);

router.post('/forgotpassword', memberController.forgotpassword);
router.post('/updatepw', memberController.forgotpasswordupdate);

// launch game
router.post('/launch-game', [passportJWT.isLogin], memberController.launchGame);


module.exports = router;
