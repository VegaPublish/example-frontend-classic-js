const express = require('express')
const path = require('path')
const postcssMiddleware = require('postcss-middleware')
const postcssNext = require('postcss-cssnext')

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

// Post CSS middleware
app.use('/css', postcssMiddleware(
  {
    src: req => {
      return path.join('src', 'styles', req.path)
    },
    plugins: [postcssNext]
  })
)

// Wire up our own routes
app.use('/', routes.home)
app.use('/issues', routes.issues)

module.exports = app
