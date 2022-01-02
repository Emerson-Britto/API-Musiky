const { request } = require('../../external/api');


const randomSongs = async({listType, maxResult=6 }) => {
    let { items } = await request('allMusics', `?maxResult=${maxResult}&categoryInput=${listType}`);
    return items;
}

module.exports = randomSongs