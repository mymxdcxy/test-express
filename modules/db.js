var MongoClient = require('mongodb').MongoClient;
var DBurl = 'mongodb://localhost:27017/productmanage';
var ObjectID = require('mongodb').ObjectID;

function _connectDB(callback) {
    MongoClient.connect(DBurl,function (err,db) {
        if (err){
            console.log('数据库连接失败' + err);
            return;
        }

        //连接成功
        callback(db);
    });
};

//暴露objectId
exports.ObjectID = ObjectID;

//查询数据方法
exports.find = function (collectionname,json,callback) {
    _connectDB(function (db) {
       var result = db.collection(collectionname).find(json);
       result.toArray(function (mongoError,data) {
           if (mongoError){
               console.log('查询数据失败' + mongoError);
               return;
           }
           callback(data);
           db.close();
       });
    });
};

//增加数据方法
exports.insert = function (collectionname,json,callback) {
    _connectDB(function (db) {
        db.collection(collectionname).insertOne(json,function (mongoError,data) {
            if (mongoError){
                console.log('增加数据失败' + mongoError);
                return;
            }
            callback(data);
            db.close();
        });
    });
};

//修改数据方法
exports.updata = function (collectionname,json1,json2,callback) {
    _connectDB(function (db) {
        db.collection(collectionname).updateOne(json1,{$set:json2},function (mongoError,data) {
            if (mongoError){
                console.log('修改数据失败' + mongoError);
                return;
            }
            callback(data);
            db.close();
        })
    });
};

//删除数据
exports.deleteOne = function (collectionname,json,callback) {
    _connectDB(function (db) {
        db.collection(collectionname).deleteOne(json,function (mongoError,data) {
            if (mongoError){
                console.log('删除数据失败' + mongoError);
                return;
            }
            callback(data);
            db.close();
        })
    });
};