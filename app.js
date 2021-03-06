const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

const devENV = process.env.DEV_ENV;
const PORT = process.env.PORT || devENV;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    console.log('----------------------------');
    console.log('NEW REQUEST: ' + req.url);
    console.log('DATE: ' + new Date());
    console.log('----------------------------');
    next();
})

app.get('/', (req, res) => {
    res.json({
        title: 'API-Musiky',
        author: 'Emerson-Britto',
        description: "Musiky Project"
    });
});


const randomContentRouter = require('./routers/random-content');
app.use('/random', randomContentRouter);

const playlistsRouter = require('./routers/playlists');
app.use('/playlist', playlistsRouter);

const searchRouter = require('./routers/search');
app.use('/search', searchRouter);

const artistsRouter = require('./routers/artists');
app.use('/artist', artistsRouter);

const pages = require('./routers/pages');
app.use('/page', pages);

const greeting = require('./routers/greeting.js');
app.get('/greeting', async (req, res) => {
    res.json(await greeting());
});


const log = () => {
    console.log('Started: ' + new Date());
    if(devENV) console.log(`local: http://localhost:${PORT}/`);
}

app.listen(PORT, log());

//https://api-musiky.herokuapp.com/createjson?source=[PLAYLIST_LINK]&key=[KEY]
