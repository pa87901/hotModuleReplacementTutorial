'use strict'

require('babel-register'); // everything in this file itself will not be transpiled; but everything that it requires will be run through babel
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const _ = require('lodash');
const App = require('../client/src/components/App.jsx').default; // .default because we export default; we export an {} with one key which is default
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(`${__dirname}/../client/dist`));

app.use((req, res) => {
  const context = {}; // pass in context {} to body because sometimes you will get redirected.
  const body = renderToString(createElement(App));
  if (context.url) {
    res.redirect(context.url);
  }
  const baseTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hot Module Replacement</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
      </head>
      <body>
        <div id="app"><%= body %></div> <!-- lodash templating for server-side rendering -->
        <script type="text/javascript" src="bundle.js"></script>
      </body>
    </html>
  `;
  const template = _.template(baseTemplate);
  res.write(template({body}));
  res.end();
});

app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(PORT, err => {
  err ? console.error('Error with server') : console.log(`Listening on port ${PORT}`);
});