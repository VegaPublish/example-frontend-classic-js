const config = require('../config')
const venueStore = require('../stores/venueStore')
const issueStore = require('../stores/issueStore')
const viewHelpers = require('../lib/viewHelpers')
const helpers = require('./helpers')

module.exports = (function() {
  const router = require('express').Router()

  router.get('/', function(req, res) {
    const context = {
      htmlTitle: `${config.app.title} - Issues`,
      issues: [],
      venue: {}
    }
    venueStore
      .getVenue()
      .then(venue => {
        context.venue = venue
      })
      .then(() => {
        return issueStore
          .getIssues()
          .then(issues => {
            context.issues = issues
            res.render('issues', context)
          })
          .catch(err => helpers.handleStoreError(res, err))
      })
  })

  router.get('/:id/', function(req, res) {
    const {id} = req.params
    const context = {
      htmlTitle: null,
      issue: null
    }

    venueStore
      .getVenue()
      .then(venue => {
        context.venue = venue
      })
      .then(() => {
        return issueStore
          .getIssueById(id)
          .then(issues => issues[0])
          .then(issue => {
            if (!issue) {
              res.status(404).render('notfound', {
                message: `The issue with id ${id} was not found.`
              })
              return
            }
            context.issue = issue
            context.htmlTitle = `${
              config.app.title
            } - ${viewHelpers.fullIssueTitle(context.issue)}`
            res.render('issue', context)
          })
          .catch(err => helpers.handleStoreError(res, err))
      })
  })

  return router
})()
