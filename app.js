const express = require("express")
const app = express()

const connectToDatabase = require("./database")
connectToDatabase()

const Library = require("./model/bookModel")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/create", async (req, res) => {
    const { bookName, bookDescription, bookPrice, authorName, publishedAt, publication } = req.body
    if (!bookName || !bookDescription || !bookPrice || !authorName || !publishedAt || !publication) {
        return res.status(400).json({
            message: "Please provide all the required fields: bookName, bookDescription, bookPrice, authorName, publishedAt, and publication."
        })
    }
    await Library.create({
        bookName,
        bookDescription,
        bookPrice,
        publishedAt,
        authorName,
        publication
    })
    return res.status(200).json({
        message: "Book created successfully."
    })
})


app.get("/books", async (req, res) => {
    const books = await Library.find() //Array
    return res.status(200).json({
        data: books
    })
})

app.get("/book/:id", async (req, res) => {
    const { id } = req.params
    const book = await Library.findById(id) //Object
    if (!book) {
        return res.status(400).json({
            message: "Book not found."
        })
    }
    return res.status(200).json({
        data: book
    })
})











app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})