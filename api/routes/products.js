const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {

    res.status(200).json({
        message: "GET method of proiducts"
    })

});
router.post("/", (req, res, next) => {

    res.status(200).json({
        message: "POST method of proiducts"
    })

});

module.exports=router;

