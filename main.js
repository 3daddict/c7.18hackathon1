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
        var selectedRow = $(this).attr('row');
        var selectedCol = $(this).attr('col');
        var selectedValue = $(this).text();
        loadAnswers[selectedRow][selectedCol] = selectedValue;
        console.log('this is first one', selectedCol);
    } else {
        $(this).text(currentPlayerEntry[currentPlayer]);
        currentPlayer = 0;
        var selectedRow = $(this).attr('row');
        var selectedCol = $(this).attr('col');
        var selectedValue = $(this).text();
        loadAnswers[selectedRow][selectedCol] = selectedValue;
        console.log('this is second one',selectedCol);
    }
}

// function loadAnswers(){
//     winner.push([1, 2, 3]);
//     winner.push([4, 5, 6]);
//     winner.push([7, 8, 9]);
//     winner.push([1, 4, 7]);
//     winner.push([2, 5, 8]);
//     winner.push([3, 6, 9]);
//     winner.push([1, 5, 9]);
//     winner.push([3, 5, 7]);
// }

var loadAnswers = [
    // horizontals
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // verticals
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

//   function checkWinner (){
//     for (var i = 0; i < loadAnswers.length; i++) {
//         console.log(l'this works');
//       }
//   }