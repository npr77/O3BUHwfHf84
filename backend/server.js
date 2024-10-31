import express from 'express'

const app = express()

console.log(process.env.MONGO_URI)

app.get('/', (req, res) => {
    res.send("Server is ready.")
})

app.listen(3000, () => {
    console.log("Server started.")
})