const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name:{
        type : String,
        required  : true,
    },
    account: {
        type: Number,
        required : true,
    },
    bank:{
        type: String,
        required : true,
    },
    branch:{
        type: String,
        required : true,
    },
    amount: {
        type: Number,
        required : true,
    }
});

const Transactions = mongoose.model('Transactions', transactionSchema);
module.exports = Transactions;
