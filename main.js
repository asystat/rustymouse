'use strict';
const ioHook = require('iohook');
const Weapon = require('./weapon.js');

const Mouse = require('./arduino_mouse.js');



let wp_python = new Weapon("python", "semiautomatic", [[0,113]], (72/113), 0); 
let wp_ak = new Weapon("AK47", "automatic", [[-2,11], [-4,11], [-11,11], [-7,11],[-10,10],[0,3], [10,3], [3,5], [10,7], [10,4],[10,4], [8,6], [5,5], [0,5]], 2, 124);
let weapon = wp_python;



const { exec } = require('child_process');

var rustymouse_activated = false;
var rustymouse_activation_time = 100n;

var lup = true;
var rup = true;
var mouseMovement;
var weaponTimer = null;
var mousePos = [0,0]

ioHook.on("mousemove", event => {
  console.log(event);
  mousePos = [event.x, event.y];
});

ioHook.on("keydown", event => {
    //console.log(event);
    if(event.rawcode == 192){ //toggle rustymouse activation
      rustymouse_activated = !rustymouse_activated;
      rustymouse_activation_time = process.hrtime.bigint();
      console.log(`Rustymouse ${rustymouse_activated?'ENABLED':'DISABLED'}`);
    }

    if(process.hrtime.bigint() - rustymouse_activation_time < 1000000000n){
      if(event.rawcode == 49){// 1
        weapon = wp_python;
        rustymouse_activated = true;
      }else if(event.rawcode == 50){// 2
        weapon = wp_ak;
        rustymouse_activated = true;
      } 
    }


  });

  ioHook.on("mousedown", event => {
    console.log(event);

    
    if(event.button == 1 && rustymouse_activated){

      handleRecoil(true);

    }else  if(event.button == 2){
        rup = false;
    }

  });

  ioHook.on("mouseup", event => {
    console.log(event);
    if(event.button == 1){
      lup = true;
      clearTimeout(weaponTimer);
    }
    else if(event.button == 2){
      rup = true;
    }
  });


  ioHook.on("mouseclick", event => {
    console.log(event);
  });

  function handleRecoil(firstCall = false){
    
    console.log(`handleRecoil called. First call for automatic weapon: ${firstCall}`);

    mouseMovement = [0,0];
      mouseMovement = weapon.nextStep(firstCall, !rup);
      lup = false;


      console.log(mouseMovement);
      console.log(`Moving weapon in step ${weapon.step}`);

      if(!!mouseMovement){
          console.log(`mouse will move to [${mousePos[0]}, ${mousePos[1]}] + [${mouseMovement[0]} ${mouseMovement[1]}]`);
          //mouseMovement[0] += event.x;
          //mouseMovement[1] += event.y;
          Mouse.sendMouseDelta(mouseMovement[0],mouseMovement[1]);
      }

      if(weapon.type == "automatic" && !weapon.stop){
        console.log(`weapon is automatic. calling handlerecoil again in ${weapon.interval} millis`);
        weaponTimer = setTimeout(handleRecoil, weapon.interval);
      }

  }

  
//Register and stark hook 
ioHook.start();

