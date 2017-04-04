const client = require('../lib/client')

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
        mainImage{
          asset{url}
        }
      }
    `
    return client.fetch(query)
  }
}
