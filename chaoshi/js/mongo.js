//引入mongodb模块
const mongodb = require('mongodb');
//获取mongo客户端
const MongoClient = mongodb.MongoClient; 
// console.log(MongoClient);

//连接mongodb并(连接数据库supermarket)
MongoClient.connect('mongodb://localhost:27017',(err,database)=>{
    //连接成功后执行这个回调函数
    //如果有错，则抛出这个错误,抛出错误代码会终止
    if(err) throw err;
    //连接数据库，没有就自动创建
    let db = database.db('supermarket');
    // console.log(db);
    // console.log(db.collections());
    // console.log(db.collection('user'));
    let user = db.collection('user');

    let allAges = [18,17,19,29,27,65];
    let allgenders = ['男','女','不详'];
    let data = [];
    for(var i=0;i<5;i++){
        data.push({
            name:`用户${i}`,
            age:allAges[parseInt(Math.random()*allAges.length)],
            gender:allgenders[parseInt(Math.random()*allgenders.length)],
            thetime:Date.now()
        })
    }
    //在user表里面添加数条数据
    user.insertMany(data,(err,result)=>{
        //result:插入数据成功后的返回信息
        //ops 插入的所有数据（带id）
        //insertedCount 插入的数量
        // console.log(result);//总共条数：insertedCount
    })
    //在user表里面删除数据
    //n=1表示删除了一条（删除成功）
    user.deleteOne({name:"用户0"},(err,result)=>{
        console.log(result);
    })
});

