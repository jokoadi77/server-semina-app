const Users = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizers/model')
const { BadRequestErrors } = require('../../errors')

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

module.exports = createOrganizer