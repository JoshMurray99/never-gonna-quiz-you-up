const cors = require("cors");
const express = require("express");
const app = express();
const histQuestions = require("./questionsList/historyQuestions.json");
const geoQuestions = require("./questionsList/geographyQuestions.json");


app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('It is working');
})

app.get('/history', (req, res) => {
    res.send(histQuestions);
})

app.get('/geography', (req, res) => {
    res.send(geoQuestions);
})

module.exports = app;