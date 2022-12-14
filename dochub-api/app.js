var createError = require('http-errors');

const cookieSession = require("cookie-session");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
require('./db/connection');

const db = require('./models')

const usersRouter = require('./routes/users');
const sessionRouter = require('./routes/session');
const documentsRouter = require('./routes/documents');
const constraintsRouter = require('./routes/constraints');
const constraintTypesRouter = require('./routes/constraintTypes');
const filesRouter = require('./routes/files');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Enable sessions
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const apiPath = '/api';
app.use(`${apiPath}/users`, usersRouter);
app.use(`${apiPath}/session`, sessionRouter);
app.use(`${apiPath}/documents`, documentsRouter);
app.use(`${apiPath}/constraints`, constraintsRouter);
app.use(`${apiPath}/constraintTypes`, constraintTypesRouter);
app.use(`${apiPath}/files`, filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
