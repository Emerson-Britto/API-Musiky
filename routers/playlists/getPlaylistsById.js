const { request } = require('../../external/api');

const getPlaylistsById = async({ id }) => {
    let res = await request('playlistById', `?id=${id}`);
    return res;
}

module.exports = getPlaylistsById
