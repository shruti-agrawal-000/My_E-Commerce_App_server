const Wishlist = require("../models/wishlist -model");

const addToWishlist = async(request,response) =>{
    console.log("rrrr");
    const {productId} = request.query;
    const user = request.user;  //accessing user from authorization
    const _id = user._id;
           try {
               const wishlist = new Wishlist({product: productId, owner:{ _id }});
               await wishlist.save();
               response.status(201).json(wishlist);
               console.log(wishlist);
           } catch (error) {
               console.log("error:",error);
           }
};

const myWishlist = async(request,response) =>{
    const user = request.user;
    const _id = user._id;
    try {
        const wishlists = await Wishlist.find({ owner : _id}).populate("owner").populate("product");
        response.status(200).json(wishlists)
    } catch (error) {
        console.log("error",error);
        response.status(500).json({error:"Something went wrong"})
    }

};


module.exports={
    myWishlist,
    addToWishlist
}