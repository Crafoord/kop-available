var Gpio = require("onoff").Gpio;
var PIR = new Gpio(17, "in", "both");
var URL = require("./secrets.js").URL;
var io = require("socket.io-client");

const exit = () => {
  // Unexport GPIO to free resources
  PIR.unexport();
  process.exit();
};

const start = () => {
  var socket = io.connect(URL);
  socket.on("available", message => {
    console.log(message);
  });

  console.log("Started!");
  PIR.watch((err, value) => {
    if (err) exit();
    if (value === 1) {
      socket.emit("available", false);
      console.log(new Date().toTimeString(), "Someone is playing! ");
    } else {
      socket.emit("available", true);
      console.log(new Date().toTimeString(), "Ping pong is available!");
    }
  });
};

start();
