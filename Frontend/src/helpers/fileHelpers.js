export const getImageFile= (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
        return selectedFile
    } else {
        return null
    }
};