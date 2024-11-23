const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

const choices = ["rock", "paper", "scissors"];


const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) return "draw";
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        return "player";
    }
    return "computer";
};


app.post('/play', (req, res) => {
    const { playerChoice } = req.body;


    if (!choices.includes(playerChoice)) {
        return res.status(400).json({ error: "Invalid choice. Choose rock, paper, or scissors." });
    }


    const computerChoice = choices[Math.floor(Math.random() * choices.length)];


    const result = determineWinner(playerChoice, computerChoice);


    res.json({
        playerChoice,
        computerChoice,
        result
    });
});


app.listen(port, () => {
    console.log(`Rock-Paper-Scissors backend running at http://localhost:${port}`);
});
