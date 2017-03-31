const express = require('express')
const expressHandlebars = require('express-handlebars')
const routes = require('./routes')
const viewHelpers = require('./lib/viewHelpers')
const app = express()

// Set up handlebars as view engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  layoutsDir: './src/views/layouts',
  partialsDir: [
    './src/views/partials'
  ],
  helpers: viewHelpers
}))
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// Static folder
app.use(express.static('src/static'))

// Wire up routes
app.use('/', routes.home)
app.use('/issues', routes.issues)

module.exports = app
