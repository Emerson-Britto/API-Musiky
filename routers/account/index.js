const router = require('express').Router()


router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})

router.get('/', (req, res) => {
	res.json({msg: 'router unavailable, yet...'})
})

module.exports = router