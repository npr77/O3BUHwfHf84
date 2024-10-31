import express from 'express'
import { connectDb } from './config/db.js'

const app = express()

app.get('/', (req, res) => {
    res.send("Server is ready.")
})

app.post('/products', async (req, res) => {

    const product = req.body

    if (!product.name || !product.price || !product.image) { // if any of the fields are missing
        return res.status(400).json({ success: false, message: "All fields are required." })
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({ success: true, message: "Product created.", data: newProduct })
    } catch (error) {
        console.error("Product not created: ", error.message)
        res.status(500).json({ success: false, message: "Product not created.", error: error.message })
    }
})

app.listen(3000, () => {
    connectDb()
    console.log("Server started.")
})