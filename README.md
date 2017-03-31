# example-frontend-classic-js

This is still work in progress!

An example frontend for Vega implemented as a classic Node.js web app without any fancy stuff.

The idea is to provide a simple codebase where only basic knowledge to Javascript and HTML is needed to customize and get a journal up and running in no time.

* Node 6.5
* ESLint
* Express server
* Templating with HTML-like Handlebars
* Plain Javascript and CSS for the browser without any bundling and transforms.

Advanced users would probably want something like React, Browserify/Webpack, Babel etc, but this example will keep it as simple as possible.

## Get going

* ``npm install``
* Edit ``src/config.js`` (see ``src/config-example.js`` for a template)
* ``npm run develop`` to start a development server.
* Go to ``http://localhost:3000``
