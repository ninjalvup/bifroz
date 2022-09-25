const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const expressip = require('express-ip');




//import middleware
const errorHandler = require('./middleware/errorHandler');


const indexRouter = require('./routes/index');
const memberRouter = require('./routes/member');
const photoRouter = require('./routes/photo');
const depositRouter = require('./routes/deposit');
const withdrawRouter = require('./routes/withdraw');
const promotionRouter = require('./routes/promotion');
const creditRouter = require('./routes/credit');
const decimalRouter = require('./routes/decimal');
const userTreeRouter = require('./routes/userTree');
const incomeRouter = require('./routes/withdrawIncome');
const tbsRouter = require('./routes/tbs');
const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json(
    {
        limit: '50mb'
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ip
app.use(expressip().getIpInfoMiddleware);

//init passport
app.use(passport.initialize());

app.use('/api', indexRouter);
app.use('/api/member', memberRouter);
app.use('/api/photo', photoRouter);
app.use('/api/deposit', depositRouter);
app.use('/api/withdraw', withdrawRouter);
app.use('/api/promotion', promotionRouter);
app.use('/api/credit', creditRouter);
app.use('/api/decimal', decimalRouter);
app.use('/api/userTree', userTreeRouter);
app.use('/api/income', incomeRouter);
app.use('/api/tbs', tbsRouter);


app.use(errorHandler);



module.exports = app;
