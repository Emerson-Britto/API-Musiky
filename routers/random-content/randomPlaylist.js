const { request } = require('../../external/api');


const randomPlaylists = async({ totalList }) => {
    
    let playlists = {
        request: 'random-list',
        items: [],
        length: 0
    };

    let lists = await request('allPlaylist', `?random=1&maxResult=${totalList}`);
    playlists.items = lists.items;

    playlists.length = lists.itemsLength;

    return playlists;
}

module.exports = randomPlaylists
