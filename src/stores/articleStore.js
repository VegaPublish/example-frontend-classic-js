const client = require('../lib/client')
const utils = require('./utils')

const ArticleStoreError = utils.createStoreError('ArticleStore')

module.exports = {

  getAllArticlesFromIssues: () => {
    const query = `
      *[_type == "issue"]{
        _updatedAt,
        title,
        "content": content[]{
          ...,
          "articles" : articles[] -> {
            _id,
            title,
            _createdAt,
            "authors": authors[]{...},
            mainImage{
              "asset": asset->{url}
            }
          }
        }
      }
    `
    return client
      .fetch(query)
      .catch(err => {
        throw new ArticleStoreError(err)
      })
  },

  getAllArticles: () => {
    const query = `
      *[_type == "article"]|order(publishAt.utc desc)[0...1000]{
        ...,
        mainImage{
          "asset": asset->{url}
        }
      }
    `
    return client
      .fetch(query)
      .catch(err => {
        throw new ArticleStoreError(err)
      })
  },

  getArticle: id => {
    const query = `
      *[_id == "${id}"]{
        ...,
        "authors": authors[]{
          name,
          profileImage{
            ...,
            "asset": asset->{url}
          }
        },
        "content": content[],
        mainImage{
          "asset": asset->{url}
        }
      }
    `
    return client.fetch(query)
      .then(result => {
        const content = result[0].content
        if (content) {
          content.map(function (item, i) {
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
