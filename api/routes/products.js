const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get("/", (req, res, next) => {
    const products = Product.find().exec().then(docs => {
        res.status(200).json({
            message: "Successfully got data",
            products: docs
        }).catch(error => {
            console.log(error);

        })

    });



});
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const product = Product.findById(id).exec().then(

        doc => {
            // console.log(doc)
            if (doc) {
                res.status(200).json({
                    product: doc
                })
            }
            else {
                res.status(404).json({
                    message: 'No valid entry found for requested entry'
                })
            }

        }
    ).catch(error => {
        res.status(500).json({
            message: `somthing went wrong.`,
            error: error
        })

    });



});
router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })


    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "product created successfully.",
            createdProduct: product
        })

    }

    ).catch(
        error => {
            console.log(error)
        }
    );


});
router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updateProp = {};
    for (const opt of req.body) {
        updateProp[opt.propName] = opt.value;

    }
    Product.update({ _id: id }, { $set: updateProp }).exec().then(
        result => {
            res.status(200).json({
                message: `Product updated successffully`

            })

        }
    ).catch(error => {
        res.status(500).json({
            message: 'somthing wnt srong',
            error: error
        })
    }

    );


});
router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec().then(
        result => {
            res.status(200).json({
                message: "item delete succffully",
            });
        }
    ).catch(

        res.status(404).json({
            message: "no record found ",

        })

    );


});

module.exports = router;

