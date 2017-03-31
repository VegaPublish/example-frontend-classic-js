const config = require('../config')
const issueStore = require('../stores/issueStore')
const viewHelpers = require('../lib/viewHelpers')

const handleStoreError = (res, err) => {
  return res.status(err.statusCode).render(
    'error', {
      title: 'An error occured in issueStore',
      message: JSON.stringify(err.response.body),
      statusCode: JSON.stringify(err.statusCode)
    }
  )
}

module.exports = (function () {
  const router = require('express').Router()

  router.get('/', function (req, res) {
    const context = {
      htmlTitle: `${config.app.title} - Issues`,
      issues: []
    }
    issueStore.getIssues()
      .then(issues => {
        context.issues = issues
        res.render('issues', context)
      })
  })

  router.get('/:id/', function (req, res) {
    const {id} = req.params
    const context = {
      htmlTitle: null,
      issue: null
    }
    issueStore.getIssueById(id)
      .then(issues => {
        if (!issues.length) {
          res.status(404).render('notfound', {message: `The issue with id ${id} was not found.`})
          return
        }
        context.issue = issues[0]
        context.htmlTitle = `${config.app.title} - ${viewHelpers.fullIssueTitle(context.issue)}`
        res.render('issue', context)
      })
      .catch(err => handleStoreError(res, err))
  })

  return router
})()
