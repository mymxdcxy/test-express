var express = require('express');
var md5 = require('md5');
var DB = require('../../modules/db');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));




router.get('/',function (req,res) {
    res.render('admin/login/login');
})

router.post('/DoLogin',function (req,res) {
    var username = req.body.username;
    var password = md5(req.body.password);

    DB.find('user',{
        username:username,
        password:password
    },function (data) {
        if (data.length > 0){
            //保存用户信息
            req.session.userinfo = data[0];

            //登录成功
            res.redirect('/admin/product');

        }else {
            //登陆失败
            res.send("<script>alert('登录失败');location.href = '/admin/login';</script>");
        }
    });
});


router.get('/logout', function(req, res) {
    //销毁seeion
    req.session.destroy(function (err) {
        if (err){
            console.log(err);
        }else {
            res.redirect('/admin/login');
        }
    });
});


module.exports = router;
