var tessel = require('tessel');
var ambientLib = require('ambient-attx4');
var ambient;

var MODULE_NAME = 'ambient';

// ---------------------------------------------------------
//
//  EXPOSED METHODS
//
// ---------------------------------------------------------

exports.init = function (port, callback) {
  ambient = ambientLib.use(tessel.port[port]);
  ambient.on('ready', function () {
    callback(MODULE_NAME);
  });
};

exports.getAmbience = function (callback) {
  var o = {};
  ambient.getLightLevel(function (err, lightData) {
    if (err) {
      o.err = err;
      callback(o);
      return this;
    }
    o.light = lightData;
    ambient.getSoundLevel(function (err, soundData) {
      if (err) {
        o.err = err;
        callback(o);
        return this;
      }
      o.sound = soundData;
      callback(o);
      return this;
    });
  });
};
