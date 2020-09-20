'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var i2c = require('i2c-bus');

var ADS7830 = exports.ADS7830 = function () {
    function ADS7830() {
        _classCallCheck(this, ADS7830);

        this.cmd = 0x84;
        this.address = 0x4b; // 0x4b is the default i2c address for ADS7830 Module.   
        this.i2c1 = i2c.openSync(1);
    }

    _createClass(ADS7830, [{
        key: 'analogRead',
        value: function analogRead(chn) {
            //# ADS7830 has 8 ADC input pins, chn:0,1,2,3,4,5,6,7
            var rawData = this.i2c1.readByteSync(this.address, this.cmd | ((chn << 2 | chn >> 1) & 0x07) << 4);
            return rawData;
        }
    }, {
        key: 'close',
        value: function close() {
            this.i2c1.closeSync();
        }
    }]);

    return ADS7830;
}();