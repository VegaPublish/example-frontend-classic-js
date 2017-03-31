const config = require('../config')

exports.journalTitle = () => {
  return config.app.title
}

exports.fullIssueTitle = issue => {
  return `Issue ${issue.volume}.${issue.number} - ${issue.title} (${issue.year})`
}
