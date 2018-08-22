$(document).ready(initializeApp);

function initializeApp () {
    $(".cell").click(cellClick );
}

// Click Handler for Each Cell
function cellClick () {
    console.log('cell click');
}