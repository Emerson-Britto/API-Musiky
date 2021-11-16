const axios = require('axios');
const faker = require('faker');


const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        artistsNames: 'artist/',
        musics: 'music/all',
        allPlaylist: 'playlist/all',
    }
    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const artistData = async({ id }) => {

    let idsString = '';
    let res = {
        requestId: faker.datatype.uuid(),
        name: null,
        artistData: {},
        playlists: [],
        musics: []
    };

    res.name = id.replace(/\W/g, ' ');

    const { items=null } = await request('artistsNames', res.name);

    if(items.length){

        res.artistData = items[0];

        let resAPi = await request('musics', `?includesArtist=${res.name}&maxResult=9999`);
        res.musics = resAPi.items;
    }

    let list = await request('allPlaylist', `?withArtist=${id}`);
    res.playlists = list.items;

    return res;
}

module.exports = artistData
