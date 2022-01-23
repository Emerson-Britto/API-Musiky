const { request } = require('../../external/api');
const faker = require('faker');


const randomPlaylists = async({ totalList, category='all' }) => {
    
    let playlists = {
        request: 'random-list',
        requestId: faker.datatype.uuid(),
        items: [],
        length: 0
    };

    let lists = await request(
        'allPlaylist',
        `?random=1&categoryInput=${category}&maxResult=${totalList}`
    );
    playlists.items = lists.items;
    playlists.length = lists.itemsLength;

    return playlists;
}

module.exports = randomPlaylists
