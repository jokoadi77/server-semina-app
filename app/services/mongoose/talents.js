// import model Talents
const Talents = require('../../api/v1/talents/model')
const { checkingImage } = require('./images');

//import csutom error not found and bad request
const { NotFoundErrors, BadRequestErrors } = require('../../errors')

const getAllTalents = async (req) => {
    const { keyword } = req.query;

    let condition = {};

    if(keyword) {
        condition = { ...condition, name: { $regex: keyword, $options: 'i'} };
    }

    const result = await Talents.find(condition)
    .populate({
        path: 'image',
        select: '_id name'
    })
    .select('_id name role image');

    return result
}

const createTalents = async (req) => {
    const {name, role, image} = req.body;

    //cari image dengan field image
    await checkingImage(image);

    //cari talents dengan field name
    const check = await Talents.findOne({ name })

    //apabila check true / data talents sudah ada maka tampilkan error bad request dengan massage pembicara sudah ada
    if (check) throw new BadRequestErrors('pembicara sudah terdaftar')

    const result = await Talents.create({ name, image, role});

    return result
}

const getOneTalents = async (req) => {
    const { id} = req.params;

    const result = await Talents.findOne({ _id: id})
    .populate({
        path: 'image',
        select: '_id name',
    })
    .select('_id name role image')

    if (!result) throw new NotFoundErrors(`Tidak ada pembicara dengan id: ${id}`)

    return result

};

const updateTalents = async (req) => {
    const {id} = req.params
    const { name, image, role} = req.body

    //cari image dengan field image
    await checkingImage(image)

    //cari talent dengan field name dan id selain dari yang dikirim dari params
    const check = await Talents.findOne({ 
        name,
        _id: { $ne: id}
    });

    //apabila check true / data talents sudah ada makan tampilkan error bad request
    if(check) throw new BadRequestErrors('pembicara sudah terdaftar')

    const result = await Talents.findOneAndUpdate(
        { _id: id},
        {name, image, role},
        { new: true, runValidators: true}
    );

    //jika id result false / null maka akan menampilkan error
    if(!result) throw new NotFoundErrors(`Tidak ada pembicara dengan id: ${id}`)

    return result
}

const deleteTalents = async (req) => {
    const { id } = req.params

    const result = await Talents.findOne({
        _id: id,
    });

    if(!result) throw new NotFoundErrors(`Tidak ada pembicara dengan id: ${id}`)

    await result.remove()

    return result
}

const checkingTalents = async (id) => {
    const result = await Talents.findOne({ _id: id})

    if(!result) throw new NotFoundErrors(`Tidak ada pembicara dengan id: ${id}`)

    return result
}

module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingTalents,
}