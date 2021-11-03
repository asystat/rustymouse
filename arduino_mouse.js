const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM7', { baudRate: 19200 });``
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});
parser.on('data', data =>{
  console.log('got word from arduino:', data);
});


// 1 = y+1, 2=y-1, 3=x+1. 4=x-1;
module.exports = {
    sendMouseDelta: (x, y) => {
      
      let xMovementChar = '3';
      let yMovementChar = '1';
      if(x < 0){
        xMovementChar = '4';
      }
      if(y < 0){
        yMovementChar = '2';
      }
      
      let sendBufferY = ('' + yMovementChar).repeat(Math.abs(y));
      let sendBufferX = ('' + xMovementChar).repeat(Math.abs(x));

        port.write(sendBufferX+sendBufferY, (err) => {
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            console.log('message written');
          });
    }
}