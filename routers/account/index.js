const router = require('express').Router()

const dataAlreadyExists = require('./dataAlreadyExists')
const createAccount = require('./createAccount')


router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})

router.get('/', (req, res) => {
	res.json({msg: 'router unavailable, yet...'})
})

router.get('/exists', async (req, res) => {

    const result = await dataAlreadyExists(req.query)

    res.status(200).json(result)
})

router.post('/create', (req, res) => {
    createAccount(req.body, res)
})

module.exports = router