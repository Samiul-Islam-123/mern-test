const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        unique : true,
        type : String,
    },
    password : {
        required : true,
        type  : String,
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
})

const UserModel = new mongoose.model('user', UserSchema);

module.exports = UserModel;