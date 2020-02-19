const express = require('express')
const fs = require('fs')
const path = require('path')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', (req, res) => {
    res.render('./index.html', {
        user: req.session.user
    })
})

router.get('/login', (req, res) => {
    res.render('./login.html')
})

router.post('/login', (req, res) => {
    console.log(req.body);
    User.findOne({
        email: req.body.email,
        password: md5(md5(req.body.password))
    }, (err, user) => {
        if (err) return res.status(500).json({
            message: err.message,
            err_code: 500
        })
        if (!user) return res.status(200).json({
            err_code: 1,
            message: '错误的邮箱或密码'
        })

        //用户存在登录成功
        req.session.user = user
        return res.json({
            err_code: 0,
            msg: '用户创建成功'
        })
    })

})

router.get('/register', (req, res) => {
    res.render('./register.html')
})

router.post('/register', (req, res) => {
    User.find({
        $or: [
            { email: req.body.email },
            { nickname: req.body.nickname }
        ]
    }, (err, data) => {
        console.log(data.length);
        if (err) {
            console.log('数据库查找失败');
            return res.status(500).json({
                err_code: 500,
                msg: '数据库查找失败'
            })
        }
        if (data != 0) {
            console.log('用户已存在');
            return res.status(200).json({
                err_code: 1,
                msg: '用户已存在'
            })
        }
        //对密码进行md5加密
        req.body.password = md5(md5(req.body.password))
        var user = new User(req.body)
        user.save((err, ret) => {
            if (err) return res.status(500).json({
                err_code: 500,
                msg: '数据库存储错误'
            })
            //注册成功,记录session状态
            req.session.user = user
            return res.json({
                err_code: 0,
                msg: '用户创建成功'
            })
        })

    })

})

router.get('/logout',(req,res)=>{
    req.session.user=null;
    res.redirect('/')
})
module.exports = router