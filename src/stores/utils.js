// return res.status(err.statusCode).render(
//   'error', {
//     title: `An error occured in ${storeName}`,
//     message: JSON.stringify(err.response.body),
//     statusCode: JSON.stringify(err.statusCode)
//   }
// )

const util = require('util')

exports.createStoreError = storeName => {
  const error = function(originalError) {
    Error.captureStackTrace(this, this.constructor)
    this.name = `${storeName}Error`
    this.statusCode = originalError.statusCode
    this.message = `An error occured in ${storeName}`
    this.query =
      originalError.response && originalError.response.body.error.query
    this.storeName = storeName
    this.description =
      originalError.response && originalError.response.body.error.description
  }
  util.inherits(error, Error)
  return error
}
