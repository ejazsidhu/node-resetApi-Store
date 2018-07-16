const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

mongoose.connect('mongodb://admin:admin@ejaz-nodejs-shard-00-00-fqnha.mongodb.net:27017,ejaz-nodejs-shard-00-01-fqnha.mongodb.net:27017,ejaz-nodejs-shard-00-02-fqnha.mongodb.net:27017/test?ssl=true&replicaSet=Ejaz-NodeJS-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true

});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Auth-token,X-Request-with,Content-Type,Accept,Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Headers", "POST,PUT,PATCH,DELETE,GET");
        return res.status(200).json();
    }
    next();
});
app.use("/products", productRoutes);
app.use("/orders", ordersRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {

    res.status(error.status || 500);

    res.json({
        error: {
            message: error.message,
            status: error.status
        }
    });

});


module.exports = app;