const mongoose = require('mongoose');

const CommonSignupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        
    },

    name1:{
        type: String,
        required: true,
        
    },

    birthday:{
        type: Date,
        required: true,
        
    },

    gender:{
        type: String,
        required: true,
        
    },

    address:{
        type: String,
        required: true,
        
    },

    email:{
        type: String,
        required: true,
        
    },
    number:{
        type: Number,
        required: true,
        maxLength: 10
    },

    inputpw:{
        type: String,
        required: true,
        
    },
    address:{
        type: String,
    },

    role:{
        type: String,
        
    },
    cartItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart'
        }
    ]
        
});

const CommonSignup = mongoose.model('commonSignup', CommonSignupSchema);
module.exports = CommonSignup;