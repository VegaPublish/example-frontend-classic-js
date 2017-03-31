const config = require('../config')
const sanityClient = require('@sanity/client')

const client = sanityClient(config.sanity)

module.exports = client
