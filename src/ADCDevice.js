const i2c = require('i2c-bus');

export class ADS7830 {
    constructor() {
        this.cmd = 0x84
        this.address = 0x4b // 0x4b is the default i2c address for ADS7830 Module.   
        this.i2c1 = i2c.openSync(1);
    }

    analogRead(chn) { //# ADS7830 has 8 ADC input pins, chn:0,1,2,3,4,5,6,7
        const rawData = this.i2c1.readByteSync(this.address, this.cmd | (((chn << 2 | chn >> 1) & 0x07) << 4))
        return rawData
    }

    close() {
        this.i2c1.closeSync();
    }
}
