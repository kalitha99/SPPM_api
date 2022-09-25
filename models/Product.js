const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },

    price:{
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

    dateOfArrival:{
        type: String,
        required: true,

    },

    addedBy:{
        type: String,
        required: true,

    },
    filePath:{
        type: String,
        required: true,

    },
    category:{
        type: String,
        required: true,

    },
    description:{
        type: Array,


    },
    img:{
        data: Buffer,
        contentType: String,


    },


});

const product = mongoose.model('Product', productSchema);
module.exports = product;