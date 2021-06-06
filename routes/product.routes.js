const express = require ("express");
const router =  express.Router();

const  { getAllProducts, addProduct, updateProduct, deleteProduct } = require("../controllers/product.controller")
const auth = require("../middleware/auth");

router.get('/getAllProducts',getAllProducts);

router.post('/admin/addProduct',auth,addProduct);
router.put('/admin/updateProduct/:id',auth,updateProduct);
router.delete('/admin/deleteProduct/:id',auth,deleteProduct);


module.exports =  router;