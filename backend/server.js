import express from 'express'
import { connectDb } from './config/db.js'

import productRoutes from './routes/product.route.js'

const app = express()

app.get('/', (req, res) => {
    res.send("Server is ready.")
})

app.use(express.json())

app.use('/api/products', productRoutes)

app.listen(3000, () => {
    connectDb()
    console.log("Server started.")
})