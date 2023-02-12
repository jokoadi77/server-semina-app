const categories = require('../../api/v1/categories/model');
const { BadRequestErrors, NotFoundErrors } = require('../../errors');

const getAllCategories = async () => {
    const result = await categories.find();

    return result
}

const createCategories = async (req) => {
    const { name } = req.body

    //cari categories dengan field name
    const check = await categories.findOne({ name })
    //apabila check true / data categories sudah ada maka tampilkan error bad request
    if (check ) throw new BadRequestErrors('categoori nama duplikat')

    const result = await categories.create({ name })
    

    return result
}
const geteOneCategories = async (req) => {
    const { id } = req.params

        const result = await categories.findOne({ _id: id});
       
        if (!result) throw new NotFoundErrors(`Tidak ada kategori dengan id : ${id}`)

        return result

}

const updateCategories = async (req) => {
    const { id } = req.params
    const { name } = req.body

    //cari categories dengan field nama dan id selain dari yang dikirim dari params
    const check = await categories.findOne({
        name,
        _id : { $ne: id},
    })

    // ap bila check true / data categories sudah ada maka tampilkan error bad request
    if (check) throw new BadRequestErrors('Kategori nama duplikat')

    const result = await categories.findByIdAndUpdate(
        {_id: id},
        { name },
        { new : true, runValidators: true}
    )
    // jika id result false / null maka menampilkan error 
    if (!result) throw new NotFoundErrors(`Tidak ada kategori dengan id ${id}`)

    return result
};

const deleteCategories = async (req) => {
    const { id } = req.params

    const result = await categories.findOne({
        _id: id,
    })

    if (!result) throw new NotFoundErrors(`Tidak ada kategri dengan id ${id}`)

    await result.remove();

    return result
}

const checkingCategories = async (id) => {
    const result = await categories.findOne({ _id: id});

    if (!result) throw new BadRequestErrors(`Tidak ada kategori dengan id: ${id}`)

    return result
}

module.exports = {
     getAllCategories, 
     createCategories, 
     geteOneCategories, 
     updateCategories, 
     deleteCategories,
    checkingCategories
}