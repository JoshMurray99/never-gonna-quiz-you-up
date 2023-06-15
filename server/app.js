const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");

const histQuestions = require("./questionsList/historyQuestions.json");
const geoQuestions = require("./questionsList/geographyQuestions.json");
let histLeaderboard = require("./Leaderboards/historyLeaderboard.json");
let geoLeaderboard = require("./Leaderboards/geographyLeaderboard.json");

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
        fs.readFile("server/intermediary-name.json", "utf8",(error1, data1) => {
            if (error1) {
                console.log(error1)
                return
            }
            console.log(data1);
            fs.readFile("server/intermediary-subject.json", "utf8", (error2, data2) => {
                if (error2) {
                    console.log(error2)
                    return
                }
                console.log(data1);
                //console.log(data);
                res.status(200).send([JSON.parse(data1), JSON.parse(data2)]);
                //return data
            })
        })
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
        histLeaderboard = histLeaderboard.filter(obj => obj.name != name);
        histLeaderboard.push({"name":name, "score":score})
        const data = JSON.stringify(histLeaderboard);
        fs.writeFile("./server/Leaderboards/historyLeaderboard.json", data, writeFileError);
        res.sendStatus(201);
    } else if (subject === "geography") {
        geoLeaderboard = geoLeaderboard.filter(obj=>obj.name != name)
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
        console.log("error")
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
