
require('dotenv').config();
// const path = require('');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

// const userRoutes = require("./routes/user.routes");

// console.log( "urlll",process.env.MONGODBURI);
// const port = 7000;
const port = process.env.PORT;

// database connection
//process.env.MONGODBURI
//mongodb+srv://Shrutiagrawal807:Shruti@1800@cluster0.vtocg.mongodb.net/Jewellary?retryWrites=true&w=majority
const connect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODBURI,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log("connected")
    } catch (error) {
        console.log("some error occured")
        console.log("error", error)
    }
}
connect()

app.listen(port, () => {
    console.log(`server is up on port  ${port}`);
})





app.use(cors());
app.use(bodyParser.json());

const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const wishlistRoutes = require("./routes/wishlist.routes");

app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);
