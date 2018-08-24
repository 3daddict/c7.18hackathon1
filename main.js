    $(document).ready(initializeApp);


    function initializeApp() {
        drawBoard();  
        $("td").click(clickHandler);
        $('#resetStats').click(resetStats);
        $('#playAgain1').click(clearBoard);
        $('#playAgain2').click(clearBoard);
        $('#playAgain1').click(gamesPlayedCount);
        $('#playAgain2').click(gamesPlayedCount);
        $('#settingsButton').click(settingsButton);
        $('#settingsCancel').click(cancelButton);
    }

    //Global Variables
    var currentPlayer = 0;
    var player1Count = 0;
    var player2Count = 0;
    var currentPlayerEntry = ['X', 'O'];
    var winner = [];
    var amountToWin = 3;
    var totalAvailableSquares = null;
    var games_played = 0;


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

    // Click Handler
    function clickHandler() {
        play();
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
        if(--totalAvailableSquares === 0){
            console.log('cat game');
            $('#modalDraw').modal('show');
            $('#drawSound').trigger('play');
        }
        checkDia1(selectedRow, selectedCol, amountToWin);
        checkDia2(selectedRow, selectedCol, amountToWin);


        // Checking Row Winnings
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
                $('#winSound').trigger('play')
                player1Count = player1Count + 1;
                $('#playerXWon').text(player1Count);
            } else if (oCount === winningCount) {
                console.log('o wins');
                $('#modalWin').modal('show');
                $('#modalWinPlayer').text('O');
                $('#winSound').trigger('play')
                player2Count = player2Count + 1;
                $('#playerOWon').text(player2Count);
            }
        }

        // Checking Column Winnings
        function checkCol(col, winningCount){
            var counts = {
                X: 0,
                O: 0,
                "": 0
            }
            var xCount = 0;
            var oCount = 0;
            for (var i = 0; i < loadAnswers[col].length; i++) {
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
                $('#winSound').trigger('play');
                player1Count = player1Count + 1;
                $('#playerXWon').text(player1Count);
                return 'X';
            } else if (counts.O === winningCount) {
                console.log('o wins');
                $('#modalWin').modal('show');
                $('#modalWinPlayer').text('O');
                $('#winSound').trigger('play');
                player2Count = player2Count + 1;
                $('#playerOWon').text(player2Count);
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

    // Checking Diagonal 1 (left top - right bottom) Winnings
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
            $('#winSound').trigger('play');
            player1Count = player1Count + 1;
            $('#playerXWon').text(player1Count);
        } else if (oCount === winningCount) {
            player2Count = player2Count + 1;
            $('#playerOWon').text(player2Count);
            console.log('o wins - dia1');
            $('#modalWin').modal('show');
            $('#modalWinPlayer').text('O');
            $('#winSound').trigger('play')
        }
    }

    // Checking Diagonal 2 (right top - left bottom) Winnings
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
            $('#winSound').trigger('play');
            player1Count = player1Count + 1;
            $('#playerXWon').text(player1Count);
        } else if (oCount === winningCount) {
            console.log('o wins - dia2');
            $('#modalWin').modal('show');
            $('#modalWinPlayer').text('O');
            $('#winSound').trigger('play');
            player2Count = player2Count + 1;
            $('#playerOWon').text(player2Count);
        }
    }

    // function fillLoadAnswers(size){
    //     return new Array(size).fill(undefined).map(function(){ return new Array(size).fill('')});
        //Esther, George, and Michael have promised to understand the above line by monday's presentation;  
        // return [
        //     ['','',''],
        //     ['','',''],
        //     ['','','']
        //     ];
    // }
    // var loadAnswers = fillLoadAnswers(3);
    var loadAnswers = [
        ['','',''],
        ['','',''],
        ['','','']
        ]


    function playerStats () {
        $('#"playerXWon').text();
    }    

    //function play the audio file over again without waiting for it to finish
    function play() {
        var audio = document.getElementById('clickAudio');
        if (audio.paused) {
            audio.play();
        }else{
            audio.currentTime = 0
        }
    }

    function resetStats (){
        currentPlayer = 0;
        player1Count = 0;
        player2Count = 0;
        games_played = 0;
        $('#playerXWon').text('0');
        $('#playerOWon').text('0');
        $('#gamesPlayed').text('0');
        clearBoard();
        
        // loadAnswers = fillLoadAnswers();
    }

    function clearBoard(){
        $('.gameBoard').empty();
        drawBoard();
        $("td").click(clickHandler);
        $('#modalWin').modal('hide')
        $('#modalDraw').modal('hide')
        loadAnswers = [
            ['','',''],
            ['','',''],
            ['','','']
            ];
    }

    function settingsButton(){
        $('#modalSettings').modal('show');
    }

    function gamesPlayedCount(){
        games_played = games_played + 1;
        $('#gamesPlayed').text(games_played);
    }

    function cancelButton(){
        $('#modalSettings').modal('hide');
    }
