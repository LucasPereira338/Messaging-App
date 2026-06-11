const path = require('path')
const fs = require('fs');

const basePath = "assets/";

async function deleteImage(img) {
    const imgPath = path.join(basePath, img)
    fs.unlink(imgPath, (err) => {
        if (err) {
            console.error('Failed to delete image', err);
        }
    })
}

module.exports = {
    deleteImage
}