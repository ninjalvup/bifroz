const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const bankRouter = require('./routes/bank');
const promotionRouter = require('./routes/promotion');
const errorListTypeRouter = require('./routes/errorListType');
const errorListRouter = require('./routes/errorList');
const memberRouter = require('./routes/member');
const reportRouter = require('./routes/report');
const memberTransactionRouter = require('./routes/memberTransaction');
const smsRouter = require('./routes/sms');
const curlRouter = require('./routes/curl');
const truemoneyRouter = require('./routes/truemoney');
const prefixRouter = require('./routes/prefix');
const combineRouter = require('./routes/combine');
const affiliateRouter = require('./routes/affiliate');
//import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// let whitelist = ['https://admin.iwin98.net'];

// Then pass them to cors:
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/member',  memberRouter);
app.use('/api/bank', bankRouter);
app.use('/api/promotion', promotionRouter);
app.use('/api/err_list_type', errorListTypeRouter);
app.use('/api/err_list', errorListRouter);
app.use('/api/report', reportRouter);
app.use('/api/member_transaction', memberTransactionRouter);
app.use('/api/sms', smsRouter);
app.use('/api/curl', curlRouter);
app.use('/api/truemoney', truemoneyRouter);
app.use('/api/prefix',  prefixRouter);
app.use('/api/combine',  combineRouter);
app.use('/api/affiliate', affiliateRouter);

app.use(errorHandler);

module.exports = app;
