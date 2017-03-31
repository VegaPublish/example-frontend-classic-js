const client = require('../lib/client')

module.exports = {

  getIssues: () => {
    const query = `
      *[is "issue"]|order(publishAt.utc desc)[0...1000]{
        ...,
        coverImage{
          asset{url}
        }
      }
    `
    return client.fetch(query)
  },

  getIssueById: id => {
    const query = `
      *[is "issue" && _id == $id]{
        ...,
        coverImage{
          asset{url}
        },
        content{
          ...,
          articles{
            ...,
            mainImage{
              asset{...}
            }
          }
        }
      }
    `
    return client.fetch(query, {id})
  }
}
