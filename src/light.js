const Gpio = require('onoff').Gpio;
let led = new Gpio(17, 'out');
let button = new Gpio(18, 'in', 'falling', { debounceTimeout: 10 });

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


exports.turnOn = () => {
    led.writeSync(1);
}

exports.turnOff = () => {
    led.writeSync(0);
}

exports.blink = (duration) => {
    // Toggle the state of the LED connected to GPIO17 every 200ms
    const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 200);

    // Stop blinking the LED after 5 seconds
    setTimeout(_ => {
        clearInterval(iv); // Stop blinking
        led.unexport();    // Unexport GPIO and free resources
    }, duration);
}

exports.readButton = _ => {
    let led = new Gpio(17, 'out');
    let button = new Gpio(18, 'in', 'falling', { debounceTimeout: 10 });
    console.log("Begin reading...");
    let ledState = 0;

    button.watch((err, value) => {
        ledState = ledState ^ 1
        console.log('Light:', ledState)
        if (err) {
            throw err;
        }
        led.writeSync(ledState);
    })

    process.on('SIGINT', _ => {
        led.unexport();
        button.unexport();
    })
}

exports.stopReadingButton = _ => {
    button.unexport();
}
