var Gpio = require("onoff").Gpio;
var PIR = new Gpio(17, "in", "both");

const exit = () => {
  // Unexport GPIO to free resources
  PIR.unexport();
  process.exit();
};

const start = () => {
  PIR.watch((err, value) => {
    if (err) exit();
    if (value === 1) {
      blinkLED();
      console.log(new Date().toTimeString(), "Someone is playing! ");
    } else {
      endBlink();
      console.log(new Date().toTimeString(), "Ping pong is available!");
    }
  });
};

start();
