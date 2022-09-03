const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.get('/',[ passportJWT.isLogin,  ] , memberController.index);
router.get('/deposit/:username',[ passportJWT.isLogin,  ] , memberController.depositListMember);
router.get('/withdraw/:username',[ passportJWT.isLogin,  ] , memberController.withdrawListMember);
router.post('/',[ passportJWT.isLogin,  ] , memberController.create);
router.get('/edit/:uuid',[ passportJWT.isLogin,  ] , memberController.edit); //
router.get('/change-password/:uuid',[ passportJWT.isLogin,  ] , memberController.changPassword);
router.get('/check-data/:username',[ passportJWT.isLogin,  ] , memberController.checkDataMember);
router.post('/old-member',[ passportJWT.isLogin,  ] , memberController.oldMember);
router.post('/update',[ passportJWT.isLogin,  ] , memberController.update); //

module.exports = router;