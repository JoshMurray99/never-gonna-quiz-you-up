const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");

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
    } else if (subject == "intermediary"){
        const name = require("./intermediary-name.json");
        const subject = require("./intermediary-subject.json");
        res.status(200).send([name, subject]);
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

app.post('/:subject', (req, res) => {
    const name = req.body.name.toLowerCase();
    const score = Number(req.body.score);
    const subject = req.params.subject.toLowerCase();

    if (subject === "history") {
        histLeaderboard.push({"name":name, "score":score})
        const data = JSON.stringify(histLeaderboard);
        fs.writeFile("./server/Leaderboards/historyLeaderboard.json", data, writeFileError);
        res.sendStatus(201);
    } else if (subject === "geography") {
        geoLeaderboard.push({"name":name, "score":score})
        const data = JSON.stringify(geoLeaderboard);
        fs.writeFile("./server/Leaderboards/geographyLeaderboard.json", data, writeFileError);
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
})

app.post('/intermediary-name/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    fs.writeFile('./server/intermediary-name.json', JSON.stringify({name}), writeFileError);
    res.sendStatus(200);
})

app.post('/intermediary-subject/:subject', (req, res) => {
    const subject = req.params.subject.toLowerCase();
    fs.writeFile('./server/intermediary-subject.json', JSON.stringify({subject}), writeFileError);
    res.sendStatus(200);
})








function writeFileError(error) {
    if (error) {
        res.sendStatus(400);
        console.log(error);
    }
}

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
