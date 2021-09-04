const router = require('express').Router()

const searchSuggestions = require('./suggestions.js')
const autoComplete = require('./autoComplete.js')


router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})


router.get('/search-suggestions', async (req, res) => {
    const total = req.query.total

    const result = await searchSuggestions(parseInt(total))

    res.json(result)
})


router.get('/auto-complete', async (req, res) => {
    const input = req.query.input
    const maxResult = req.query.maxResult

    const result = await autoComplete(input, parseInt(maxResult))

    res.json(result)
})

module.exports = router