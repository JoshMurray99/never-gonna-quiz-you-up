const cors = require("cors");
const express = require("express");
const app = express();

const histQuestions = require("./questionsList/historyQuestions.json");
const geoQuestions = require("./questionsList/geographyQuestions.json");
const histLeaderboard = require("./Leaderboards/historyLeaderboard.json");
const geoLeaderboard = require("./Leaderboards/geographyLeaderboard.json");

const numQuestions = 15;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('It is working');
})

app.get('/:subject', (req, res) => {
    const subject = req.params.subject.toLowerCase();
    if (subject === 'history') {
        res.send(shuffleArr(histQuestions).slice(0, numQuestions));
    } else if (subject === 'geography') {
        res.send(shuffleArr(geoQuestions).slice(0, numQuestions));
    } else {
        res.sendStatus(404);
    }
})

app.get('/:subject/leaderboard', (req, res) => {
    const subject = req.params.subject.toLowerCase();
    if (subject === 'history') {
        res.send(histLeaderboard.sort((obj1, obj2) => (obj1.score > obj2.score) ? -1 : (obj1.score < obj2.score) ? 1 : 0));
    } else if (subject === 'geography') {
        res.send(geoLeaderboard.sort((obj1, obj2) => (obj1.score > obj2.score) ? -1 : (obj1.score < obj2.score) ? 1 : 0));
    } else {
        res.sendStatus(404);
    }
})










function shuffleArr(arr) {
    const newArr = [];
    for (let i = arr.length; i>0; i--){
        let randNum = Math.floor(Math.random()*i)
        newArr.push(arr[randNum]);
        arr = arr.slice(0, randNum).concat(arr.slice(randNum + 1, i));
    }
    return newArr
}
module.exports = app;