const client = require('../lib/client')
module.exports = function loadArticles(issues) {
  // Extract article ids from issues
  let articleIds = []
  issues.forEach(issue =>
    issue.content.forEach(section =>
      section.articles.forEach(article => articleIds.push(article._ref))
    )
  )
  // Load articles in chunks of some limited size
  const articles = {}
  const chunkSize = 10
  const promises = []
  while (articleIds.length > 0) {
    // The ones we are loading this time `round
    const ids = articleIds.slice(0, chunkSize)
    // The ones that are remaining
    articleIds = articleIds.slice(chunkSize)
    promises.push(
      client
        .fetch(
          `*[_type == 'article' && _id in $ids]{
          _id,
          title,
          _createdAt,
          authors[]{
            name,
          },
            mainImage{
            asset
          }
        }`,
          {ids}
        )
        .then(results => {
          results.forEach(article => (articles[article._id] = article))
          return results
        })
    )
  }
  return Promise.all(promises).then(data => {
    data.forEach(articles => articles.forEach(article => {}))
    issues.forEach(issue =>
      issue.content.forEach(
        section =>
          (section.articles = section.articles.map(
            articleRef => articles[articleRef._ref]
          ))
      )
    )
    return issues
  })
}
