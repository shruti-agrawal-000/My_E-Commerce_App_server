const mongoose=require("mongoose");
const {Schema} = mongoose;

const orderSchema = new Schema(
    {
        product:{
            type: String,
            ref:"Product",
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {timestamps:true},
);

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;