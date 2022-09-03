const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');


router.post('/login', userController.login);
// After Authentication
router.get('/profile',[ passportJWT.isLogin ] , userController.profile);
router.get('/',[ passportJWT.isLogin,   ] , userController.getAllUser); // staff
router.post('/',[ passportJWT.isLogin,  ] , userController.createUser);
router.put('/:uuid',[ passportJWT.isLogin ] , userController.update);
router.get('/:uuid',[ passportJWT.isLogin,  ] , userController.editUser);
router.post('/update',[ passportJWT.isLogin,  ] , userController.updateUser);
router.delete('/:uuid',[ passportJWT.isLogin,  ] , userController.deleteUser);

module.exports = router;
