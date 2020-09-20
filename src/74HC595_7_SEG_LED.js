
// NOTE: You have to push and hold the button
const Gpio = require('pigpio').Gpio;

const LSBFIRST = 1;
const MSBFIRST = 2;
const numbers = [0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90, 0x88, 0x83, 0xc6, 0xa1, 0x86, 0x8e];

// serial data input
const ds = new Gpio(22, { mode: Gpio.OUTPUT });

// st_cp (parallel update output)
const st_cp = new Gpio(27, { mode: Gpio.OUTPUT });

// sh_cp (serial shift clock)
const sh_cp = new Gpio(17, { mode: Gpio.OUTPUT });

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function shiftOut(order, val) {
    for (let i = 0; i < 8; i++) {
        let temp = val;
        sh_cp.digitalWrite(0);
        if (order == LSBFIRST) {
            ds.digitalWrite((0x1 & (temp >> i)) == 0x01 ? 1 : 0);
            console.log('lsb',
                temp,
                (0x1 & (temp >> i)) == 0x01 ? 1 : 0,
                (0x1 & (temp >> i)) == 0x01 ? 1 : 0);
        } else if (order == MSBFIRST) {
            ds.digitalWrite((0x80 & (temp << i)) == 0x80 ? 1 : 0); // 0 or 1 for pin current pin e.g. Q0...
            console.log('msb');
        }

        sh_cp.digitalWrite(1); // Move from Q0 -> Q1 -> Q2....
    }
}

async function loop() {
    while (true) {
        for (let i = 0; i < numbers.length; i++) {
            console.log(numbers[i])
            st_cp.digitalWrite(0);
            await shiftOut(LSBFIRST, 0x10);
            st_cp.digitalWrite(1); // Update all lights
            await sleep(500)
        }
    }
}

loop()
