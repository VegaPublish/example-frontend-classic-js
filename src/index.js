const fs = require('fs')

function start () {
  // Check if the config is OK
  const config = fs.existsSync('./src/config.js') ? require('./config') : false
  if (!config || !config.sanity.projectId) {
    console.error(
      '\x1b[31m\nPlease configure "./src/config.js" with a valid ' +
      'Sanity configuration before running the app.\n\nSee "./src/config-example.js" for a template'
    )
    process.exit(1)
  }
  // Start the app
  const app = require('./app')
  const port = process.env.PORT || config.server.port || 3000
  app.listen(port, () => console.log(`\x1b[32m\nServer running on port ${port}\n`))
}

start()
