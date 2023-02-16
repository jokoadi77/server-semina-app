const { StatusCodes } = require('http-status-codes')
const CustomApiErrors = require('./custom-api-error')


class UnauthorizedError extends CustomApiErrors {
constructor(message) {
  super(message)

    this.StatusCodes = StatusCodes.FORBIDDEN;
    
  }
}

module.exports = UnauthorizedError