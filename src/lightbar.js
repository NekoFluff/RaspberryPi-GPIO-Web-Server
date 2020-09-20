const Gpio = require('onoff').Gpio;
var gpios = [];

var gpioNums = [17, 21, 20, 16, 12, 25, 24, 23, 26, 19];

gpioNums.forEach((item, index) => {
    gpios[index] = new Gpio(item, 'out');
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const waterfall = (index, duration) => {
    let gpio = gpios[index];
    gpio.writeSync(0);
    sleep(500)
        .then(() => {
            gpio.writeSync(1);
            if (index + 1 < gpios.length)
                waterfall(index + 1)
        })
}

const waterfall2 = async (index, duration, onComplete) => {
    let gpio = gpios[index];
    gpio.writeSync(0);
    await sleep(duration)
    gpio.writeSync(1);

    if (index - 1 >= 0)
        await waterfall2(index - 1, duration, onComplete)
    else
        onComplete();
}

exports.waterfall = waterfall;

async function waterfallRepeat() {
    waterfall(0);

    await waterfall2(9, 500, () => {
        console.log('waterfall 2 end');
    })
    waterfallRepeat();
}

waterfallRepeat();
