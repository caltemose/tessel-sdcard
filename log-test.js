var tessel = require('tessel');
var logger = require('./logger');
var climate = require('./climate');
var ambient = require('./ambient');

var modules = [
  {
    name: 'sdcard',
    port: 'B',
  }
  ,{
    name: 'climate',
    port: 'D',
  }
  ,{
    name: 'ambient',
    port: 'A'
  }
];


var onModuleReady = function (module) {
  var i, len = modules.length, allReady = true;
  for(i=0; i<len; i++) {
    if (modules[i].name === module) {
      modules[i].ready = true;
      console.log(modules[i].name + ' is ready.');
    }
    if (!modules[i].ready)
      allReady = false;
  }
  if (allReady) {
    console.log('all modules ready.');
    getAllData();
  }
};

var getAllData = function () {
  climate.getCurrentWeather(onClimateData);
};

var onClimateData = function (weather) {
  console.log(weather);
  ambient.getAmbience(onAmbientData);
};

var onAmbientData = function (ambience) {
  console.log(ambience);
  writeToCard();
};

var writeToCard = function () {
  var date = new Date();
  logger.writeLog(date.toString(), onLogWritten);
};

var onLogWritten = function (results) {
  console.log(results);
};



climate.init('D', onModuleReady);
logger.init('B', onModuleReady);
ambient.init('A', onModuleReady);
