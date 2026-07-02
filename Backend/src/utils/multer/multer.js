const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('assets/portraits')) {
  fs.mkdirSync('assets/portraits');
};

if (!fs.existsSync('assets/messages')) {
  fs.mkdirSync('assets/messages');
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname == "portrait" ? "assets/portraits" : "assets/messages";
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

module.exports = upload;