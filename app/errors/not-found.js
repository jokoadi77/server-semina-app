const { StatusCodes } = require('http-status-codes')
const CustomApiErrors = require('./custom-api-error')


class NotFound extends CustomApiErrors {
constructor(message) {
  super(message)

    this.StatusCodes = StatusCodes.NOT_FOUND;
    
  }
}

module.exports = NotFound