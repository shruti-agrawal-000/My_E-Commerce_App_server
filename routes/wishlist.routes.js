const express = require ("express")
const router = express.Router();

const { myWishlist,addToWishlist} = require("../controllers/wishlist.controller");
const auth = require("../middleware/auth");

router.post('/addToWishlist',auth,addToWishlist);
router.get('/myWishlist',auth,myWishlist)

module.exports = router;