#! /usr/bin/env node
 
var Bleacon = require('bleacon');
var uuid = '842AF9C408F511E39282F23C91AEC05E';
var major = 1; 
var measuredPower = -59; 
var minor = 1; // 0 - 65535
Bleacon.startAdvertising(uuid, major, minor, measuredPower);
console.log("Sending Beacon" + minor);
