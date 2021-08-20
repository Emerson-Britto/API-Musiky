const express = require('express');
const app = express();

const randomPlaylists = require('./path/randomPlaylist.js')
const createJson = require('./adminTools/createJson.js')
const randomSongs = require('./path/randomSongs.js')
const generateSuggestions = require('./path/suggestions.js')
const autoComplete = require('./path/autoComplete.js')
const greeting = require('./path/greeting.js')

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


app.get('/randomPlaylists', async (req, res) => {
    const totalList = req.query.totalList
    const totalPerList = req.query.totalPerList
    const listPrefix = req.query.listPrefix
    const listSuffix = req.query.listSuffix
    const valueExactPerList = req.query.valueExact

    const resultSongs = await randomPlaylists(parseInt(totalList), parseInt(totalPerList), listPrefix, listSuffix, valueExactPerList)

    res.header('Access-Control-Allow-Origin', '*')

    res.json(resultSongs)
})


app.get('/randomSongs', async (req, res) => {
    const totalSong = req.query.totalSong
    const listType = req.query.listType

    const resultSongs = await randomSongs(parseInt(totalSong), listType)

    res.header('Access-Control-Allow-Origin', '*')

    res.json(resultSongs)
})


app.get('/gSuggestions', async (req, res) => {
    const total = req.query.total

    const result = await generateSuggestions(parseInt(total))

    res.header('Access-Control-Allow-Origin', '*')

    res.json(result)
})


app.get('/auto-complete', async (req, res) => {
    const input = req.query.input
    const maxResult = req.query.maxResult

    const result = await autoComplete(input, parseInt(maxResult))

    res.header('Access-Control-Allow-Origin', '*')

    res.json(result)
})

app.get('/getGreeting', async (req, res) => {

    const result = await greeting()

    res.header({'Content-Type': 'image/gif'});

    res.header('Access-Control-Allow-Origin', '*')

    res.sendFile(result)
})

app.listen(PORT, () => {
    console.log(new Date().getHours())
    console.log('port: ' + PORT)
})

//https://api-musiky.herokuapp.com/createjson?source=[PLAYLIST_LINK]&key=[KEY]
