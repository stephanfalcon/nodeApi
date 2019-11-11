const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const productRoutes = require("./api/router/products")
const orderRoutes = require("./api/router/orders")

mongoose.connect(`mongodb+srv://stephan:fzymx2525@node-api-hk3o8.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true})
// mongoose.connect(`mongodb+srv://stephan:fzymx2525@node-api-hk3o8.mongodb.net/test?retryWrites=true&w=majority`)

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin","*"),
//     res.header("Access-Control-Allow-Headers",
//     "*")
//     if (req.method === "OPTIONS"){
//         res.header("Access-Control-Allow-Methods","*")
//         return res.status(200).json({})
//     }
// })

app.use("/products", productRoutes)
app.use("/orders", orderRoutes )


app.use((req,res,next)=>{
    const error = new Error("no valid routes")
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app