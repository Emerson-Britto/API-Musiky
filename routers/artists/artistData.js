const faker = require('faker');
const { request } = require('../../external/api');


const artistData = async({ id }) => {

    let idsString = '';
    let res = {
        requestId: faker.datatype.uuid(),
        name: null,
        artistData: {},
        playlists: [],
        musics: []
    };

    const { items=null } = await request(
        'artist',
        `${id}?type=name`
    );

    if(items.length){

        res.artistData = items[0];

        let resAPi = await request('allMusics', `?withArtist=${id}&maxResult=9999`);
        res.musics = resAPi.items;
    }

    let list = await request('allPlaylist', `?withArtist=${id}`);
    res.playlists = list.items;

    return res;
}

module.exports = artistData
