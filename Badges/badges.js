// install by  		npm install serialport
//https://www.npmjs.org/package/serialport


var SerialPort = require("serialport").SerialPort 
var serialPort = new SerialPort("/dev/tty-usbserial1", {	//path to serial, computer dependent
  baudrate: 9600		// find correct baudrate, not sure
});

serialPort.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
  	// open serial stream
       console.log('open');
      serialPort.on('data', function(data) {
      console.log('data received: ' + data);
    });
    // write to serial
    // TEST code, use devstatus instead. Not sure if port has to be opened every time or just once.
    serialPort.write("OMG IT WORKS\r");
    });
  }
});

// device = device ID, status = live/dead
function devstatus(device, status)
{
if(status)
serialPort.write("send "+ device +" -l 7\r"); // lights :)
else
serialPort.write("send "+ device +" -l 8\r"); // lights off!
}