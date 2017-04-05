const client = require('../lib/client')

module.exports = {

  getVenue: () => {
    const query = `
      *[is "venue"]{
        ...,
        frontPageImage{asset{url}},
        logo{asset{url}}
      }
    `
    return client.fetch(query)
  }
}
