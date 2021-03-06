const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ 
    userName: { type: String , maxlength: 255},
    email: { type: String, maxlength: 255},
    password: { type: String , maxlength: 255}
})

module.exports = mongoose.model('User', userSchema, 'DUMMYUSERS')