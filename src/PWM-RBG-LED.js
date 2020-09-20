const Gpio = require('pigpio').Gpio;

const b = new Gpio(16, { mode: Gpio.OUTPUT });
const r = new Gpio(20, { mode: Gpio.OUTPUT });
const g = new Gpio(26, { mode: Gpio.OUTPUT });

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

setInterval(() => {
    let blueDutyCycle = getRandomInt(255);
    let redDutyCycle = getRandomInt(255);
    let greenDutyCycle = getRandomInt(255);

    b.pwmWrite(blueDutyCycle);
    r.pwmWrite(redDutyCycle);
    g.pwmWrite(greenDutyCycle);

    console.log(redDutyCycle, greenDutyCycle, blueDutyCycle)

}, 1000);

// process.on('SIGINT', _ => {
//     r.unexport();
//     g.unexport();
//     b.unexport();
// })