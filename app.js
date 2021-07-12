const express = require('express');
const app = express();

const data_quick = require("./dataQuick");

const PORT = process.env.PORT || 8877;

app.get('/', (req, res) => {
    res.json({
        title: 'API-Musiky',
        author: 'Emerson-Britto',
        description: "Musiky Project"
    })
})

app.get('/quickpicks', (req, res) => {
    var numed = [], musicResult = [];
    for (var i = 0; i < 9; i++) {
        var numRandom = Math.floor(Math.random() * data_quick.items.length);
        var hasSomeEvenNumber = numed.some(value => value == numRandom);
        if (hasSomeEvenNumber == false) {
            numed.push(numRandom);
            musicResult.push(data_quick.items[numRandom]);
        }
    }

    res.json(musicResult)
})

app.listen(PORT, () => {
    console.log('port: ' + PORT)
})
