const express = require("express")
const app = express()

const connectToDatabase = require("./database")
connectToDatabase()

const Library = require("./model/bookModel")

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.post("/create", async (req, res) => {
    const { bookName, bookDescription, bookPrice, authorName, publishedAt } = req.body
    await Library.create({
        bookName,
        bookDescription,
        bookPrice,
        publishedAt,
        authorName
    })
    return res.status(200).json({
        message: "Book created successfully."
    })
})












app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})