const config = require('../config')
const articleStore = require('../stores/articleStore')
const venueStore = require('../stores/venueStore')
const issueStore = require('../stores/issueStore')

const helpers = require('./helpers')

module.exports = (function() {
  const router = require('express').Router()

  router.get('/', function(req, res) {
    const context = {
      htmlTitle: config.app.title,
      articlesInIssueBlocks: [],
      venue: {}
    }
    const getVenue = venueStore.getVenue()
    const getAllArticlesFromIssues = articleStore.getAllArticlesFromIssues()
    const getIssues = issueStore.getIssues()
    Promise.all([getVenue, getAllArticlesFromIssues, getIssues])
      .then(values => {
        context.venue = values[0]
        const allArticlesFromIssues = values[1]
        const issues = values[2]
        context.issues = issues
        context.articlesInIssueBlocks = allArticlesFromIssues.map(issue => {
          issue.articles = issue.content
            ? [].concat.apply(
                [],
                issue.content.map(content => content.articles)
              )
            : []
          return issue
        })
        res.render('home', context)
      })
      .catch(err => helpers.handleStoreError(res, err))
  })
  return router
})()
