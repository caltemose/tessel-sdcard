var tessel = require('tessel');


var sdcardlib = require('sdcard');

var sdcard = sdcardlib.use(tessel.port['B']);

sdcard.on('ready', function() {
  sdcard.getFilesystems(function(err, fss) {
    var fs = fss[0];

    // console.log('Writing...');
    // fs.writeFile('someFile2.txt', 'Hey Tessel SDCard!2', function(err) {
    //   console.log('Write complete. Reading...');
    //   fs.readFile('someFile2.txt', function(err, data) {
    //     console.log('Read:\n', data.toString());
    //   });
    // });
    
    fs.readdir('/', function (err, files) {
      if (err)
        console.log(err);
      if (files)
        console.log(files);
    });
    
  });
});
