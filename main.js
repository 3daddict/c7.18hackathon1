$(document).ready(initializeApp);

function initializeApp () {
    $(".cell").click(cellClick );

    drawBoard()
}

var player1 = 0;
var player2 = 0;
var size = 3;


// Click Handler for Each Cell
function cellClick () {
    console.log('cell click');
    $(this).text('X');
}

//switch between players
//need two players
//how do we log each click result
//after each click switch between players
function drawBoard()
{
    var parent = $("#game");
    var counter = 1;
    console.log('board function running')

    for (var rowI = 0; rowI < 3; rowI++)
    {
        var row = $("<tr>");

        for(var colI = 0;  colI < size; colI++)
        {
            var col = $("<td>");
            col.attr('data-row',rowI);
            col.attr('data-col',colI)
            col.text(counter++);

            row.append(col);
        }
        parent.append(row);
    }
}
