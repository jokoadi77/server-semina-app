const { StatusCodes } = require('http-status-codes')
const CustomApiErrors = require('./custom-api-error')


class BadRequest extends CustomApiErrors {
constructor(message) {
  super(message)

    this.StatusCodes = StatusCodes.BAD_REQUEST;
    
  }
}

module.exports = BadRequest