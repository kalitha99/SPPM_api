const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    u_name:{
        type: String,
        required: true,

    },
    prod_name:{
        type: String,
        required: true,

    },
    address:{
        type: String,
        required: true,

    },


    sellingPrice:{
        type: String,
        required: true,

    },

    quantity:{
        type: String,
        required: true,

    },

    filePath:{
        type: String,
        required: true,

    },
    entered_on:{
        type: String,
        required: true,

    },
    type:{
        type: String,
        required: true,

    },
    status:{
        type: String,


    },
    editedon:{
        type: String,


    },



});

const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;