var Bleacon = require("Bleacon");
Bleacon.startScanning();
Bleacon.on('discover', function(bleacon) {
    console.log(bleacon);
});
