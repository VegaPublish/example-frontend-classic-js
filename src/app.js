const path = require('path')

const express = require('express')
const expressHandlebars = require('express-handlebars')

const postcssMiddleware = require('postcss-middleware')
const postcssNext = require('postcss-cssnext')

const routes = require('./routes')
const viewHelpers = require('./lib/viewHelpers')

const app = express()

// Set up handlebars as view engine
const handlebarsEngine = expressHandlebars({
  defaultLayout: 'main',
  layoutsDir: './src/views/layouts',
  partialsDir: [
    './src/views/partials'
  ],
  helpers: viewHelpers
})
app.engine('handlebars', handlebarsEngine)
app.set('view engine', 'handlebars')
app.set('views', './src/views')

// Static folder
app.use(express.static('src/static'))

// PostCSS middleware with PostCSSNext plugin
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
