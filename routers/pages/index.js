const router = require('express').Router();

const randomPlaylist = require('../random-content/randomPlaylist');
const randomArtists = require('../random-content/randomArtists');
const getPlaylistsById = require('../playlists/getPlaylistsById');
const randomSongs = require('../random-content/randomSongs');
const generateSuggestions = require('../search/suggestions');

router.options('/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'GET')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.status(200)
    res.end()
})

router.get('/home', async(req, res) => {
    const $ = {};
    $.playlists = {};

    let playlists = await randomPlaylist({ totalList: 1 });
    let firstPlaylistId = playlists.items[0].id;
    let quickpicksPlaylist = await getPlaylistsById({ id : firstPlaylistId });
    quickpicksPlaylist.list.length = 10;

    $.greeting = require('../greeting')();
    $.quickPicks = quickpicksPlaylist;// temp
    $.playlists.mixs = await randomPlaylist({ totalList: 6 }).then(r=>r.items);
    $.artists = await randomArtists({ maxResult: 6 }).then(r=>r.artists);
    $.playlists.otherMixs = await randomPlaylist({ totalList: 6 }).then(r=>r.items);
    $.playlists.justSongs = await randomPlaylist({ totalList: 6 }).then(r=>r.items);

    res.json($);
});

router.get('/explore', async(req, res) => {
    const $ = {};
    $.playlists = {};

    $.playlists.exploreList = await randomPlaylist({ totalList: 6 }).then(r=>r.items);
    $.disks = await randomSongs({ maxResult: 6, listType: 'ambienceSongs' });
    $.playlists.exploreNewSets = await randomPlaylist({ totalList: 6 }).then(r=>r.items);
    $.playlists.anotherSets = await randomPlaylist({ totalList: 6 }).then(r=>r.items);

    res.json($);
});

router.get('/search', async(req, res) => {
    const $ = {};
    $.playlists = {};

    $.searchSuggestions = await generateSuggestions({ total: 11 });
    $.playlists.othersLists = await randomPlaylist({ totalList: 6 }).then(r=>r.items);
    $.artists = await randomArtists({ maxResult: 6 }).then(r=>r.artists);

    res.json($);
});


module.exports = router