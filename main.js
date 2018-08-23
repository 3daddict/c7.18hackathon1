$(document).ready(initializeApp);


function initializeApp() {
    drawBoard();  
    $("td").click(clickHandler);

}

//Global Variables
var currentPlayer = 0;
// var player1Selection = [];
// var player2Selection = [];
var currentPlayerEntry = ['X', 'O'];
var winner = [];
var amountToWin = 3;
var totalAvailableSquares = null;


// Create board dynamically on the dom
function drawBoard() {
    var counter = 1;
    for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
        var row = $("<tr>")
        for (var colIndex = 0; colIndex < 3; colIndex++) {
            totalAvailableSquares++;
            var square = $("<td>").attr('id', counter++);
            square.attr('row', rowIndex);
            square.attr('col', colIndex);
            row.append(square);
        }
        $('#game').append(row);
    }
}

function clickHandler() {
    if($(this).text()!==''){
        return;
    }
    $(this).text(currentPlayerEntry[currentPlayer]); //currentPlayerEntry[] <- check with 0 or 1 for player
    if(currentPlayer === 0) {
        currentPlayer = 1;
        var selectedRow = $(this).attr('row');
        var selectedCol = $(this).attr('col');
        var selectedValue = $(this).text();
        loadAnswers[selectedRow][selectedCol] = selectedValue;
        $('#playerXName').removeClass('activePlayer');
        $('#playerOName').addClass('activePlayer');
    } else {
        currentPlayer = 0;

        var selectedRow = $(this).attr('row');
        var selectedCol = $(this).attr('col');
        var selectedValue = $(this).text();
        loadAnswers[selectedRow][selectedCol] = selectedValue;
        $('#playerXName').addClass('activePlayer');
        $('#playerOName').removeClass('activePlayer');
    }
    var selectedRow = $(this).attr('row');
    var selectedCol = $(this).attr('col');
    var selectedValue = $(this).text();
    loadAnswers[selectedRow][selectedCol] = selectedValue;
    checkRow(selectedRow, amountToWin);
    checkCol(selectedCol, amountToWin);
    if(--totalAvailableSquares===0){
        console.log('cat game')
        $('#modalDraw').modal('show');
    }
    checkDia1(selectedRow, selectedCol, amountToWin);
    checkDia2(selectedRow, selectedCol, amountToWin);


    function checkRow(row, winningCount){
        var xCount = 0;
        var oCount = 0;
        for (var i = 0; i < loadAnswers[row].length; i++) {
            if(loadAnswers[row][i] === "X"){
                xCount++;
            } else if(loadAnswers[row][i] === "O"){
                oCount++;
            }
        }
        if (xCount === winningCount) {
            console.log('x wins');
            $('#modalWin').modal('show');
            $('#modalWinPlayer').text('X');
        } else if (oCount === winningCount) {
            console.log('o wins');
            $('#modalWin').modal('show');
            $('#modalWinPlayer').text('O');
        }
    }

    function checkCol(col, winningCount){
        var counts = {
            X: 0,
            O: 0,
            "": 0

        }
        var xCount = 0;
        var oCount = 0;
        for (var i = 0; i < loadAnswers[col].length; i++) {
            console.log('this is LA col', loadAnswers[col].length);
            var letter = loadAnswers[i][col];
            counts[letter]++;
            // if(loadAnswers[i][col] === "X"){
            //     xCount++;
            // } else if(loadAnswers[col][i] === "O"){
            //     oCount++;
            // }
        }
        if (counts.X === winningCount) {
            console.log('x wins');
            $('#modalWin').modal('show');
            $('#modalWinPlayer').text('X');
            return 'X';
        } else if (counts.O === winningCount) {
            console.log('o wins');
            $('#modalWin').modal('show');
            $('#modalWinPlayer').text('O');
            return 'O'
        } else if(counts['']===0){
            return false;
        }
    }
}
//down right
// for(var x = 0; x< loadAnswers.length; x++){
//     loadAnswers[x][x]
// }
// //upright
// for(var x=0,y=loadAnswers[0].length-1; x<loadAnswers.length; x++,y--){

// }

function checkDia1(selectedRow,selectedCol, winningCount){
    var xCount = 0;
    var oCount = 0;
    for (var i = 0; i < loadAnswers.length; i++) {
        if(loadAnswers[i][i] === "X"){
            xCount++;
        } else if(loadAnswers[i][i] === "O"){
            oCount++;
        }
    }
    if (xCount === winningCount) {
        console.log('x wins - dia1');
        $('#modalWin').modal('show');
        $('#modalWinPlayer').text('X');
    } else if (oCount === winningCount) {
        $('#modalWin').modal('show');
        $('#modalWinPlayer').text('O');
        console.log('o wins - dia1');
    }
}

function checkDia2(selectedRow,selectedCol, winningCount){
    var xCount = 0;
    var oCount = 0;
    for(var x = 0, y = loadAnswers[0].length - 1; x < loadAnswers.length; x++, y--) {
        if(loadAnswers[y][x] === "X"){
            xCount++;
        } else if(loadAnswers[y][x] === "O"){
            oCount++;
        }
    }
    if (xCount === winningCount) {
        console.log('x wins - dia2');
        $('#modalWin').modal('show');
        $('#modalWinPlayer').text('X');
    } else if (oCount === winningCount) {
        $('#modalWin').modal('show');
        $('#modalWinPlayer').text('O');
        console.log('o wins - dia2');
    }
}

var loadAnswers = [
    ['','',''],
    ['','',''],
    ['','','']
    ]
    