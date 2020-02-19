const mongoose = require('mongoose');

var Schema = mongoose.Schema
var userSchema = new Schema({
    email: { type: String, required: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    created_time: { type: Date, default: Date.now },//这里不要直接写 Date.now() 如果写了,模块执行时就会写死
    last_modified_time: { type: Date, default: Date.now },
    avatar: { type: String, default: '/public/img/avatar-default.png' },
    bio: { type: String, default: '' },
    gender: { type: Number, enum: [0, 1, -1], default: -1 },
    birthday: { type: Date },
    status: {
        type: Number, enum: [0,//正常用户
            1,//不可评论
            2,//不可登录
        ]
    },
})

module.exports = mongoose.model('User', userSchema)