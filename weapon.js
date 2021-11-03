module.exports = class Weapon{
    constructor(name,type,pattern){
        this.name = name;
        this.type = type;
        this.pattern = pattern;
        this.stop = false; //<-- needs a mouseup to start?
        this.step = 0;

        if(! pattern || pattern.length == 0){
            throw Error(`no pattern for weapon ${name}`);
        }       
    }




    nextStep(init = false){

        if(init){
            this.step = 0;
            this.stop = false;
        }

        if(this.stop){
            return null;
        }

        if(this.step >= this.pattern.length){
            this.stop=true;
            return null;
        }

        var ret = [this.pattern[this.step][0], this.pattern[this.step][1]];
        this.step++
        return ret;
        
    }

}