//引包区
var fs = require("fs")
var path=require('path')
const express = require('express')
var router=require('./router') 
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var session=require('express-session')
//变量常量区
const app = express()
const port = 5000
//公开目录区
app.use('/public', express.static(path.join(__dirname,'./public')))
app.use('/node_modules', express.static(path.join(__dirname,'./node_modules')))

//配置区
//art-template
app.engine('html', require('express-art-template'))
//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//mongoDB
mongoose.connect('mongodb://localhost/db3',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err) return console.log('connection ERR:'+err);
    return console.log('connection success');
});
//express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))


//------------------
  
app.use(router)
//服务区
app.listen(port, () => console.log(`Example app listening on port port!`))



