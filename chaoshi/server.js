//引入模块
const express = require('express');
const mongodb = require('mongodb');

//获取mongo客户端
const MongoClient = mongodb.MongoClient;

let app = express();

//静态资源服务器
app.use(express.static('./'));

//路由
//注册
app.get('/reg',(req,res)=>{

})

//登录
app.get('/login',(req,res)=>{

})

//检测用户名
app.get('/checkname',(req,res)=>{
    //获取传来的用户名
    let {username} = req.query;
    //连接数据库
    MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
        //连接成功后执行回调函数
        //如果有错误就抛出错误
        if(err) throw err;

        //使用某个数据库，没有就自动创建一个
        let db = database.db('supermarket');

        //使用数据库里面的集合（表）
        let user = db.collection('user');

        //查询是否存在数据
        user.findOne({name:username},(err,result)=>{
            if(err) throw err;
            // console.log(result);//若存在，则出现信息，如不存在则出现null
            if( result ){
                //已有用户名，不可注册
                res.send({
                    code:0,
                    data:[],
                    msg:'该邮箱已被注册'
                })
            }else{
                //可以注册
                res.send({
                    code:1,
                    data:[],
                    msg:'该邮箱可被注册'
                })
            }
        })
        //关闭数据库,避免资源浪费
        database.close();
    })

})

//监听端口
app.listen(1717,()=>{
    console.log('成功运行，http://localhost:1717')
})