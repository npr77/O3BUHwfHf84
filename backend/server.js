import express from 'express'
import { connectDb } from './config/db.js'

import productRoutes from './routes/product.route.js'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send("Server is ready.")
})

app.use(express.json())

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
    connectDb()
    console.log("Server started at http://localhost:" + PORT + "/")
})