const CustomApiErrors = require('./custom-api-error')
const BadRequestErrors = require('./bad-request')
const NotFoundErrors = require('./not-found')
const UnauthenticatedError = require('./unauthenticatedError')
const  UnauthorizedError = require('./unauthorizedError')

module.exports = {
    CustomApiErrors,
    BadRequestErrors,
    NotFoundErrors,
    UnauthenticatedError,
    UnauthorizedError
}