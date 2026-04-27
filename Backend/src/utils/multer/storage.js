const path = require('path')
const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/profiles/portraits")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

module.exports = storage