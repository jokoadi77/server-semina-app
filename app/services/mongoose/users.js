const Users = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequestErrors } = require('../../errors')
const { StatusCodes } = require('http-status-codes')

const createOrganizer = async (req) => {
    const { organizer, role, email, password, confirmPassword, name } = req.body

    if(password !== confirmPassword) {
        throw new BadRequestErrors('Password dan confirmPassword tidak sama')
    }

    const result = await Organizer.create({ organizer })

    const users = await Users.create({
        email,
        name,
        password,
        organizer: result._id,
        role,
    });

    delete users._doc.password

    return users
}

const createUsers = async (req,res) => {
    const {name, password, role, confirmPassword,email} = req.body;

    if(password !== confirmPassword) {
        throw new BadRequestErrors('Password dan cofirm password tidak sama')
    }

    const result = await Users.create({
        name,
        email,
        organizer: req.user.organizer,
        password,
        role,
    });
    return result
}

const getAllUsers = async (req) => {
    const result = await Users.find();

    return result
} 

module.exports = {createOrganizer, createUsers, getAllUsers}