exports.handleStoreError = (res, err) => {
  err.statusCode = err.statusCode || 500
  return res.status(err.statusCode).render('error', {
    title: err.message,
    message: `${err.description}\n\n${err.query ? err.query : ''}`,
    statusCode: err.statusCode,
    stack: err.stack,
    development: process.env.NODE_ENV === 'development'
  })
}
