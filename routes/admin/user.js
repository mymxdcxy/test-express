var express = require('express');
var router = express.Router();

var DB = require('../../modules/db');

router.get('/',function (req,res) {
    DB.find('user',{},function (data) {
        res.render('admin/user/index',{
            list:data
        });
    });
});

router.get('/add',function (req,res) {
    res.send('用户增加');
});

router.get('/edit',function (req,res) {
    res.send('用户修改');
});

router.get('/delete',function (req,res) {
    res.send('用户删除');
});

module.exports = router;