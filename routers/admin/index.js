const router = require('express').Router()

const createJson = require('../../adminTools/createJson.js')
const createArtistsImg = require('../../adminTools/createArtistsImg.js')


router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})

router.get('/createJson', async (req, res) => {
    const playlistId = req.query.source
    const key = req.query.key

    const jsonResult = await createJson(playlistId, key)

    res.json(jsonResult)
})

router.get('/createImg', async (req, res) => {

    const jsonResult = await createArtistsImg()

    res.json(jsonResult)
})

module.exports = router