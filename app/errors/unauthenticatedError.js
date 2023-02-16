const { StatusCodes } = require('http-status-codes')
const CustomApiErrors = require('./custom-api-error')


class UnauthenticatedError extends CustomApiErrors {
constructor(message) {
  super(message)

    this.StatusCodes = StatusCodes.UNAUTHORIZED;
    
  }
}

module.exports = UnauthenticatedError