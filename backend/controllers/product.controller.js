import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.error("Error fetching products: ", error.message)
        res.status(500).json({ success: false, message: error.message })
    }
}

export const createProduct = async (req, res) => {

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
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id." })
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true })
        res.status(200).json({ success: true, message: "Product updated.", data: updatedProduct })
    } catch (error) {
        console.error("Product not updated: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id." })
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted." })
    } catch (error) {
        console.error("Product not de leted: ", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }

}