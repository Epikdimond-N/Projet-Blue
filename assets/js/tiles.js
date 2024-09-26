export class Tiles{
    constructor(x, y, appear = false, value = 0, type = null){
        this.element = type;
        this.value = value
        this.new = appear
        this.x = x
        this.y = y
    }

    UsePower(){
        switch(this.element){
            case "flame":
                this.UseFire();
                break;
            case "water":
                this.UseWater();
                break;
            case "earth":
                this.UseEarth();
                break;
            case "wind":
                this.UseWind();
                break;
        }

    }

    UseFire(){

    }

    UseWater(){

    }

    UseEarth(){

    }

    UseWind(){

    }
}