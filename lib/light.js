'use strict';

var Gpio = require('onoff').Gpio;
var led = new Gpio(17, 'out');
var button = new Gpio(18, 'in', 'falling', { debounceTimeout: 10 });

// button.watch((err, value) => {
//   if (err) {
//     throw err;
//   }

//   led.writeSync(value);
// });

// process.on('SIGINT', _ => {
//   led.unexport();
//   button.unexport();
// });


exports.turnOn = function () {
    led.writeSync(1);
};

exports.turnOff = function () {
    led.writeSync(0);
};

exports.blink = function (duration) {
    // Toggle the state of the LED connected to GPIO17 every 200ms
    var iv = setInterval(function (_) {
        return led.writeSync(led.readSync() ^ 1);
    }, 200);

    // Stop blinking the LED after 5 seconds
    setTimeout(function (_) {
        clearInterval(iv); // Stop blinking
        led.unexport(); // Unexport GPIO and free resources
    }, duration);
};

exports.readButton = function (_) {
    var led = new Gpio(17, 'out');
    var button = new Gpio(18, 'in', 'falling', { debounceTimeout: 10 });
    console.log("Begin reading...");
    var ledState = 0;

    button.watch(function (err, value) {
        ledState = ledState ^ 1;
        console.log('Light:', ledState);
        if (err) {
            throw err;
        }
        led.writeSync(ledState);
    });

    process.on('SIGINT', function (_) {
        led.unexport();
        button.unexport();
    });
};

exports.stopReadingButton = function (_) {
    button.unexport();
};