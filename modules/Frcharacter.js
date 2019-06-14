
var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Frcharacter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
        this.index = 3;
    }
    getNewCoordinates(){
        this.directions = [ 
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2], 
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

   
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        
        var newCell = this.chooseCell(3);
        var newCell1 = this.chooseCell(1);
        var merge = random(newCell.concat(newCell1))

          if(merge) {
              var newX = merge[0];
              var newY = merge[1];

              matrix[this.y][this.x] = 0;
              matrix[newY][newX] = this.index;

              for (var i in DevilArr) {
                            if (newX == DevilArr[i].x && newY == DevilArr[i].y) {
                                 DevilArr.splice(i, 1);
                                break;
                            }
                         }

            for (var i in grassArr) {
                            if (newX == grassArr[i].x && newY == grassArr[i].y) {
                                 grassArr.splice(i, 1);
                                break;
                            }
                         } 


           this.y = newY;
           this.x = newX;
           this.energy += 2;             
                         
            
          }
    }





    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 18 && newCell) {
            var newFrcharacter = new Frcharacter(newCell[0], newCell[1], 4);
            FrcharacterArr.push(newFrcharacter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 15;
        }
    }


die() {

    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0;
        for (var i in FrcharacterArr) {
            if (this.x == FrcharacterArr[i].x && this.y == FrcharacterArr[i].y){
                FrcharacterArr.splice(i, 1);
            break;
            }
        }
    }
}
}