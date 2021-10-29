const axios = require('axios');

const playlistsJson = require('../../dataBase/playlists/random.json');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        'mountPlaylist': 'playlist/'
    }
    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const getPlaylistsById = async({ id }) => {

    let res = {
        infors: null,
        list: []
    }


    let playlist = playlistsJson.find(playlist => playlist.infors.playlistId === id)

    let { infors, list, resquestId } = await request('mountPlaylist', playlist.key);

    res.infors = playlist.infors;
    res.list = list;

    console.log(res);

    return res;
}

module.exports = getPlaylistsById
