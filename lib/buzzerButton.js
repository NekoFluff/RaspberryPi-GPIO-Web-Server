'use strict';

var Gpio = require('pigpio').Gpio;

var buzzer = new Gpio(17, { mode: Gpio.OUTPUT });
var button = new Gpio(18, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
});

function sleep(ms) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
    });
}

button.on('interrupt', async function (level) {
    buzzer.pwmWrite(50);
    console.log('Button Press:', level);
    // buzzer.digitalWrite(level == 1 ? 0 : 1);

    if (level == 1) return;
    for (var i = 0; i < 361; i++) {
        var sinVal = Math.sin(i * (Math.PI / 180.0)); // calculate the sine value   
        var toneVal = parseInt(2000 + sinVal * 1000); // Add to the resonant frequency with a Weighted   
        // console.log('tone val', sinVal, toneVal)
        buzzer.pwmFrequency(toneVal); // Change Frequency of PWM to toneVal 
        await sleep(10);
    }

    buzzer.pwmWrite(0);
});

// setInterval(() => {
//     let blueDutyCycle = getRandomInt(255);
//     let redDutyCycle = getRandomInt(255);
//     let greenDutyCycle = getRandomInt(255);

//     b.pwmWrite(blueDutyCycle);
//     r.pwmWrite(redDutyCycle);
//     g.pwmWrite(greenDutyCycle);

//     console.log(redDutyCycle, greenDutyCycle, blueDutyCycle)

// }, 1000);