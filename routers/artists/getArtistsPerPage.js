const axios = require('axios');


const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        'getPerPage': 'artist/getAllArtistsPerPage'
    }
    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const getArtistsPerPage = async({ page }) => {

    let list = [];

    let { items } = await request('getPerPage', `?page=${page}`);

    list = items;

    return list;
}

module.exports = getArtistsPerPage
