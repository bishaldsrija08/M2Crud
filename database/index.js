const mongoose = require('mongoose')


async function connectToDatabase() {
    try {
        const connectionString = "mongodb+srv://merndemo:merndemo@cluster0.02kiapt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect(connectionString)
        console.log("Databae connected successfully!")
    } catch (error) {
        console.log("Database connection failed:", error)
    }
}

module.exports = connectToDatabase