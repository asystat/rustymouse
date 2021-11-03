'use strict';
const ioHook = require('iohook');
const Weapon = require('./weapon.js');

const Mouse = require('./arduino_mouse.js');


let python = new Weapon("python", "single", [[0,113]]);

const { exec } = require('child_process');

var rustymouse_activated = false;
var up = true;
var mouseMovement;

ioHook.on("mousemove", event => {
  //console.log(event);
  // result: {type: 'mousemove',x: 700,y: 400}
});
ioHook.on("keydown", event => {
    //console.log(event);
    if(event.rawcode == 192){
      rustymouse_activated = !rustymouse_activated;
      console.log(`Rustymouse ${rustymouse_activated?'ENABLED':'DISABLED'}`);
    }
    // result: {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
  });

  ioHook.on("mousedown", event => {
    console.log(event);

    
    if(event.button == 1 && rustymouse_activated){

      mouseMovement = [0,0];
      if(up){
          mouseMovement = python.nextStep(true);
          up = false;
      }else{
          mouseMovement = python.nextStep(false);
      }

      console.log(mouseMovement);
      

      if(!!mouseMovement){
          console.log(`mouse will move to [${event.x}, ${event.y}] + [${mouseMovement[0]} ${mouseMovement[1]}]`);
          //mouseMovement[0] += event.x;
          //mouseMovement[1] += event.y;
          Mouse.sendMouseDelta(mouseMovement[0],mouseMovement[1]);
          
      }
    }
    // result: {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}`
  });

  ioHook.on("mouseup", event => {
    console.log(event);
    // result: {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}
    mouseMovement = [0,0];
    up = true;
  });


  ioHook.on("mouseclick", event => {
    console.log(event);
    // result: {keychar: 'f', keycode: 19, rawcode: 15, type: 'keypress'}

    up = true;
  });

  
//Register and stark hook 
ioHook.start();

