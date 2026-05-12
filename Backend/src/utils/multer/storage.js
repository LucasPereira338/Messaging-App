const path = require('path')
const multer = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/profiles/" + 
      req.body.portrait ? "portraits" : req.body.background ? "backgrounds" : req.body.image ? "messages" : "")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})

module.exports = storage