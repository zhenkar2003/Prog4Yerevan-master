var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Devil extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
        this.index = 3;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }



    eat() {


        var newCell = random(this.chooseCell(2));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 3;

        }
    }


   
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newDevil = new Devil(newCell[0], newCell[1], this.index);
            DevilArr.push(newDevil);
            matrix[newCell[1]][newCell[0]] = 3;
            this.energy = 5;
        }
    }


    die() {

        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in DevilArr) {
                if (this.x == DevilArr[i].x && this.y == DevilArr[i].y){
                    DevilArr.splice(i, 1);
                break;
                }
            }
        }
    }
}
