const router = require('express').Router()

const getArtistsPerPage = require('./getArtistsPerPage.js');

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})


router.get('/getArtistsPerPage/', async (req, res) => {

    const playlist = await getArtistsPerPage(req.query)

    res.json(playlist)
})


module.exports = router