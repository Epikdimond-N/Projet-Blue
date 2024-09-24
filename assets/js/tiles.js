import {Elements} from "./elements.js";

export class Tiles{
    constructor(x, y, value = 0, type = null){
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