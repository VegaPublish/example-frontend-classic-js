const client = require('../lib/client')
const utils = require('./utils')

const IssueStoreError = utils.createStoreError('IssueStore')

module.exports = {

  getIssues: () => {
    const query = `
      *[_type == "issue"]|order(publishAt.utc desc)[0...1000]{
        ...,
        coverImage{
          asset{url}
        }
      }
    `
    return client
      .fetch(query)
      .catch(err => {
        throw new IssueStoreError(err)
      })
  },

  getIssueById: id => {
    const query = `
      *[_type == "issue" && _id == $id]{
        ...,
        coverImage{
          "asset": asset->{url}
        },
        "content": content[]{
          ...,
          "articles": articles[] -> {
            ...,
            mainImage{
              "asset": asset->{url}
            }
          }
        }
      }
    `
    return client
      .fetch(query, {id})
      .catch(err => {
        throw new IssueStoreError(err)
      })
  }
}
