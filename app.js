const express = require('express');
const app = express();
const bodyParser = require('body-parser')


const PORT = process.env.PORT || 9874


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    console.log('----------------------------')
    console.log('NEW REQUEST: ' + req.url)
    console.log('DATE: ' + new Date())
    console.log('----------------------------')
    next()
})

app.get('/', (req, res) => {
    res.json({
        title: 'API-Musiky',
        author: 'Emerson-Britto',
        description: "Musiky Project"
    })
})


const randomContentRouter = require('./routers/random-content')
app.use('/msk/random-content', randomContentRouter)

const playlistsRouter = require('./routers/playlists')
app.use('/msk/playlist', playlistsRouter)

const searchRouter = require('./routers/search')
app.use('/msk/search', searchRouter)

const filesRouter = require('./routers/files')
app.use('/msk/files', filesRouter)


const greeting = require('./routers/greeting.js')
app.get('/greeting', async (req, res) => {

    const result = await greeting()

    res.json(result)
})

app.listen(PORT, () => {
    console.log('Started: ' + new Date())
    console.log('port: ' + PORT)
})

//https://api-musiky.herokuapp.com/createjson?source=[PLAYLIST_LINK]&key=[KEY]
