    const express = require("express");
    const router = express.Router();

    router.get("/", (req, res, next) => {

        res.status(200).json({
            message: "GET method of Ordedrs"
        })

    });
    router.get("/:orderId", (req, res, next) => {
        const id = req.params.orderId;
        res.status(200).json({
            message: `GET method with ${id}. orders`
        })

    });
    router.post("/", (req, res, next) => {
        const order = {
            productId: req.body.productId,
            quantity: req.body.quantity
        }

        res.status(201).json({
            message: "Oder Placed succefully",
            order: order
        })

    });
    router.patch("/:orderId", (req, res, next) => {
        const id = req.params.orderId;
        res.status(200).json({
            message: `PATCH method with ${id}. Orders`
        })

    });

    module.exports = router;

