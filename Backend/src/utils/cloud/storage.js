const cloudinary = require("../../config/cloudinary/cloudinary.js");
const fs = require('fs')

const uploadMsgImg = async (req, res) => {
  const localFilePath = req.file.path;
  const folderName = 'assets/messages'
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image',
      folder: folderName
    });
    
    fs.unlinkSync(req.file.path); 
    req.url = result.secure_url
  } catch (err) {
    fs.unlinkSync(req.file.path); 
    throw new Error('Cloudinary upload failed: ' + err.message);
  }
  
  next()
}

const uploadProfileImg = async (req, res, next) => {
  const localFilePath = req.file.path;
  const folderName = 'assets/portraits'
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'image',
      folder: folderName
    });
    
    fs.unlinkSync(req.file.path); 
    req.url = result.secure_url
  } catch (err) {
    fs.unlinkSync(req.file.path); 
    throw new Error('Cloudinary upload failed: ' + err.message);
  }
  
  next()
 
}

module.exports= {
    uploadMsgImg, 
    uploadProfileImg
}