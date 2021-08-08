const express = require('express');
const app = express();

const randomSongs = require('./path/randomSongs.js')
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

app.get('/randomSongs', async (req, res) => {
    const totalList = req.query.totalList
    const totalPerList = req.query.totalPerList
    const listPrefix = req.query.listPrefix
    const listSuffix = req.query.listSuffix
    const valueExactPerList = req.query.valueExact

    const resultSongs = await randomSongs(parseInt(totalList), parseInt(totalPerList), listPrefix, listSuffix, valueExactPerList)

    res.header('Access-Control-Allow-Origin', '*')

    res.json(resultSongs)
})


app.listen(PORT, () => {
    console.log('port: ' + PORT)
})
