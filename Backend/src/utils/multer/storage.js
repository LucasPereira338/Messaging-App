const path = require('path')
const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    console.log(file.fieldname == 'image')
    const append = file.fieldname == 'portrait' ? 'portrait' : file.fieldname == 'background' ? 'backgrounds' : 'messages'
    const folder = "assets/profiles/" + append;
    cb(null, folder)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname)) 
  }
})

module.exports = storage