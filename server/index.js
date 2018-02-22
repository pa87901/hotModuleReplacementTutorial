'use strict'

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

app.listen(PORT, err => {
  err ? console.error('Error with server') : console.log(`Listening on port ${PORT}`);
});