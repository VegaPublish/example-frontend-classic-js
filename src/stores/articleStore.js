const client = require('../lib/client')
const uniqueId = require('lodash.uniqueid')

module.exports = {

  getAllArticlesFromIssues: () => {
    const query = `
    *[is "issue"]{
      _updatedAt,
      title,
      content{
        articles{
          _id,
          title,
          authors{...},
          mainImage{
            asset{
              url
            }
          }
        }
      }
    }
    `
    return client.fetch(query)
  },

  getAllArticles: () => {
    const query = `
      *[is "article"]|order(publishAt.utc desc)[0...1000]{
        ...,
        mainImage{
          asset{url}
        }
      }
    `
    return client.fetch(query)
  },

  getArticle: id => {
    const query = `
      *[_id == "${id}"]{
        ...,
        authors{
          name,
          profileImage{
            ...,
            asset{...}
          }
        },
        content{...},
        mainImage{
          asset{url}
        }
      }
    `
    return client.fetch(query).then(function (result) {
      const content = result[0].content

      if (content) {
        content.map(function (item, i) {
          item.extra = {id: `item-${i}`}
          return item
        })
      }

      return result
    })
  }
}
