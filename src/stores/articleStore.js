const client = require('../lib/client')
const utils = require('./utils')
const loadArticles = require('./loadArticles')
const ArticleStoreError = utils.createStoreError('ArticleStore')

module.exports = {
  getAllArticlesFromIssues: () => {
    const query = `
      *[_type == "issue"]{
        _updatedAt,
        title,
        content[]{
          ...
        }
      }
    `
    return client
      .fetch(query)
      .then(loadArticles)
      .catch(err => {
        console.error(err)
        throw new ArticleStoreError(err)
      })
  },

  getAllArticles: () => {
    const query = `
      *[_type == "article"]|order(publishAt.utc desc)[0...1000]{
        ...,
        mainImage{
          asset->{url}
        }
      }
    `
    return client.fetch(query).catch(err => {
      throw new ArticleStoreError(err)
    })
  },

  getArticle: id => {
    const query = `
      *[_id == "${id}"]{
        ...,
        authors[]{
          name,
          profileImage{
            ...,
            asset->{url}
          }
        },
        content[]{
          ...,
          asset->{url}
        },
        mainImage{
          asset->{url}
        }
      }
    `
    return client
      .fetch(query)
      .then(result => {
        const content = result[0].content
        if (content) {
          content.map(function(item, i) {
            item.extra = {id: `item-${i}`}
            return item
          })
        }
        return result
      })
      .catch(err => {
        throw new ArticleStoreError(err)
      })
  }
}
