const mongoose = require('mongoose');

const {Schema} = mongoose;
var date = new Date();
var defaultDate = (date.toString()).substr(0,25);
// console.log(defaultDate);

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    phn:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        default:defaultDate,
    },
    password:{
        type: String,
        required: true
    },
    balance:{
        type : Number,
        default: 0,
    }

});

const User = mongoose.model('User',UserSchema);
module.exports = User;