
var matrix = [];

// stex zangvacnery verjum Arr barov

var DevilArr = [];
var grassArr = [];
var grassEaterArr = [];
var FrcharacterArr = [];
var SccharacterArr = [];
var side = 18;



function setup() {
    
    // Մատրիցի ստեղծում
    let rows = 50; // Տողերի քանակ
    let columns = 50; // Սյուների քանակ

    for (let y = 0; y < rows; y++) {
        matrix[y] = []; // Մատրիցի նոր տողի ստեղծում
        for (let x = 0; x < columns; x++) {
            let a = Math.floor(Math.random() * 100);
            if (a >= 0 && a < 20) {
                matrix[y][x] = 0; // Մատրիցի 20 տոկոսը կլինի 0
            }
            if (a >= 20 && a < 40) {
                matrix[y][x] = 1; // Մատրիցի 20 տոկոսը կլինի 1
            }
            else if (a >= 40 && a < 50) {
                matrix[y][x] = 2; // Մատրիցի 10 տոկոսը կլինի 2
            }
            else if (a >= 50 && a < 70) {
                matrix[y][x] = 3; // Մատրիցի 20 տոկոսը կլինի 3
            }
            else if (a >= 70 && a < 100) {
                matrix[y][x] = 4; // Մատրիցի 20 տոկոսը կլինի 4
            }
            else if (a >= 90 && a < 100) {
                matrix[y][x] = 5; // Մատրիցի 10 տոկոսը կլինի 5
          }
        }
    }

    frameRate(8);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    //pttvum em matrix mejov u stexcum em object

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var dv = new Devil(x, y, 3);
                DevilArr.push(dv);

            }
            else if (matrix[y][x] == 4) {
                var mn = new Frcharacter(x, y, 4);
                FrcharacterArr.push(mn);

            }
            else if (matrix[y][x] == 5) {
                var se = new Sccharacter(x, y, 5);
                SccharacterArr.push(se);

        }
    }
    }
}
//draw uxaki nerkuma
function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("white");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
        }
    }

    //kanchum em methodnery
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();

    }

    for (var i in DevilArr) {
        DevilArr[i].move();
        DevilArr[i].eat();
        DevilArr[i].die();
        DevilArr[i].mul();
    }

    for (var i in FrcharacterArr) {
        FrcharacterArr[i].mul();
        FrcharacterArr[i].eat();
        FrcharacterArr[i].die();
 }
 for (var i in SccharacterArr) {
    SccharacterArr[i].move();
    SccharacterArr[i].mul();
    SccharacterArr[i].eat();
    SccharacterArr[i].die();
}

}
