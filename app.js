const express = require('express');
const app = express();

const RandomSongs = require('./randomSongs.js')
const createJson = require('./createJson.js')

const PORT = process.env.PORT || 8877;

app.get('/', (req, res) => {
    res.json({
        title: 'API-Musiky',
        author: 'Emerson-Britto',
        description: "Musiky Project"
    })
})

app.get('/createJson', async (req, res) => {
    const playlistId = req.query.source
    const key = req.query.key

    const jsonResult = await createJson(playlistId, key)

    res.json(jsonResult)
})

app.get('/RandomSongs', async (req, res) => {
    const totalList = req.query.totalList
    const resultPerList = req.query.resultPerList

    const ResultSongs = await RandomSongs(parseInt(totalList), parseInt(resultPerList))

    res.json(ResultSongs)
})

app.listen(PORT, () => {
    console.log('port: ' + PORT)
})
