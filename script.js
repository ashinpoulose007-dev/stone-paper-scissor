let userScore = 0;
let compScore = 0;
let round = 1;
const maxRounds = 5;

let playerName = "";
let playerAge = "";

const icons = {
    Stone:"🪨",
    Paper:"📄",
    Scissor:"✂️"
};

function startGame(){
    playerName = document.getElementById("playerName").value.trim();
    playerAge = document.getElementById("playerAge").value.trim();

    if(playerName === "" || playerAge === ""){
        alert("Enter name and age");
        return;
    }

    document.getElementById("detailsPage").classList.add("hidden");
    document.getElementById("gamePage").classList.remove("hidden");

    document.getElementById("topName").innerText =
        playerName + " | Age: " + playerAge;
}

function playRound(userChoice){

    const lowerName = playerName.toLowerCase();

    /* ANU 21 => PLAY 4 ROUNDS, THEN ON ROUND 5 SHOW MESSAGE */
    if(lowerName === "anu" && playerAge === "21" && round === 5){
        showSpecial("❤️","😘😍 Anutty, I love you ♥️❤️","💖");
        return;
    }

    /* ANUSHA 21 => IMMEDIATE MESSAGE */
    if(lowerName === "ashinanusha" && playerAge === "21"){
        showSpecial("💖","😍😘 Anu, aminjaaa🍑 katti tharoo.... 🥹😏","❤️");
        return;
    }

    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("resultPage").classList.remove("hidden");

    document.getElementById("userMove").innerText = icons[userChoice];
    document.getElementById("userLabel").innerText = playerName;

    const comp = document.getElementById("compMove");
    comp.innerText = "❔";
    comp.classList.add("blink-once");

    document.getElementById("winnerText").innerText = "Choosing...";

    setTimeout(function(){

        const choices = ["Stone","Paper","Scissor"];
        let compChoice = choices[Math.floor(Math.random()*3)];

        while(compChoice === userChoice){
            compChoice = choices[Math.floor(Math.random()*3)];
        }

        comp.classList.remove("blink-once");
        comp.innerText = icons[compChoice];

        let result = "";

        if(
            (userChoice === "Stone" && compChoice === "Scissor") ||
            (userChoice === "Paper" && compChoice === "Stone") ||
            (userChoice === "Scissor" && compChoice === "Paper")
        ){
            userScore++;
            result = playerName + " Wins!";
        }else{
            compScore++;
            result = "Computer Wins!";
        }

        document.getElementById("winnerText").innerText = result;
        document.getElementById("scoreText").innerText =
            playerName + ": " + userScore + " | Computer: " + compScore;

    },500);
}

function showSpecial(title,msg,icon){
    document.getElementById("gamePage").classList.add("hidden");
    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("finalPage").classList.remove("hidden");

    document.getElementById("finalTitle").innerText = title;
    document.getElementById("finalMessage").innerText = msg;
    document.getElementById("trophy").innerText = icon;
    document.getElementById("trophy").style.display = "block";
}

function nextRound(){
    round++;

    if(round <= maxRounds){
        document.getElementById("roundText").innerText =
            "Round " + round + " / 5";

        document.getElementById("resultPage").classList.add("hidden");
        document.getElementById("gamePage").classList.remove("hidden");
    }else{
        showFinal();
    }
}

function showFinal(){

    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("finalPage").classList.remove("hidden");

    if(userScore > compScore){
        document.getElementById("finalTitle").innerText = "🏆 Champion!";
        document.getElementById("finalMessage").innerText =
            playerName + " wins the match!";
        document.getElementById("trophy").innerText = "🏆";
        document.getElementById("trophy").style.display = "block";
    }
    else if(compScore > userScore){
        document.getElementById("finalTitle").innerText = "💻 Computer Wins!";
        document.getElementById("finalMessage").innerText =
            "Better luck next time!";
        document.getElementById("trophy").style.display = "none";
    }
    else{
        document.getElementById("finalTitle").innerText = "🤝 Draw Match!";
        document.getElementById("finalMessage").innerText = "Great game!";
        document.getElementById("trophy").style.display = "none";
    }
}

function restartGame(){
    userScore = 0;
    compScore = 0;
    round = 1;

    document.getElementById("finalPage").classList.add("hidden");
    document.getElementById("detailsPage").classList.remove("hidden");
    document.getElementById("resultPage").classList.add("hidden");
    document.getElementById("gamePage").classList.add("hidden");

    document.getElementById("playerName").value = "";
    document.getElementById("playerAge").value = "";
}
