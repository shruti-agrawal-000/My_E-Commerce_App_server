const mongoose=require("mongoose");
const {Schema} = mongoose;

const wishlistSchema = new Schema(
    {
        product:{
            type:String,
            ref:"Product",
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        },

    },
    {timestamps : true },
);

const Wishlist = mongoose.model("Wishlist",wishlistSchema);
module.exports = Wishlist;