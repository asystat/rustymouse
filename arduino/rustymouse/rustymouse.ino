#include <Mouse.h>  

int incomingByte = 0;
const int speed = 1;
// 1 = y+1, 2=y-1, 3=x+1. 4=x-1;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(19200); // opens serial port, sets data rate to 9600 bps
  // Mouse.begin();
}

void loop() {
  
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read() - '0';
    // say what you got:
    //Serial.print("I received: ");
    //Serial.println(incomingByte, DEC);


    if(incomingByte == 1){ //move mouse down
          controlRecoil(0, 1);
    }
    else if(incomingByte == 2){ //move mouse up
          controlRecoil(0, -1);
    }
    if(incomingByte == 3){ //move mouse right
          controlRecoil(1, 0);
    }
    if(incomingByte == 4){ //move mouse left
          controlRecoil(-1, 0);
    }
  }
  
}

int bufferX = 0;
int bufferY = 0;
void controlRecoil(int xDelta, int yDelta) {
    bufferX += xDelta;
    bufferY += yDelta;
    if(abs(bufferX) >= speed || abs(bufferY) >= speed){
      Mouse.move(xDelta, yDelta, 0);
      bufferX = 0;
      bufferY = 0;
    }
}
