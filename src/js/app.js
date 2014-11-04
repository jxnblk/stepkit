
'use strict';

var Bumpkit = require('bumpkit');

var app = angular.module('app', ['ngTouch']);

app.service('bumpkit', require('./services/bumpkit'));

app.directive('transport', require('./directives/transport'));
app.directive('icon', require('./directives/geomicons'));


app.controller('MainCtrl', require('./controllers/main'));
app.controller('TransportCtrl', require('./controllers/transport'));

