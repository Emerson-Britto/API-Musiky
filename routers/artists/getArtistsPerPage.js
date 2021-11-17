const { request } = require('../../external/api');


const getArtistsPerPage = async({ page }) => {

    let { items } = await request('artistPerPage', `?page=${page}`);

    return items;
}

module.exports = getArtistsPerPage
