const config = require('../config')
const articleStore = require('../stores/articleStore')

module.exports = (function () {
  const router = require('express').Router()

  router.get('/', function (req, res) {
    const context = {
      htmlTitle: config.app.title,
      articles: []
    }
    articleStore.getAllArticlesFromIssues()
      .then(issues => {
        const articles = []

        issues.map(function (issue) {
          issue.content.map(function (content) {
            content.articles.map(function (article) {
              article.issueTitle = issue.title
              articles.push(article)
            })
          })
        })

        context.articles = articles
        res.render('home', context)
      })
  })

  return router
})()
