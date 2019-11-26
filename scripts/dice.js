function generateRandomValue(minValue, maxValue) {
    //use random to generate a number between min and max
    var random = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    //swap from player to player by comparing current name to player names
    if (currentPlayerName == player1Name) {
        //set currentPlayerName to the next player
        document.getElementById("current").innerText = document.getElementById("player2").value;
    }
    else if (currentPlayerName == player2Name) {
        //set currentPlayerName to the next player
        document.getElementById("current").innerText = document.getElementById("player1").value;
    }
    else {
        document.getElementById("current").innerText = document.getElementById("player1").value;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    //set player 1 and player 2 scores to 0
    document.getElementById("score1").value = "0";
    document.getElementById("score2").value = "0";
    //verify each player has a name
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    //if both players don't have a name display error
    if (player1Name.trim() == "" || player2Name.trim() == "") {
        alert("Both players must enter a name.");
    }
    else if (player1Name.trim() == player2Name.trim()) {
        alert("Please enter two different names.");
    }
    //if both players do have a name start the game!
    else {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    var randomNumber = generateRandomValue(1, 7);
    //if the roll is 1
    if (randomNumber == 1) {
        //  change players
        changePlayers();
        //set the die roll to value player rolled
        document.getElementById("die").value = randomNumber.toString();
        //  set current total to 0
        document.getElementById("total").value = "0";
    }
    //if the roll is greater than 1
    if (randomNumber > 1) {
        //  add roll value to current total
        currTotal += randomNumber;
        //set the die roll to value player rolled
        document.getElementById("die").value = randomNumber.toString();
        //display current total on form
        document.getElementById("total").value = currTotal.toString();
    }
}
function holdDie() {
    //Get both players' scores
    var score1 = parseInt(document.getElementById("score1").value);
    var score2 = parseInt(document.getElementById("score2").value);
    //get the current turn total
    var currTotal = parseInt(document.getElementById("total").value);
    //determine who the current player is
    var currentPlayerName = document.getElementById("current").innerText;
    //add the current turn total to the player's total score
    if (currentPlayerName == document.getElementById("player1").value) {
        score1 += currTotal;
        document.getElementById("score1").value = score1.toString();
    }
    else if (currentPlayerName == document.getElementById("player2").value) {
        score2 += currTotal;
        document.getElementById("score2").value = score2.toString();
    }
    //reset the turn total to 0
    document.getElementById("die").value = "0";
    document.getElementById("total").value = "0";
    if (score1 >= 100 || score2 >= 100) {
        endGame();
    }
    //change players
    changePlayers();
}
function endGame() {
    var score1 = parseInt(document.getElementById("score1").value);
    var score2 = parseInt(document.getElementById("score2").value);
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
    if (score1 > score2) {
        var winnerWindow = window.open("", "_self");
        winnerWindow.document.write('<html><head><title>YOU ARE THE WINNER!!</title><link rel="stylesheet" type="text/css" href="winner.css"></head><body>');
        winnerWindow.document.write("<h1>" + player1Name.toUpperCase() + " IS THE WINNER!!!");
        winnerWindow.document.write("<button type=button onclick=location.reload()>Back To Game</button>");
        winnerWindow.document.write('</body></html>');
    }
    if (score2 > score1) {
        var winnerWindow = window.open("", "_self");
        winnerWindow.document.write('<html><head><title>YOU ARE THE WINNER!!</title><link rel="stylesheet" type="text/css" href="winner.css"></head><body>');
        winnerWindow.document.write("<h1>" + player2Name.toUpperCase() + " IS THE WINNER!!!</h1>");
        winnerWindow.document.write("<button type=button onclick=location.reload()>Back To Game</button>");
        winnerWindow.document.write('</body></html>');
    }
}
