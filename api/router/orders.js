const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Order = require("../models/orders")

router.get("/",(req,res,next)=>{
    Order.find()
    .exec()
    .then(docs=>{
        console.log(docs)
        res.status(200).json({docs})
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
router.post("/",(req,res,next)=>{

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    })
    order.save()
    .then(result=>{
        console.log(result)
        res.status(201).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(
            {error:err}
        )
    }
    )
    // const order = {
    //     productId:req.body.productId,
    //     quantity:req.body.quantity
    // }
})

router.delete("/:orderId",(req,res,next)=>{
    Order.deleteOne({_id:req.params.orderId})
    .exec()
    .then(
        res.status(200).json({
            message:`order ${req.params.orderId} has been deleted`
        })
    )
    .catch(err =>{
        res.status(500).json({
            error:error
        })
    })
})

router.delete("/all",(req,res,next)=>{
    Order.deleteMany().exec()
    Order.find()
    .exec()
    .then(docs=>{
        console.log(docs)
        res.status(200).json(
            {docs}
        )
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})
    

router.get("/:orderId",(req,res,next)=>{
    res.status(200).json({
        message:'order details',
        orderId: req.params.orderId
    })
})

module.exports = router