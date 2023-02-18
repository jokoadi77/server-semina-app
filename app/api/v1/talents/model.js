const  mongoose = require('mongoose');
const { model, Schema } = mongoose

let talentSchema = Schema({
    name: {
        type: String,
        required: [true, 'nama harus diisi'],
    },
    role: {
        type: String,
        default: '-',
    },
    // untuk membuat relasi pada mongodb perlu membuat types objectId
    image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    organizer:  {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true,

    },
},
{ timestamps: true}
);

module.exports = model('Talent', talentSchema)