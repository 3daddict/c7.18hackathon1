$(document).ready(initializeApp);

function initializeApp() {
    drawBoard();  
    $("td").click(clickHandler);

}

//Global Variables
var currentPlayer = 0;
var player1Selection = [];
var player2Selection = [];


// Create board dynamically on the dom
function drawBoard() {
    var counter = 1;
    for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
        var row = $("<tr>")
        for (var colIndex = 0; colIndex < 3; colIndex++) {
            var square = $("<td>").attr('id', counter++);
            row.attr('row', rowIndex);
            square.attr('col', colIndex);
            row.append(square);
        }
        $('#game').append(row);
    }
}

function clickHandler() {
    if(currentPlayer === 0) {
        $(this).text('X');
        currentPlayer = 1;
    } else {
        $(this).text('O');
        currentPlayer = 0;
    }
}