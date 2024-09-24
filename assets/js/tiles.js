import {Elements} from "./elements.js";

export class Tiles{
    constructor(x, y,type = null, value = 0){
        this.element = new Elements(type);
        this.value = value
        this.x = x
        this.y = y
    }

    UsePower(){
        try {
            this.element.UsePower()
        }catch (e){
            console.log(e)
        }
    }
}