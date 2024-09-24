//Class du jeu

class Game{

    constructor(mode = "normal", time = null){
        this.Score = 0;
        this.Mode = mode;
        this.Grill = this.CreateGrill()
        this.RandomTiles();
        this.RandomTiles();
        this.Time = time;
    }

    CreateGrill(){
        return [...Array(4)].map(() => Array(4).fill(new Tiles()));
    }

    RandomTiles(){
        let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4);
        if(this.Mode === "element"){
            this.Grill[x][y].value === 0 ? this.Grill[x][y].value = (Math.random() < 0.17) ? 4 : 2 : this.RandomTiles();
            if (Math.random() <= 0.02) {
                this.Grill[x][y].SetElement(new Elements("fire"));
            }else if(Math.random() <= 0.04) {
                this.Grill[x][y].SetElement(new Elements("water"));
            }else if(Math.random() <= 0.06){
                this.Grill[x][y].SetElement(new Elements("earth"));
            }else if(Math.random() <= 0.08){
                this.Grill[x][y].SetElement(new Elements("air"));
            }
        }else if(this.Mode === "reverse"){
            this.Grill[x][y].value === 0 ? this.Grill[x][y].value = (Math.random() < 0.17) ? 65536 : 131072 : this.RandomTiles();
        }else{
            this.Grill[x][y].value === 0 ? this.Grill[x][y].value = (Math.random() < 0.17) ? 4 : 2 : this.RandomTiles();
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

    }

    moveDown(){

    }

    moveLeft(){

    }

    moveRight(){

    }
}