const config = require('../config')
const articleStore = require('../stores/articleStore')

module.exports = (function () {
  const router = require('express').Router()

  router.get('/', function (req, res) {
    const context = {
      htmlTitle: config.app.title,
      articlesInIssueBlocks: []
    }

    articleStore.getAllArticlesFromIssues()
      .then(issues => {
        context.articlesInIssueBlocks = issues.map(function (issue) {
          issue.articles = []
          issue.content.forEach(function (content) {
            content.articles.forEach(function (article) {
              issue.articles.push(article)
            })
          })
          return issue
        })

        res.render('home', context)
      })
  })

  return router
})()
