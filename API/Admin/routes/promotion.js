const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotionController');

const passportJWT = require('../middleware/passportJWT');
const authentication = require('../middleware/authentication');

router.get('/', [passportJWT.isLogin, ] , promotionController.index);
router.post('/', [passportJWT.isLogin, ] , promotionController.create);
router.get('/:uuid', [passportJWT.isLogin, ] , promotionController.edit);
router.put('/:uuid', [passportJWT.isLogin, ] , promotionController.update);
router.post('/add-condition', [passportJWT.isLogin, ] , promotionController.addCondition);
router.delete('/delete-condition/:uuid', [passportJWT.isLogin, ] , promotionController.deleteCondition);

module.exports = router;