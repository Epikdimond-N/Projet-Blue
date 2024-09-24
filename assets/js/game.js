//Class du jeu

import {Tiles} from "./tiles.js";
import {Elements} from "./elements.js";

export class Game{

    constructor(mode = "normal", time = null){
        this.Score = 0;
        this.Mode = mode;
        this.Grid = this.CreateGrill()
        this.RandomTiles();
        this.RandomTiles();
        this.Time = time;
    }

    CreateGrill() {
        return [...Array(4)].map((_, x) => Array(4).fill(null).map((_, y) => new Tiles(x, y)));
    }

    RandomTiles(){
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        console.log(x,y);
        if(this.Mode === "element"){
            console.log("element")
            this.Grid[x][y].value === 0 ? this.Grid[x][y].value = (Math.random() < 0.17) ? 4 : 2 : this.RandomTiles();
            if (Math.random() <= 0.02) {
                this.Grid[x][y].element(new Elements("fire"));
            }else if(Math.random() <= 0.04) {
                this.Grid[x][y].element(new Elements("water"));
            }else if(Math.random() <= 0.06){
                this.Grid[x][y].element(new Elements("earth"));
            }else if(Math.random() <= 0.08){
                this.Grid[x][y].element(new Elements("air"));
            }
        }else if(this.Mode === "reverse"){
            console.log("reverse")
            this.Grid[x][y].value === 0 ? this.Grid[x][y].value = (Math.random() < 0.17) ? 65536 : 131072 : this.RandomTiles();
        }else{
            if (this.Grid[x][y].value === 0){
                this.Grid[x][y].value = (Math.random() < 0.17) ? 4 : 2;
            }else{
                this.RandomTiles()
            }
        }
    }

    move(direction) {
        let moved = false;

        switch (direction) {
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
        }

        if (moved) {
            this.RandomTiles();
        }

        return moved
    }

    SetScore(score){
        this.Score = score;
    }

    SetMode(mode){
        this.Mode = mode;
    }

    SetTime(time){
        this.Time = time;
    }

    moveUp(){
        console.log(this.Grid)
        return false
    }

    moveDown(){

    }

    moveLeft(){

    }

    moveRight(){

    }

}


