var Gpio = require("onoff").Gpio;
var PIR = new Gpio(17, "in", "both");
var LED = new Gpio(4, "out");
let blinkInterval;

start();

const start = () => {
  PIR.watch((err, value) => {
    if (err) exit();
    alarm();
    console.log("Intruder detected");
    console.log(value);
  });
};

const alarm = () => {
  this.blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms
  setTimeout(endBlink, 5000); //stop blinking after 5 seconds
};

const blinkLED = () => {
  if (LED.readSync() === 0) {
    //check the pin state, if the state is 0 (or off)
    LED.writeSync(1); //set pin state to 1 (turn LED on)
  } else {
    LED.writeSync(0); //set pin state to 0 (turn LED off)
  }
};

const endBlink = () => {
  //function to stop blinking
  clearInterval(blinkInterval); // Stop blink intervals
  LED.writeSync(0); // Turn LED off
};

const exit = () => {
  // Unexport GPIO to free resources
  LED.unexport();
  PIR.unexport();
  process.exit();
};
