const client = require('../lib/client')
const utils = require('./utils')
const loadArticles = require('./loadArticles')

const IssueStoreError = utils.createStoreError('IssueStore')

module.exports = {
  getIssues: () => {
    const query = `
      *[_type == "issue"]{
        ...,
        coverImage{
          asset->{url}
        }
      }
    `
    return client.fetch(query).catch(err => {
      throw new IssueStoreError(err)
    })
  },

  getIssueById: id => {
    const query = `
      *[_type == "issue" && _id == $id]{
        ...,
        coverImage{
          asset->{url}
        },
        content
      }
    `
    return client
      .fetch(query, {id})
      .then(loadArticles)
      .catch(err => {
        throw new IssueStoreError(err)
      })
  }
}
