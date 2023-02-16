const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
    name:  {
        type: String,
        required: [true, 'Nama harus diisi'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email harus diisi'],
        unique: true,
    },
    password:  {
        type: String,
        required: [true, 'Password harus diisi'],
        minLength: 6,
    },
    role:  {
        type: String,
        enum: ['admin', 'organizer', 'owner'],
        ref: 'Organizer',
        default: 'admin',
    },
    organizer:  {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true,

    },
},
{ timestamps: true}
);

userSchema.pre('save', async function (next) {
    const User = this;
    if(User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
});

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password)
    return isMatch
};

module.exports = mongoose.model('User', userSchema)