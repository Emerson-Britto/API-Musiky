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

    input = input.replace(/\W|_/g, ' ');

	const { items=null } = await request('artist', input);

    console.log({items});

    if(items){
        res.searchTop = items[0];
        res.artists = items;

        let resAPi = await request('allMusics', `?withArtist=${items[0].name.replace(/\W|_/g, ' ')}&maxResult=9999`);

        console.log({resAPi});

        res.musics = resAPi.items;
    }

    return res
}

module.exports = search