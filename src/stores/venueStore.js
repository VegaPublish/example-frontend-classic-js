const client = require('../lib/client')
const utils = require('./utils')

const VenueStoreError = utils.createStoreError('VenueStore')

module.exports = {
  getVenue: () => {
    const query = `
      *[_type == "venue"]{
        ...,
        frontPageImage{
          asset->{url}
        },

        logo{
          asset->{url}
        }
      }
    `
    return client
      .fetch(query)
      .then(venues => venues[0])
      .catch(err => {
        throw new VenueStoreError(err)
      })
  }
}
