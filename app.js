const express = require("express")
const app = express()

const productRoutes = require("./api/router/products")
const orderRoutes = require("./api/router/orders")

app.use("/products", productRoutes)
app.use("/orders", orderRoutes )

module.exports = app