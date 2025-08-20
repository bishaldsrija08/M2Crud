const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isAllowed = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"]
        if(!isAllowed.includes(file.mimetype)){
            return cb(new Error("File type not allowed"))
        }
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})

module.exports = {
    multer,
    storage
}