var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var fs = require('fs');
var DB = require('../../modules/db');



router.get('/',function (req,res) {
    DB.find('product',{},function (data) {
        res.render('admin/product/index',{
            list:data
        });
    });
 });

router.get('/add',function (req,res) {
    res.render('admin/product/add');
});

router.post('/DoAdd',function (req,res) {
    var form = new multiparty.Form();
    form.uploadDir = '../upload';
    form.parse(req, function(err, fields, files) {
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var pic = files.pic[0].path.slice(10);
        DB.insert('product',{
            title:title,
            price:price,
            fee:fee,
            description:description,
            pic:pic
        },function (data) {
            res.redirect('/admin/product');
        });

    });
});

router.get('/edit',function (req,res) {
    //获取get传值 id
    var id = req.query.id;

    //去数据库查询这个id对应的数据
    DB.find('product',{'_id':new DB.ObjectID(id)},function (data) {
        res.render('admin/product/edit',{
            list:data
        });
    });
});

router.post('/DoEdit',function (req,res) {

    var form = new multiparty.Form();
    form.uploadDir = "../upload";
    console.log(form.uploadDir);
    form.parse(req, function(err, fields, files) {
        var id = fields._id[0];
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
        var pic = files.pic[0].path.slice(10);
        var originalFilename = files.pic[0].originalFilename;
        var setData;

        if (originalFilename){
            setData = {     //修改了图片
                title:title,
                price:price,
                fee:fee,
                description:description,
                pic:pic
            }
        }else {
            setData = {  //没有修改图片
                title:title,
                price:price,
                fee:fee,
                description:description
            }

            //删除临时生成的文件
            fs.unlink(form.uploadDir+'/'+pic);
        }

        DB.updata('product',{'_id':new DB.ObjectID(id)},setData,function () {
            res.redirect('/admin/product');
        })

    });
});


router.get('/delete',function (req,res) {
    //获取id
    var id = req.query.id;
    DB.deleteOne('product',{'_id':new DB.ObjectID(id)},function () {
        res.redirect('/admin/product');
    });
});

module.exports = router;