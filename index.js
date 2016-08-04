// content of index.js
const http = require('http');

var routes = require('./routes');

module.exports = {  
  create: routes.create
};