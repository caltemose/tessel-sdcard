var tessel = require('tessel');
var climatelib = require('climate-si7005');
var climate;

var MODULE_NAME = 'climate';

// ---------------------------------------------------------
//
//  EXPOSED METHODS
//
// ---------------------------------------------------------

exports.init = function (port, callback) {
  climate = climatelib.use(tessel.port[port]);
  climate.on('ready', function () {
    callback(MODULE_NAME);
  });
};

exports.getCurrentWeather = function (callback) {
  var o = {temp:{}};
  climate.readTemperature(function (err, tempC) {
    if (err) {
      o.err = err;
      callback(o);
      return this;
    }
    o.temp.c = tempC;
    climate.readTemperature(function (err, tempF) {
      if (err) {
        o.err = err;
        callback(o);
        return this;
      }
      o.temp.f = tempF;
      climate.readHumidity(function (err, humid) {
        if (err) {
          o.err = err;
          callback(o);
          return this;
        }
        o.humid = humid;
        callback(o);
        return this;
      });
    });
  });
};

// ---------------------------------------------------------
//
//  HELPERS
//
// ---------------------------------------------------------
