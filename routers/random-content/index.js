const router = require('express').Router()

const randomPlaylists = require('./randomPlaylist.js')
const randomSongs = require('./randomSongs.js')


router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})


router.get('/playlists', async (req, res) => {
    const totalList = req.query.totalList
    const totalPerList = req.query.totalPerList
    const listPrefix = req.query.listPrefix
    const listSuffix = req.query.listSuffix
    const valueExactPerList = req.query.valueExact

    const resultSongs = await randomPlaylists(parseInt(totalList), parseInt(totalPerList), listPrefix, listSuffix, valueExactPerList)

    res.json(resultSongs)
})


router.get('/songs', async (req, res) => {
    const totalSong = req.query.totalSong
    const listType = req.query.listType

    const resultSongs = await randomSongs(parseInt(totalSong), listType)

    res.json(resultSongs)
})

module.exports = router