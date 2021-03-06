const router = require('express').Router()

const getArtistsPerPage = require('./getArtistsPerPage.js');
const artistData = require('./artistData.js');

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})


router.get('/getArtistsPerPage', async (req, res) => {

    const artistsPage = await getArtistsPerPage(req.query)

    res.json(artistsPage)
})

router.get('/:id', async (req, res) => {

    const data = await artistData(req.params)

    res.json(data)
})



module.exports = router