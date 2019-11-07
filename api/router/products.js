const express = require("express")
const router = express.Router()

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:'handlin get request to /products'
    })
})

router.post("/",(req,res,next)=>{
    res.status(201).json({
        message:'handlin post request to /products'
    })
})

router.get("/:productId", (req,res,next)=>{
    const id = req.params.productId;
    if(id==="special"){
        res.status(200).json({
            message: "you discovered the special id"
        })
    }else{
        res.status(200).json({
            message: "you passes an id"
        })
    }
})

module.exports = router