var tessel = require('tessel');
var sdcardlib = require('sdcard');
var sdcard;

var MODULE_NAME = 'sdcard';


// ---------------------------------------------------------
//
//  EXPOSED METHODS
//
// ---------------------------------------------------------

exports.init = function (port, callback) {
  sdcard = sdcardlib.use(tessel.port[port]);
  registerReadyListener(callback);
};

exports.writeLog = function (msg, callback) {
  sdcard.getFilesystems(function (err, fss) {
    var fs = fss[0];
    var filename = 'logger.txt';
    fs.appendFile(filename, msg, function (err) {
      if (err)
        callback({err:err})
      else
        callback({success:true, file:filename});
    });
  });
};


// ---------------------------------------------------------
//
//  HELPERS
//
// ---------------------------------------------------------

var registerReadyListener = function (callback) {
  sdcard.on('ready', function () {
    callback(MODULE_NAME);
  });
};



// sdcard.on('ready', function() {
//   sdcard.getFilesystems(function(err, fss) {
//     var fs = fss[0];

//     // console.log('Writing...');
//     // fs.writeFile('someFile2.txt', 'Hey Tessel SDCard!2', function(err) {
//     //   console.log('Write complete. Reading...');
//     //   fs.readFile('someFile2.txt', function(err, data) {
//     //     console.log('Read:\n', data.toString());
//     //   });
//     // });
    
//     fs.readdir('/', function (err, files) {
//       if (err)
//         console.log(err);
//       if (files)
//         console.log(files);
//     });
    
//   });
// });