const Images = require('../../api/v1/images/model');
const { NotFoundErrors } = require('../../errors');




// Cara pertama
const createImages = async (req) => {
    const result = await Images.create({
        name: req.file
        ? `uploads/${req.file.filename}`
        : `uploads/avatar/default.jpeg`,
    });

    return result
}


// cara ke dua 
// generate url setelah submit baru simpan images
const generateUrlImage = async (req) => {
    const  result = `uploads/${req.file.filename}`;

    return result
}

//tambah function checking image
 const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);

    if(!result) throw new NotFoundErrors(`Tidak ada gambar dengan id : ${id}`)

    return result
}

module.exports = { createImages,  checkingImage}