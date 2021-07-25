const express = require('express');
const app = express();

const RandomSongs = require('./path/randomSongs.js')
const createJson = require('./adminTools/createJson.js')

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
    const totalResult = req.query.totalResult

    const ResultSongs = await RandomSongs(parseInt(totalResult))

    res.header('Access-Control-Allow-Origin', '*')

    res.json(ResultSongs)
})

app.listen(PORT, () => {
    console.log('port: ' + PORT)
})
