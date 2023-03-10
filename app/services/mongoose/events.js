// import model events
const Events = require('../../api/v1/events/model')
const { checkingImage } = require('./images')
const { checkingCategories } = require('./categories')
const { checkingTalents } = require('./talents')

// import custom error not found dan bad reequest
const { BadRequestErrors, NotFoundErrors } = require('../../errors')

const getAllEvents = async (req) => {
    const { keyword, category, talent, status } = req.query;
    let condition = {  organizer: req.user.organizer };

    if(keyword) {
        condition = {...condition, title: { $regex: keyword, $options: 'i'} }
    }

    if(category) {
        condition = {...condition, category: category }
    }

    if(talent) {
        condition = {...condition, talent: talent}
    }
    if (['Draft', 'Published'].includes(status)) {
        condition = {
            ...condition,
            statusEvent: status 
        }
    } 
    
    const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name'})
    .populate({
        path: 'category',
        select: '_id name',
    })
    .populate({
        path: 'talent',
        select: '_id name role image',
        populate: { path: 'image', select: '_id name'},
    });

    return result
};

const createEvents = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category dan talent dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    // cari Events dengan field name
    const check = await Events.findOne({ title });

    //apabila check true / data Events sudah ada maka tampilkan error bad request dgn message pembicara duplikat
    if (check) throw new BadRequestErrors('judul event sudah terdaftar')

    const result = await Events.create({
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
        organizer: req.user.organizer,
    });

    return result;
};


const getOneEvents = async (req) => {
   const { id } = req.params;

   const result = await Events.findOne( { _id: id,  organizer: req.user.organizer})
    .populate({ path: 'image', select: '_id name'})
    .populate({
        path: 'category',
        select: '_id name',
    })
    .populate({ 
        path: 'talent',
        select: '_id name role image',
        populate: { path: 'image', select: '_id name'},
    });

    if(!result) throw new NotFoundErrors(`Tidak ada pembicara dengan id: ${id}`);

    return result;

    
};

const updateEvents = async (req) => {
    const { id } = req.params;
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category dan talent dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    //cari event berdasarkan field id
    const checkEvent = await Events.findOne({
        _id: id,
    });
    //jika result false / null makan menampilkan error
    if (!checkEvent) throw new NotFoundErrors(`tidak ada event dengan id: ${id}`);


    // cari Events dengan field name
    const check = await Events.findOne({ 
        title,
        organizer: req.user.organizer,
        _id: { $ne: id}
    });

    //apabila check true / data Events sudah ada maka tampilkan error bad request dgn message pembicara duplikat
    if (check) throw new BadRequestErrors('judul event sudah terdaftar')

    const result = await Events.findOneAndUpdate(
        { _id: id},
        {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
        organizer: req.user.organizer,
    },
        { new: true, runValidators: true}
    );
    

    return result;
};

const deleteEvents = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    if(!result) throw new NotFoundErrors(`Tidak ada pembicara dengan id: ${id}`);

    await result.remove()

    return result
}

const changeStatusEvents = async (req) => {
    const { id } = req.params;
    const { statusEvent } = req.body;
    //cari event berdasarkan id
    const checkEvent = await Event.findOne({
        _id: id,
        organizer: req.user.organizer,
    });

    // jika id result false / null maka akan menampilkan error
    if (!checkEvent) throw new NotFoundErrors(`Tidak ada acara dengan id ${id}`)

    checkEvent.statusEvent = statusEvent;

    await checkEvent.save();

    return checkEvent
}

module.exports = {
    getAllEvents,
    createEvents,
    getOneEvents,
    updateEvents,
    deleteEvents,
    changeStatusEvents,
}