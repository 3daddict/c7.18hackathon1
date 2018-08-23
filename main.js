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


// Create board dynamically on the dom
function drawBoard() {
    var counter = 1;
    for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
        var row = $("<tr>")
        for (var colIndex = 0; colIndex < 3; colIndex++) {
            var square = $("<td>").attr('id', counter++);
            square.attr('row', rowIndex);
            square.attr('col', colIndex);
            row.append(square);
        }
        $('#game').append(row);
    }
}

function clickHandler() {
    $(this).text(currentPlayerEntry[currentPlayer]); //currentPlayerEntry[] <- check with 0 or 1 for player
    if(currentPlayer === 0) {
        currentPlayer = 1;

        var selectedRow = $(this).attr('row');
        // console.log(selectedRow);
        var selectedCol = $(this).attr('col');
        var selectedValue = $(this).text();
        loadAnswers[selectedRow][selectedCol] = selectedValue;
        // console.log(selectedValue);
        $('#playerXName').removeClass('activePlayer');
        $('#playerOName').addClass('activePlayer');
    } else {
        currentPlayer = 0;

        var selectedRow = $(this).attr('row');
        // console.log(selectedRow);
        var selectedCol = $(this).attr('col');
        var selectedValue = $(this).text();
        loadAnswers[selectedRow][selectedCol] = selectedValue;
        console.log('this is selected value',selectedValue);
        $('#playerXName').addClass('activePlayer');
        $('#playerOName').removeClass('activePlayer');
    }
    var selectedRow = $(this).attr('row');
    // console.log(selectedRow);
    var selectedCol = $(this).attr('col');
    var selectedValue = $(this).text();
    loadAnswers[selectedRow][selectedCol] = selectedValue;
    checkRow(selectedRow, amountToWin);
    // checkCol();
    // checkDia1();
    // checkDia2();


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
        } else if (oCount === winningCount) {
            console.log('o wins');
        }
    }
}
var loadAnswers = [
    ['','',''],
    ['','',''],
    ['','','']
    ]
    