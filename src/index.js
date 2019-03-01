const fs = require('fs')

function start(environment) {
  process.env.NODE_ENV = process.env.NODE_ENV || environment

  // Check if the config is OK
  const config = fs.existsSync('./src/config.js') ? require('./config') : false
  if (!config || !config.lyra.apiHost) {
    console.error(
      '\x1b[31m\nPlease configure "./src/config.js" with a valid ' +
        'Lyra configuration before running the app.\n\nSee "./src/config-example.js" for a template'
    )
    process.exit(1)
  }
  // Start the app
  const app = require('./app')
  const port = process.env.PORT || config.server.port || 3000
  app.listen(port, () =>
    console.log(`\x1b[32m\nServer running on port ${port}\n`)
  )
}

start(process.argv.slice(2)[0])
