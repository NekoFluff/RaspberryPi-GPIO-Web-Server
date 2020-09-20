'use strict';

var Gpio = require('pigpio').Gpio;

var b = new Gpio(16, { mode: Gpio.OUTPUT });
var r = new Gpio(20, { mode: Gpio.OUTPUT });
var g = new Gpio(26, { mode: Gpio.OUTPUT });

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

setInterval(function () {
    var blueDutyCycle = getRandomInt(255);
    var redDutyCycle = getRandomInt(255);
    var greenDutyCycle = getRandomInt(255);

    b.pwmWrite(blueDutyCycle);
    r.pwmWrite(redDutyCycle);
    g.pwmWrite(greenDutyCycle);

    console.log(redDutyCycle, greenDutyCycle, blueDutyCycle);
}, 1000);

// process.on('SIGINT', _ => {
//     r.unexport();
//     g.unexport();
//     b.unexport();
// })