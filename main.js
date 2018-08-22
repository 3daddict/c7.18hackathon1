$(document).ready(initializeApp);

function initializeApp () {
    $(".cell").click(cellClick );

    drawBoard()
}

var player1Selections = new Array();
var player2Selections = new Array();
var size = 3;
var winners = new Array();



// Click Handler for Each Cell
function cellClick () {
    console.log('cell click');
    $(this).text('X');
}

//switch between players
//need two players
//how do we log each click result
//after each click switch between players
function drawBoard(){
    var parent = $("#game");
    var counter = 1;
    console.log('board function running')

    for (var rowI = 0; rowI < 3; rowI++){
        var row = $("<tr>");

        for(var colI = 0;  colI < size; colI++){
            var col = $("<td>");
            col.attr('data-row',rowI);
            col.attr('data-col',colI)
            col.text(counter++);
            row.append(col);
        }
        parent.append(row);
    }
}

function loadAnswers(){
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
}
