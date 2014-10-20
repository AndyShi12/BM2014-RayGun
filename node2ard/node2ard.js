var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SerialPort = require("serialport").SerialPort 
http.listen(3000, function(){
  console.log('listening on *:3000');
});

var serialPort = new SerialPort("/dev/tty.usbmodem1421", {	//path to serial, computer dependent
  baudrate: 9600		// find correct baudrate, not sure
});

function devstatus(device, status)
{
  console.log(device, status);
  if(status) {
    serialPort.write("send "+ device +" -l 7\r", function() {
      serialPort.drain(function(e) {})
    }); // lights :)
} else {
    serialPort.write("send "+ device +" -l 8\r", function() { // lights off!
      serialPort.drain(function(e) {})
    }); // lights :)
  }
}

    serialPort.open(function (error) {
      if ( error ) {
        console.log('failed to open: '+error);
        exit();
      } else {
      }
    });


io.on('connection', function(socket){
  socket.on('send signal', function(data) {
    console.log(data);
    devstatus(data.id, data.status);
  })
});
