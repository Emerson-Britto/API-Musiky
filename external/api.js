const axios = require('axios');
const LOCAL_REQUEST = process.env.LOCAL_REQUEST;

const BASE_URL = LOCAL_REQUEST
    ? `http://localhost:${LOCAL_REQUEST}/`
    : 'https://cdn-istatics.herokuapp.com/'


const onError = err => {
    console.log(err);
}


const request = (pathName, params='', callbackError=onError) => {

    let paths = {
        playlist: 'playlist/',
        artist: 'artist/',
        allMusics: 'music/all',
        allPlaylist: 'playlist/all',
        playlistById: 'playlist/byId',
        artistPerPage: 'artist/getAllArtistsPerPage',
        artistPerIndex: 'artist/getByIndex',
        allArtistNames: 'artist/allNames'
    }

    let PATH = paths[pathName] ? paths[pathName] : pathName;
    let URL = `${BASE_URL + PATH + params}`;

    return axios.get(URL).then(res => {

        return res.data

    }).catch(err => callbackError(err))
}

module.exports = { BASE_URL, request }