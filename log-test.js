var tessel = require('tessel');
var wifi = require('wifi-cc3000');
var logger = require('./logger');
var climate = require('./climate');
var ambient = require('./ambient');

var modules = {
  sdcard: {
    port: 'B',
  },
  climate: {
    port: 'D',
  },
  ambient: {
    port: 'A'
  }
};

var sensorData = {};

var init = function () {
  climate.init(modules.climate.port, onModuleReady);
  logger.init(modules.sdcard.port, onModuleReady);
  ambient.init(modules.ambient.port, onModuleReady);
};

var onModuleReady = function (module) {
  var m, ready = true;
  for (m in modules) {
    if (m === module) {
      modules[m].ready = true;
      console.log(m + ' is ready');
    }
    if (!modules[m].ready)
      ready = false;
  }
  if (ready) {
    console.log('all modules ready.');
    getAllData();
  }
};

var getAllData = function () {
  climate.getCurrentWeather(onClimateData);
};

var onClimateData = function (weather) {
  console.log(weather);
  sensorData.weather = weather;
  ambient.getAmbience(onAmbientData);
};

var onAmbientData = function (ambience) {
  console.log(ambience);
  sensorData.ambience = ambience;
  writeToCard();
};

var writeToCard = function () {
  var now = new Date();
  var msg = now.toISOString() + ' ';
  msg += sensorData.weather.temp.f + 'F ';
  msg += sensorData.weather.temp.c + 'C ';
  msg += sensorData.weather.humid + 'RH ';
  msg += sensorData.ambience.light + 'L ';
  msg += sensorData.ambience.sound + 'S ';
  msg += '\n';
  console.log('writing log...');
  logger.writeLog(msg, onLogWritten);
};

var onLogWritten = function (results) {
  console.log('log written.');
  console.log(results);
};

wifi.on('connect', function (data) {
  console.log('wifi connected');
  init();
});