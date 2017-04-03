const config = require('../config')
const articleStore = require('../stores/articleStore')

module.exports = (function () {
  const router = require('express').Router()

  router.get('/', function (req, res) {
    const context = {
      htmlTitle: config.app.title,
      articles: []
    }
    articleStore.getArticles()
      .then(articles => {
        context.articles = articles
        res.render('home', context)
      })
  })

  return router
})()
