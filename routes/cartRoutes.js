const express = require('express');
const router = express.Router();
const verifyJWT =require('../verifyJWT')
const verifyRoles =require('../verifyRoles')
cartController = require('./../controllers/CartController')


router.post('/addToCart' , cartController.addToCart);
router.post('/getCart' , cartController.getCartItems);
router.post('/createOrderItems' , cartController.createOrderItems);
router.post('/updateStatus' , cartController.updateStatus);
router.post('/getOrderItems' , cartController.getOrderItems);
router.post('/deleteItem' , cartController.deleteCartItems);

module.exports = router;