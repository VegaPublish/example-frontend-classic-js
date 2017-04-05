const config = require('../config')
const articleStore = require('../stores/articleStore')
const venueStore = require('../stores/venueStore')

module.exports = (function () {
  const router = require('express').Router()

  router.get('/', function (req, res) {
    const context = {
      htmlTitle: config.app.title,
      articlesInIssueBlocks: [],
      venue: {}
    }

    venueStore.getVenue().then(venue => {
      context.venue = venue[0]
      console.log(venue)
      articleStore.getAllArticlesFromIssues().then(issues => {
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
  })
  return router
})()
