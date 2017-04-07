const moment = require('moment')
const config = require('../config')
const block2html = require('./blocks2html')
const headerMap = require('./headerMap')

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

exports.blocks2html = (content) => {
  return block2html(content)
}

exports.headerMap = (content) => {
  return headerMap(content)
}
