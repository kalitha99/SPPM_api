const CommonSignup = require("../Models/CommonSignup");
const cartItem = require("../models/Cart")
require("dotenv").config();

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

let enteredOn = date + '/' + month + '/' + year

const addToCart = async (req, res) => {

    try {
        console.log("add to cart")
        const data = {
            u_name: req.body.email,
            prod_name: req.body.name,
            sellingPrice: req.body.sellingPrice,
            quantity: req.body.quantity,
            filePath: req.body.filePath,
            entered_on: enteredOn,
            address:req.body.address,
            type:'cart'
        }

        return cartItem.create(data).then(cartItm => {
            console.log("\n>> Item added:\n", cartItm);

            return CommonSignup.findOneAndUpdate({email: req.body.email},
                {$push: {cartItems: cartItm._id}},
                {new: true, useFindAndModify: false}
            ).then(res.json({status: 'ok', msg: "Added to cart"}))

        })

    } catch (err) {
        console.log(err)
        res.status(400).json({msg: 'entered one or more wrong details'});
    }

}

const getCartItems = async (req, res) => {

    console.log("get cart items")
    try {

        const item = await cartItem.find({
            $and: [
                {u_name:  req.body.email},
                {type:  req.body.type},
            ]
        }   )
        return res.json({status: 'ok', cart: item})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const getOrderItems = async (req, res) => {

    console.log("get cart items")
    try {

        const item = await cartItem.find({type:  "order"}).sort({ _id: -1 });
        return res.json({status: 'ok', cart: item})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const createOrderItems = async (req, res) => {

    console.log("get order items")
    try {

        const item = await cartItem.updateMany({email: req.body.email, type:req.body.type},
            {$set: {type:'order',entered_on:enteredOn,status:'processing'}})

        return res.json({status: 'ok', msg: "order success"})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}

const updateStatus = async (req, res) => {

    console.log("update order status")
    try {

        const item = await cartItem.updateMany({_id: req.body.id},
            {$set: {status:req.body.status,editedon:enteredOn}})

        return res.json({status: 'ok', msg:'status edited'})

    } catch (error) {
        console.log(error)
        res.sendStatus(403);
        res.json({status: 'error', error: 'invalid token'})
    }
}
const deleteCartItems = async (req, res) => {

    const items = await cartItem.findByIdAndDelete(req.body.id)

    if (items) {
        console.log("deleted")
        return CommonSignup.findOneAndUpdate({email: req.body.email},
            {$pull: {cartItems: items._id}}
        ).then(res.json({status: 'ok', msg: " Removed from cart"}))


    } else {
        console.log(err);
        res.json({status: 'ok', msg: err})
    }


}


module.exports = {addToCart, getCartItems, deleteCartItems, createOrderItems,updateStatus,getOrderItems}