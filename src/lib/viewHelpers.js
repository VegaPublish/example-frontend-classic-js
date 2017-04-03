const moment = require('moment')
const config = require('../config')

exports.journalTitle = () => {
  return config.app.title
}

exports.fullIssueTitle = issue => {
  return `Issue ${issue.volume}.${issue.number} - ${issue.title} (${issue.year})`
}


exports.moment = (date, format) => {
  return moment(date).format(format)
}

exports.dateTime = (date) => {
  return moment(date).calendar()
}
