const axios = require('axios');

const playlistsJson = require('../../dataBase/playlists/random.json');


const randomPlaylists = async({ totalList }) => {
    
    let playlists = {
        request: 'random-list',
        items: [],
        length: 0
    };

    let evenAdded = [];

    while(playlists.items.length !== parseInt(totalList)){

        let numRandom = ~~(Math.random() * playlistsJson.length -1);

        let list = playlistsJson[numRandom];

        let hasSome = evenAdded.some(value => value === numRandom);

        if(!hasSome && list.key){
            list.infors.length = list.key.split('-ii-').length;
            evenAdded.push(numRandom);
            playlists.items.push(list);
        }
    }

    playlists.length = playlists.items.length;

    return playlists;
}

module.exports = randomPlaylists
