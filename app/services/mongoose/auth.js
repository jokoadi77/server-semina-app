const Users = require('../../api/v1/users/model')
const {BadRequestErrors, UnauthorizedError } = require('../../errors')
const { createTokenUser, createJWT} = require('../../utils')

const signin = async (req) => {
    const { email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestErrors('Please provide email and password');
    }

    const result = await Users.findOne({ email: email})

    if(!result) { throw new UnauthorizedError('Invalid Credentials')
    }

    const token = createJWT({ payload: createTokenUser(result) });

    return token
};

module.exports = { signin}