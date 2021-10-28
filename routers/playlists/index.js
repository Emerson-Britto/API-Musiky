const router = require('express').Router()

const getPlaylistsById = require('./getPlaylistsById.js');

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})


router.get('/:id', async (req, res) => {

    const playlist = await getPlaylistsById(req.params)

    res.json(playlist)
})


module.exports = router