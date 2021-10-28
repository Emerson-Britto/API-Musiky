const axios = require('axios');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9873}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        ambienceSongs: 'music/getAllMusics'
    }

    let { data } = await axios.get(`${urlBase + type[name] + '?' + params}`);
    return data
}

const randomSongs = async(listType, page=20) => {

    let { items } = await request(listType, `page=${page}&filter=${listType}`);

    return items;
}

module.exports = randomSongs