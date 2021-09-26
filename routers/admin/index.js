const router = require('express').Router()

const createArtistsImg = require('../../adminTools/createArtistsImg.js')


router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})

router.get('/createImg', async (req, res) => {

    const jsonResult = await createArtistsImg()

    res.json(jsonResult)
})

module.exports = router