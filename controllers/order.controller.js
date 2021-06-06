
const Order = require("../models/order-model");


const myOrders = async (request, response) => {
    const user = request.user; //user from authorization
    const _id = user._id;
    console.log("userrr", user)
    try {
        const orders = await Order.find({ owner : _id}).populate("owner").populate("product");
        response.status(200).json(orders)
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Something went wrong" })
    }
};


const placeOrder = async (request, response) => {
    console.log("llll");
    const { productId } = request.query;
    const user = request.user;
    const _id = user._id;
    try {
        const order = new Order({ product: productId, owner: { _id } });
        await order.save();
         response.status(201).json({ message: "order placed" })
        console.log(order);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Something Went Wrong" });

    }
}


// const placeOrder = async (request, response, next) => {
//     const { productId } = request.query;
//     const user = request.user;
//     const _id = user._id;
//     try {
//         const order = new Order({ product: productId, owner: { _id } });
//         await order.save();
//         response.json({ message: "congratulations !! Placed order succesfully" });
//     } catch (error) {
//         console.log(error, "error")
//         response.status(500).json("something went wrong in placing order!!");
//     }

// };

// const myOrders = async (request, response,next) => {
//     const user = request.user;
//     const _id = user._id;
//     console.log("id", _id)
//     try {
//         console.log("koo")
//         const orders = await Order.find({ owner: _id })
//             .populate("owner")
//             .populate("product");
//         response.status(201).json(orders);
//     }
//     catch (error) {
//         response.status(500).json({ error: "something went wrong in getting my orders!!" });
//     };
// }



module.exports = {
    placeOrder,
    myOrders
}

// exports.myOrders = myOrders;
