const express = require ("express")
const router = express.Router();

const { placeOrder,myOrders} = require("../controllers/order.controller");
// const orderController = require("../controllers/order.controller")
const auth = require('../middleware/auth');

router.post('/placeOrder',auth,placeOrder);
router.get('/myOrders',auth,myOrders);

// router.get('/myOrders',auth,orderController.myOrders);

module.exports= router;