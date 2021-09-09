const router = require('express').Router()

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

router.post('/create', (req, res) => {
    console.log('00')
    createAccount(req)

    res.end()
})

module.exports = router