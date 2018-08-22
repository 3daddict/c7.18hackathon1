$(document).ready(initializeApp);

function initializeApp () {
    // $(".cell").click(cellClick);

    drawBoard()
}




// Create board dynamically on the dom
function drawBoard () {
    var counter = 1;
    for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
        var row = $("<tr>")
        for (var colIndex = 0; colIndex < 3; colIndex++) {
            row.append('<td>');
        }
        $('#game').append(row);
    }

}
