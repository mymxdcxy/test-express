/*
* 应用入口文件
* */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');



var app = express();

//设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//配置
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));


//配置中间件，保存用户信息
app.use(session({
    secret: 'keyboard cat', //用来注册session id 到cookie中，相当与一个密钥。
    resave: false,  //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
    saveUninitialized: false, //是否设置session在存储容器中可以给修改
    cookie: {
        maxAge:1000*60*30 //session过期时间
    },
    rolling:true  //是否按照原设定的maxAge值重设session同步到cookie中，要保证session有操作的时候必须设置这个属性为true,同时需要saveUninitialized设置为false
}));  


//路由
app.use('/',require('./routes/index'));
app.use('/admin',require('./routes/admin'));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
