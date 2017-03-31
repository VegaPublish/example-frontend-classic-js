const config = require('../config')

module.exports = (function () {
  const router = require('express').Router()

  router.get('/', function (req, res) {
    const context = {htmlTitle: config.app.title}
    res.render('home', context)
  })

  return router
})()
