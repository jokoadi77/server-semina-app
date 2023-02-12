const Images = require('../../api/v1/images/model')



// Cara pertama
createImages = async (req) => {
    const result = await Images.create({
        name: req.file
        ? `uploads/${req.file.filename}`
        : `uploads/avatar/default.jpeg`,
    });

    return result
}


// cara ke dua 
// generate url setelah submit baru simpan images
generateUrlImage = async (req) => {
    const  result = `uploads/${req.file.filename}`;

    return result
}

module.exports = { createImages, generateUrlImage}