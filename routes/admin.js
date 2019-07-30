var express = require('express');
var router = express.Router();

//判断用户是否登录
router.use(function (req,res,next) {
    if (req.url == '/login' || req.url == '/login/DoLogin'){
        next();
    }else {
        if (req.session.userinfo && req.session.userinfo.username!=''){
            //使用ejs模板，设置通用数据
            req.app.locals['userinfo'] = req.session.userinfo;
            next();
        }else {
            res.redirect('/admin/login');
        }
    }
});



router.use('/login',require('./admin/login'));
router.use('/product',require('./admin/product'));
router.use('/user',require('./admin/user'));



module.exports = router;
