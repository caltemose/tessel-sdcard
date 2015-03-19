var tessel = require('tessel');
var logger = require('./logger');
var climate = require('./climate');

var onCardReady = function () {
  console.log('log-test.onCardReady() called');
  writeToCard();
};

var writeToCard = function () {
  var date = new Date();
  logger.writeLog(date.toString(), onLogWritten);
};

var onLogWritten = function (results) {
  console.log('log-test.onLogWritten()');
  console.log(results);
};

var onClimateReady = function () {
  climate.getCurrentWeather(onClimateData);
};

var onClimateData = function (weather) {
  console.log(weather);
};


climate.init('D', onClimateReady);
logger.init('B', onCardReady);
