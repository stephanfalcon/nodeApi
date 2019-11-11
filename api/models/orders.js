const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "Product"
    },
    quantity:{
        defualt:1,
        type:Number
    }
})

module.exports = mongoose.model("Order", OrderSchema)