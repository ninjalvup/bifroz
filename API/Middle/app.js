const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const cors = require('cors');

const indexRouter = require('./routes/index');
const betflixRouter = require('./routes/betflix');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', betflixRouter);

app.use(errorHandler);

module.exports = app;
