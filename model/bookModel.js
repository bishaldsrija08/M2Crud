const mongoose = require("mongoose")

const librarySchema = new mongoose.Schema({
    bookName: {
        type: String
    },
    bookDescription: {
        type: String
    },
    bookPrice: {
        type: Number
    },
    authorName: {
        type: String
    },
    publishedAt: {
        type: String
    },
    publication: {
        type: String
    }
})


const Library = mongoose.model("Library", librarySchema)
module.exports = Library