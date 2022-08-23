const express = require('express');
const router = express.Router();
const ProductControllers = require('./../controllers/ProductController')
const verifyJWT =require('../verifyJWT')
const verifyRoles =require('../verifyRoles')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
        console.log(file)
    }

})
const upload = multer({storage:storage})


router.post('/addProduct', upload.single("image"), ProductControllers.createProduct);
router.post('/getProducts' , ProductControllers.getProducts);
router.post('/deleteProducts' , ProductControllers.deleteProducts);
router.post('/searchProducts' , ProductControllers.searchProducts);
router.post('/updateQuantity' , ProductControllers.updateQuantity);


module.exports = router;