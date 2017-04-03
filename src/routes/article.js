const config = require('../config')
const articleStore = require('../stores/articleStore')

const handleStoreError = (res, err) => {
  return res.status(err.statusCode).render(
    'error', {
      title: 'An error occured in articleStore',
      message: JSON.stringify(err.response.body),
      statusCode: JSON.stringify(err.statusCode)
    }
  )
}

module.exports = (function () {
  const router = require('express').Router()

  router.get('/:id', function (req, res) {
    const {id} = req.params
    const context = {
      htmlTitle: null,
      article: null
    }
    articleStore.getArticle(id)
      .then(article => {
        if (!article) {
          res.status(404).render('notfound', {message: `The article with id ${id} was not found.`})
          return
        }
        context.article = article[0]
        context.htmlTitle = `${config.app.title} - ${article.title}`
        console.log(article)
        res.render('article', context)
      })
      .catch(err => handleStoreError(res, err))
  })

  return router
})()
