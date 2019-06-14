
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Frcharacter = require("./modules/Frcharacter.js");
var Sccharacter = require("./modules/Sccharacter.js");
var Devil = require("./modules/Devil.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
DevilArr = [];
grassArr = [];
grassEaterArr = [];
FrcharacterArr = [];
SccharacterArr = [];
matrix = [];
grassHashiv = 0;


//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, waterArr, fireArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var Devil = new Devil(x, y);
                DevilArr.push(Devil);
                DevilHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var Frcharacter = new Frcharacter(x, y);
                FrcharacterArr.push(Frcharacter);
                FrcharacterHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var Sccharacter = new Sccharacter(x, y);
                SccharacterArr.push(Sccharacter);
                SccharacterHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (DevilArr[0] !== undefined) {
        for (var i in DevilArr) {
            DevilArr[i].eat();
        }
    }
    if (FrcharacterArr[0] !== undefined) {
        for (var i in FrcharacterArr) {
            FrcharacterArr[i].eat();
        }
    }

    if (SccharacterArr[0] !== undefined) {
        for (var i in SccharacterArr) {
            SccharacterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)

