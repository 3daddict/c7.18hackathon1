$(document).ready(initializeApp);

function initializeApp () {
    $(".cell").click(cellClick);

    drawBoard()
}

var winners = new Array();
var player1Selections = new Array();
var player2Selections = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points
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
/*
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
*/

function drawBoard() {
    var Parent = document.getElementById("game");
    var counter = 1;
    
    // while (Parent.hasChildNodes()) {
    //     Parent.removeChild(Parent.firstChild);
    // }

    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");
        
        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = counter;
            
            //col.innerHTML = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                }

                move++;
                var isWin = checkWinner();

                if (isWin)
                {
                    if(currentPlayer == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    reset();
                    drawBoard();
                }

                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
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


function checkWinner() {
            var win = false; // currently set to true on global variable
            var playerSelections = new Array(); // creating a literal new Array

            if (currentPlayer == 0)
                playerSelections = player1Selections; //assigning player1Selection to playerSelections
            else
                playerSelections = player2Selections; //assigning player2Selection to playerSelections

            if (playerSelections.length >= size) { //check to see if playerSelections length is greater or equal to size (3)

                for (var answerI = 0; answerI < winners.length; answerI++) { // loop through winners array length
                    var sets = winners[answerI];  // set it to variale
                    var setFound = true; 

                    for (var deleteI = 0; deleteI < sets.length; deleteI++) {  // go through winners array element
                        var found = false;

                        for (checkI = 0; checkI < playerSelections.length; checkI++) {  // checking winning answer against players picked answer
                            if (sets[deleteI] == playerSelections[checkI]) {
                                found = true;
                                break;
                            }
                        }

                        // value not found in players hand
                        // not a valid set, move on
                        if (found == false) {
                            setFound = false;
                            break;
                        }
                    }

                    if (setFound == true) {
                        win = true;
                        break;
                    }
                }
            }

            return win;
        }


