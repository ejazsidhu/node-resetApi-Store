const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {

    res.status(200).json({
        message: "GET method of proiducts"
    })

});
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: `GET method with ${id}.`
    })

});
router.post("/", (req, res, next) => {

    const product = {
        name:req.body.name,
        price:req.body.price

    }

    res.status(201).json({
        message: "product created successfully.",
        createdProduct: product
    })

});
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    res.status(200).json({
        message: `PATCH method with ${id}.`
    })

});

module.exports = router;

