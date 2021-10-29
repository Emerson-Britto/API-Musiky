const axios = require('axios');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        ambienceSongs: 'music/all'
    }

    let { data } = await axios.get(`${urlBase + type[name] + '?' + params}`);
    return data
}

const randomSongs = async({listType, maxResult=6 }) => {

    let { items } = await request(listType, `maxResult=${maxResult}&categoryInput=${listType}`);

    return items;
}

module.exports = randomSongs