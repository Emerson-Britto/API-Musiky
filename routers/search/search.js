const faker = require('faker');
const { request } = require('../../external/api');


const search = async({ input }) => {

    let res = {
        input: input,
        provider: 'istatics',
        requestId: faker.datatype.uuid(),
        searchTop: null,
        artists: [],
        musics: []
    };

	input = input.replace(/\W/g, ' ');

	const { items=null } = await request('artist', input);

    if(items){
        res.searchTop = items[0];
        res.artists = items;

        let resAPi = await request('allMusics', `?withArtist=${res.searchTop.name}&maxResult=9999`);

        res.musics = resAPi.items;
    }

    return res
}

module.exports = search