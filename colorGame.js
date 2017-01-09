var NUM_SQUARE = 3; 
var aColors = []; 
var easyMode = true;
var iPickedSquare;
var defaultColor = "#232323";
var lSquares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message"); 
var banner = document.querySelector("h1") ; 

function getRandomColor() {
    var sColor = "#";
    for (c = 0; c < 3; c++) {
        sColor += ("0" + (Math.random()*256|0).toString(16)).substr(-2);
    }
    return sColor; 
}

function getColorArray() {
    var aColors = new Array(NUM_SQUARE); 
    for (var i = 0; i < aColors.length; i++) {
        aColors[i] = getRandomColor(); 
    }
    return aColors; 
}

function paintSquares() {
    aColors = getColorArray();
    for (var i = 0; i<lSquares.length; i++) {
        if(aColors[i]){
            lSquares[i].style.background = aColors[i];
        } else {
            lSquares[i].style.display = "none";
        }
    }
} 

function pickRandomSquare() {
    var iIndex = Math.random() * NUM_SQUARE | 0; 
    var sColor = aColors[iIndex];
    var rgb = document.querySelectorAll("#rgb"); 
    rgb[0].textContent = parseInt(sColor.substring(1,3), 16) + ",";
    rgb[1].textContent = parseInt(sColor.substring(3,5), 16) + ",";
    rgb[2].textContent = parseInt(sColor.substring(5,7), 16);
    return iIndex; 
}

function startGame() {
    if (!easyMode) {
        NUM_SQUARE = 6; 
    } else {
        NUM_SQUARE = 3;
    }
    messageDisplay.textContent = "";
    banner.style.background = "lightblue";
    paintSquares(); 
    iPickedSquare = pickRandomSquare();
}

function findCorrectSquare(e) {
    if (e.target && e.target.nodeName == "DIV") {
        e.preventDefault();
        if (e.target == lSquares[iPickedSquare]) {
            for (var i = 0; i<NUM_SQUARE; i++) {
                lSquares[i].style.background = aColors[iPickedSquare];
            }
            banner.style.background = aColors[iPickedSquare];
            messageDisplay.textContent = "Bingo!"; 
        } else {
            e.target.style.display = defaultColor;
            messageDisplay.textContent = "Try Again";
        }
    }
}

startGame(); 

document.querySelector(".container").addEventListener("click", findCorrectSquare);
document.querySelector("#newcolors").addEventListener("click", startGame); 
document.querySelector("#easy").addEventListener("click", function(){
    easyMode = true;
    startGame(); 
});
document.querySelector("#hard").addEventListener("click", function(){
    easyMode = false; 
    startGame();
});


