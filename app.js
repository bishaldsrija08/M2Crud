const express = require("express")
const app = express()



const connectToDatabase = require("./database")
connectToDatabase()

const Library = require("./model/bookModel")

const { storage, multer } = require("./middleware/multerConfig")

const upload = multer({storage:storage})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//create book
app.post("/create", upload.single('blogImage'), async (req, res) => {
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
        publication,
        bookImage
    })
    return res.status(200).json({
        message: "Book created successfully."
    })
})

//get all books
app.get("/books", async (req, res) => {
    const books = await Library.find() //Array
    return res.status(200).json({
        data: books
    })
})

//get single book
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

// edit book
app.patch("/edit/:id", async (req, res) => {
    const { id } = req.params
    const { bookName, bookDescription, bookPrice, authorName, publishedAt, publication } = req.body
    if (!bookName || !bookDescription || !bookPrice || !authorName || !publishedAt || !publication) {
        return res.status(400).json({
            message: "Please provide all the required fields: bookName, bookDescription, bookPrice, authorName, publishedAt, and publication."
        })
    }
    await Library.findByIdAndUpdate(id, {
        bookName,
        bookDescription,
        bookPrice,
        publishedAt,
        authorName,
        publication
    })
    return res.status(200).json({
        message: "Book edited successfully."
    })
})

// delete book

app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    await Library.findByIdAndDelete(id)
    return res.status(200).json({
        message: "Book deleted successfully."
    })
})


app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})