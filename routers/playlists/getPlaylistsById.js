const axios = require('axios');

const playlistsJson = require('../../dataBase/playlists/random.json');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9873}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        'AllIds': 'music/getAllIds',
        'mountPlaylist': 'playlist/'
    }
    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const getPlaylistsById = async({ id }) => {

    let playlist = playlistsJson.find(playlist => playlist.infors.playlistId === id)

    let { list, resquestId } = await request('mountPlaylist', playlist.key);

    delete playlist.key;
    playlist['list'] = list;

    return playlist;
}

module.exports = getPlaylistsById
