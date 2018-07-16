const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get("/", (req, res, next) => {
    const products = Product.find().exec().then(docs=>{
        res.status(200).json({
            message: "Successfully got data",
            products: docs
        }).catch(error=>{
            console.log(error);
            
        })

    });

   

});
router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const product = Product.findById(id).exec().then(

        doc => { console.log(doc)
        
            res.status(200).json({
                message: `GET method with ${id}.`,
                product:doc
            })
        
        }
    );

 

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
    res.status(200).json({
        message: `PATCH method with ${id}.`
    })

});

module.exports = router;

