var Gpio = require("onoff").Gpio;
var PIR = new Gpio(17, "in", "both");
var URL = require("./secrets.js").URL;
var socket = require("socket.io-client")(URL);

const exit = () => {
  // Unexport GPIO to free resources
  PIR.unexport();
  process.exit();
};

const start = () => {
  console.log(URL);
  socket.on("available", message => {
    console.log(message);
  });

  console.log("Started!");
  PIR.watch((err, value) => {
    if (err) exit();
    if (value === 1) {
      socket.emit("available", false);
    } else {
      socket.emit("available", true);
    }
  });
};

start();
