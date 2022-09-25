const product = require("../models/Product");
const fs = require("fs")

const createProduct = async (req, res) => {
    try {

        const Product = new product({
            name: req.body.name,
            price: req.body.price,
            sellingPrice: req.body.sellingPrice,
            quantity: req.body.quantity,
            dateOfArrival: req.body.dateOfArrival,
            addedBy: req.body.addedBy,
            filePath: req.file.path,
            category: req.body.category,
            description: req.body.description.split(','),
            img: {
                data: fs.readFileSync("public/"+req.file.filename),
                contentType:"image/png"
            },

        });
        const savedProduct = await Product.save();
        if (savedProduct) {
            res.status(201).send({msg: "success", data: savedProduct});
        } else {
            res.status(400).send({msg: "failed", data: savedProduct});
        }
        console.log("result , ", savedProduct);
    } catch (err) {
        console.log("error in product ", err);
        res.status(500).send({msg: "failed", data: err});
    }
};

const getProducts = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("getProducts")
    try {

        const Products = await product.find().limit(4)
        return res.json({status: 'ok', Products: Products})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const deleteProducts = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("delete Products")
    try {

        const Products = await product.findByIdAndDelete(req.body.id)
        return res.json({status: 'ok', Products: Products, msg : "Product deleted"})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const updateQuantity = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("update Products quantity")
    try {
        const Product = await product.findByIdAndUpdate({_id: req.body.id})
        const Products = await product.findByIdAndUpdate({_id: req.body.id},
            {$set: {quantity:parseInt(Product.quantity)-1}})
        return res.json({status: 'ok'})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', msg:'invalid token', error: 'invalid token'})
    }
}

const searchProducts = async (req, res) => {
    const token = req.headers['x-access-token']
    console.log(token)
    console.log("getProducts")
    var Products ;
    try {
        console.log(req.body)
        var vehicles;
        if (req.body.category == "" && req.body.id == "") {
            console.log("if")
             Products = await product.find()
        }else if (req.body.id == "" ){
            console.log("else")
             Products = await product.find({
                    category: req.body?.category
            })
        }else if (req.body.category == ""){
            console.log("else if ")
            Products = await product.find({
                _id: req.body?.id
            })

            console.log(Products)
        }
        Products.description=Products?.description?.split(',');
        return res.json({status: 'ok', Products: Products})
    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

module.exports = {createProduct,getProducts,searchProducts,deleteProducts, updateQuantity};