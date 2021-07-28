const express = require('express');
const app = express();

const RandomSongs = require('./path/randomSongs.js')
const generatorMixs = require('./path/generatorMixs.js')
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

app.get('/generatorMixs', async (req, res) => {
    const totalPlayList = req.query.totalPlayList
    const totalPerList = req.query.totalPerList

    const ResultSongs = await generatorMixs(parseInt(totalPlayList), parseInt(totalPerList))

    res.header('Access-Control-Allow-Origin', '*')

    res.json(ResultSongs)
})

app.listen(PORT, () => {
    console.log('port: ' + PORT)
})
