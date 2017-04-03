const client = require('../lib/client')

module.exports = {

  getArticles: () => {
    const query = `
      *[is "article"]|order(publishAt.utc desc)[0...1000]{
        ...,
        mainImage{
          asset{url}
        }
      }
    `
    return client.fetch(query)
  }
}
