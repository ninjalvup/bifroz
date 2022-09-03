const express = require('express');
const { route } = require('.');
const router = express.Router();
const affiliateMLMController = require('../controllers/affiliateMLMController');

const passportJWT = require('../middleware/passportJWT');

// page affiliatesetting
router.get('/get-data-setting', [passportJWT.isLogin], affiliateMLMController.getDataSetting);
router.post('/update-promotion', [passportJWT.isLogin], affiliateMLMController.updatePromotion);

// page affiliatewithdraw
router.post('/search-data', [passportJWT.isLogin], affiliateMLMController.searchData);
router.get('/search-data-date/:status', [passportJWT.isLogin], affiliateMLMController.searchDataDate);

// page affiliatetransaction
router.post('/check-data/', [passportJWT.isLogin], affiliateMLMController.checkData);

// pate affiliatetree
router.post('/check-data-tree/', [passportJWT.isLogin], affiliateMLMController.searchDataTree);
router.get('/check-data-tree-link/:uuid', [passportJWT.isLogin], affiliateMLMController.searchDataTreeLink);

router.post('/check-data-tree-table/', [passportJWT.isLogin], affiliateMLMController.searchDataTreeTable);

module.exports = router;
