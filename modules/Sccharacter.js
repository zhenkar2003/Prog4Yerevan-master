var LiveForm = require("./LiveForm");
var random = require("./random");

module.exports = class Sccharacter extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.energy = 5;
        this.index = 2
    }
    getNewCoordinates(){
        this.directions = [ 
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 1],
            [this.x + 1, this.y + 1],
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

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 28 && newCell) {
            var newSccharacter = new Sccharacter(newCell[0], newCell[1], this.index);
            SccharacterArr.push(newSccharacter);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 25;
        }
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
        
    var newCell = this.chooseCell(4);
    var newCell1 = this.chooseCell(1);
    var mix = random(newCell.concat(newCell1))

      if(mix) {
          var newX = mix[0];
          var newY = mix[1];

          matrix[this.y][this.x] = 0;
          matrix[newY][newX] = this.index;

          for (var i in FrcharacterArr) {
                        if (newX == FrcharacterArr[i].x && newY == FrcharacterArr[i].y) {
                            FrcharacterArr.splice(i, 1);
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



die() {

    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0;
        for (var i in SccharacterArr) {
            if (this.x == SccharacterArr[i].x && this.y == SccharacterArr[i].y){
                SccharacterArr.splice(i, 1);
            break;
            }
        }
    }
}
}