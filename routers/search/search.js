const faker = require('faker');
const axios = require('axios');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        artistsNames: 'artist/',
        musics: 'music/all'
    }

    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const search = async({ input }) => {

    let res = {
        input: input,
        provider: 'istatics',
        requestId: faker.datatype.uuid(),
        searchTop: null,
        artists: [],
        musics: []
    };

	input = input.replace(/\W/g, ' ');

	const { items=null } = await request('artistsNames', input);

    if(items){
        res.searchTop = items[0];
        res.artists = items;

        let resAPi = await request('musics', `?includesArtist=${res.searchTop.name}&maxResult=9999`);

        res.musics = resAPi.items;
    }

    return res
}

module.exports = search