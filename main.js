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
    if(currentPlayer === 0) {
        $(this).text(currentPlayerEntry[currentPlayer]); //currentPlayerEntry[] <- check with 0 or 1 for player
        currentPlayer = 1;
    } else {
        $(this).text(currentPlayerEntry[currentPlayer]);
        currentPlayer = 0;
    }
}

