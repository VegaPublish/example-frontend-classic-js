const moment = require('moment')
const config = require('../config')
const blocksToHtml = require('./blocksToHtml')
const blocksToHtmlOnlyHeaders = require('./blocksToHtmlOnlyHeaders')
const venueStore = require('../stores/venueStore')

exports.journalTitle = () => {
  return config.app.title
}

exports.venue = () => {
  return venueStore.getVenue().then(venue => {
    return venue
  })
}

exports.fullIssueTitle = issue => {
  return `Issue ${issue.volume}.${issue.number} - ${issue.title} (${
    issue.year
  })`
}

exports.moment = (date, format) => {
  return moment(date).format(format)
}

exports.dateTime = date => {
  return moment(date).calendar()
}

exports.blocks2html = content => {
  return blocksToHtml(content)
}

exports.headerMap = content => {
  return blocksToHtmlOnlyHeaders(content)
}
