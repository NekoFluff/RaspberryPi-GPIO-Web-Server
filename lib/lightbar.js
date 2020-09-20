'use strict';

var Gpio = require('onoff').Gpio;
var gpios = [];

var gpioNums = [17, 21, 20, 16, 12, 25, 24, 23, 26, 19];

gpioNums.forEach(function (item, index) {
    gpios[index] = new Gpio(item, 'out');
});

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

var waterfall = function waterfall(index, duration) {
    var gpio = gpios[index];
    gpio.writeSync(0);
    sleep(500).then(function () {
        gpio.writeSync(1);
        if (index + 1 < gpios.length) waterfall(index + 1);
    });
};

var waterfall2 = async function waterfall2(index, duration, onComplete) {
    var gpio = gpios[index];
    gpio.writeSync(0);
    await sleep(duration);
    gpio.writeSync(1);

    if (index - 1 >= 0) await waterfall2(index - 1, duration, onComplete);else onComplete();
};

exports.waterfall = waterfall;

async function waterfallRepeat() {
    waterfall(0);

    await waterfall2(9, 500, function () {
        console.log('waterfall 2 end');
    });
    waterfallRepeat();
}

waterfallRepeat();