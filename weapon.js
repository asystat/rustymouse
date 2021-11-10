module.exports = class Weapon{
    constructor(name, type, pattern, aimRatio, interval){
        this.name = name;
        this.type = type;
        this.pattern = pattern;
        this.aimPattern = pattern.map((delta)=>[Math.round(delta[0]*aimRatio),Math.round(delta[1]*aimRatio)]); //aim pattern is normal pattern * ratio
        this.stop = false; //<-- needs a mouseup to start?
        this.step = 0;
        this.interval = interval;

        if(!pattern || pattern.length == 0){
            throw Error(`no pattern for weapon ${name}`);
        }     
    }




    nextStep(init = false, aiming = false){

        let patternToUse = aiming?this.aimPattern:this.pattern;

        if(init){
            this.step = 0;
            this.stop = false;
        }

        if(this.stop){
            return null;
        }

        if(this.step >= patternToUse.length){
            this.stop=true;
            return null;
        }

        var ret = [patternToUse[this.step][0], patternToUse[this.step][1]];
        this.step++;
        return ret;
        
    }

}