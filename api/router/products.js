const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const mongoose = require("mongoose")


router.get("/",(req,res,next)=>{
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs =>{
            const response = {
                count: docs.length,
                products: docs.map(doc =>{
                    return {
                        name:doc.name,
                        price:doc.price,
                        _id: doc._id,
                        request:{
                            type:"GET",
                            url:`http://localhost:3000/products/${doc._id}`
                        }
                    }
                })

            }
        console.log(response)
        res.status(200).json(response)
    })
})

router.post("/",(req,res,next)=>{

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save()
    .then((result) =>{
        console.log(result)
        res.status(201).json({
        message:'handlin post request to /products',
        createProduct: result
    })
    })
    .catch(err => console.log(err))

    
})

router.get("/:productId", (req,res,next)=>{
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then((result)=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err=> {
        console.log(err)
        result(500)
    })
})

router.patch("/:productId",(req,res,next)=> {
    const id = req.params.productId
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    console.log(updateOps,"poop")

    Product.update({_id:id},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    
})

router.delete("/:productId", (req,res,next)=>{
    const id = req.params.productId
    Product.remove({_id:id})
        .exec()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
})

module.exports = router