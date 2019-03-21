const config = require('../config')
const articleStore = require('../stores/articleStore')
const helpers = require('./helpers')
const venueStore = require('../stores/venueStore')

module.exports = (function() {
  const router = require('express').Router()

  router.get('/:id', function(req, res) {
    const {id} = req.params
    const context = {
      htmlTitle: null,
      article: null
    }

    venueStore
      .getVenue()
      .then(venue => {
        context.venue = venue
      })
      .then(() => {
        return articleStore
          .getArticle(id)
          .then(article => {
            if (!article) {
              res.status(404).render('notfound', {
                message: `The article with id ${id} was not found.`
              })
              return
            }
            context.article = article[0]
            context.htmlTitle = `${config.app.title} - ${article.title}`
            res.render('article', context)
          })
          .catch(err => helpers.handleStoreError(res, err))
      })
  })
  return router
})()
