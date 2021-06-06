const mongoose=require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            
        },
        price:{
            type:Number,
            required:true,
        },
        desc:{
            type:String,
        },
    },
    {timeStamps:true},
);

const Product = mongoose.model("Product",productSchema);
module.exports = Product;