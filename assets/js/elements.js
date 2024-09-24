class Elements{

    constructor(type = null){
        this.type = type;
    }

    UsePower(){
        switch(this.type){
            case "fire":
                this.UseFire();
                break;
            case "water":
                this.UseWater();
                break;
            case "earth":
                this.UseEarth();
                break;
            case "air":
                this.UseAir();
                break;
            default:
                throw new Error("Tile has no element");
        }
    }

    UseFire(){

    }

    UseWater(){

    }

    UseEarth(){

    }

    UseAir(){

    }
}
