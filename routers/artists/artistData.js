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

    res.name = id.replace(/\W|_/g, ' ');

    const { items=null } = await request('artist', res.name, err => console.log(err));

    if(items.length){

        res.artistData = items[0];

        let resAPi = await request('allMusics', `?withArtist=${res.name}&maxResult=9999`);
        res.musics = resAPi.items;
    }

    let list = await request('allPlaylist', `?withArtist=${res.name}`);
    res.playlists = list.items;

    return res;
}

module.exports = artistData
