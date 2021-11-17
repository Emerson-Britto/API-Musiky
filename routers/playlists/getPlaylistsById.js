const { request } = require('../../external/api');


const getPlaylistsById = async({ id }) => {

    let res = {
        resquestId: null,
        infors: null,
        list: []
    }

    let { infors, list, resquestId } = await request('playlistById', `?id=${id}`);

    res.infors = infors;
    res.list = list;
    res.resquestId = resquestId;

    return res;
}

module.exports = getPlaylistsById
