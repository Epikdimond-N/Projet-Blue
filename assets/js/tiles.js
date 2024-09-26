import {lstTilesEvenListeners} from "./main.js";

export class Tiles{
    constructor(x, y, appear = false, value = 0, type = null){
        this.element = type;
        this.value = value
        this.new = appear
        this.x = x
        this.y = y
    }

    UsePower(tileSelected = null ){
       if (!lstTilesEvenListeners.includes(this)) return


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

    }

    UseFire(tileSelected){
        tileSelected.value = 0
        tileSelected.element = null
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).remove();
        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.remove(`${this.element}-cell`);
        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.add("tile");
        this.element = null
    }

    UseWater(tileSelected){
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).classList.remove(`tile-${tileSelected.value}`)
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).classList.add(`tile-${this.value}`)
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).innerHTML = `<div class="tile-inner">${this.value}</div>`

        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).classList.remove(`${tileSelected.element}-cell`);
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).classList.add("tile");


        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.remove(`${this.element}-cell`);
        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.add("tile");

        if (tileSelected.element){
            document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.add(`${tileSelected.element}-cell`);
            document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.remove(`tile`)
        }

        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.remove(`tile-${this.value}`)
        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.add(`tile-${tileSelected.value}`)
        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).innerHTML = `<div class="tile-inner">${tileSelected.value}</div>`;

        [this.value, tileSelected.value] = [tileSelected.value, this.value];
        this.element = tileSelected.element
        tileSelected.element = null;
    }

    UseEarth(tileSelected){
        tileSelected.value *= 2
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).classList.remove(`tile-${tileSelected.value / 2}`)
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).classList.add(`tile-${tileSelected.value}`)
        document.querySelector(`.tile-position-${tileSelected.x + 1}-${tileSelected.y + 1}`).innerHTML = `<div class="tile-inner">${tileSelected.value}</div>`

        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.remove(`${this.element}-cell`);
        document.querySelector(`.tile-position-${this.x + 1}-${this.y + 1}`).classList.add("tile");
        this.element = null


    }

    UseWind(tileSelected){
        [this.x, tileSelected.x] = [tileSelected.x, this.x];
        [this.y, tileSelected.y] = [tileSelected.y, this.y];
    }
}