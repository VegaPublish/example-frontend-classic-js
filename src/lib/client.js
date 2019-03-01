const config = require('../config')
const lyraClient = require('@lyra/client')

const client = lyraClient(config.lyra)
module.exports = client
