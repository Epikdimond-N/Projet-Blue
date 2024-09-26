export class Tiles{
    constructor(x, y, appear = false, value = 0, type = null){
        this.element = type;
        this.value = value
        this.new = appear
        this.x = x
        this.y = y
    }

    UsePower(tileSelected){
        switch(this.element){
            case "flame":
                this.UseFire(tileSelected);
                break;
            case "water":
                this.UseWater(tileSelected);
                break;
            case "earth":
                this.UseEarth(tileSelected);
                break;
            case "wind":
                this.UseWind(tileSelected);
                break;
        }
        this.element = null

    }

    UseFire(tileSelected){
        tileSelected.value = 0
        tileSelected.element = null
    }

    UseWater(tileSelected){
        [this.x, tileSelected.x] = [tileSelected.x, this.x];
        [this.y, tileSelected.y] = [tileSelected.y, this.y];
    }

    UseEarth(tileSelected){
        if (tileSelected){
            this.value *= 2
        }else {
            this.value /= 2
        }
    }

    UseWind(tileSelected){
        [this.x, tileSelected.x] = [tileSelected.x, this.x];
        [this.y, tileSelected.y] = [tileSelected.y, this.y];
    }
}