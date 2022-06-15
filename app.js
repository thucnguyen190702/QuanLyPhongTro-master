var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var khachhangRouter = require('./routes/khachhang');
var dichvuRouter = require('./routes/dichvu');
var loaiphongRouter = require('./routes/loaiphong');
var phongRouter = require('./routes/phong');
var thuephongRouter = require('./routes/thuephong');
var diennuocRouter = require('./routes/diennuoc');
var apiUserRouter = require('./routes/user.api');
var apiPhongRouter = require('./routes/phong.api');
var adminRouter = require('./routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json( {limit:'50mb'} ));
app.use(express.urlencoded({ extended: false , limit: '50mb'}));

app.use(session({
  secret: 'fksdfn24235bdInfsdHSNF3414',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/khachhang', khachhangRouter);
app.use('/dichvu', dichvuRouter);
app.use('/loaiphong', loaiphongRouter);
app.use('/phong', phongRouter);
app.use('/thuephong', thuephongRouter);
app.use('/diennuoc', diennuocRouter);
app.use('/apiUser', apiUserRouter);
app.use('/apiPhong', apiPhongRouter);
app.use('/admin', adminRouter);
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
