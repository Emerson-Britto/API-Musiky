const axios = require('axios');
const faker = require('faker')

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        allNames: 'artist/getByIndex/'
    }

    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const randomArtists = async({ maxResult=6 }) => {

    let res = {
        maxResult: maxResult,
        provider: 'Musiky API',
        resquestId: faker.datatype.uuid(),
        artists: []
    };

    while(res.artists.length < parseInt(maxResult)){
        let { indexContent } = await request('allNames', ~~(Math.random() * 200));
        res.artists.push(indexContent);
    }

    return res;
}

module.exports = randomArtists