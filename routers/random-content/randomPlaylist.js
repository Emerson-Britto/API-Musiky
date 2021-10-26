const axios = require('axios');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9873}/`
    : 'https://cdn-istatics.herokuapp.com/'

const playlistNames = [
    "random songs",
    "day mix",
    "just a mix",
    "the songs",
    "maybe you like it",
    "let's play",
    "I mean",
    "get some music",
    "choices",
    "explore new things",
    "a random world",
    "maybe you don't know"
]

const request = async(name, params='') => {
    let type = {
        'AllIds': 'music/getAllIds',
        'mountPlaylist': 'playlist/'
    }
    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const unBalanced = totalPerList => {
    return totalPerList + (~~(Math.random() * 5) - ~~(Math.random() * 5));
}

const randomPlaylists = async(config) => {

    let { ids } = await request('AllIds');

    let totalList = parseInt(config.totalList)
    let totalPerList = parseInt(config.totalPerList)

    let playlists = {
        request: 'random-list',
        items: [],
        length: 0
    };
    let resumePLaylistsInfor = [];
    let imagensEvenAdded = [];
    let namesEvenAdded = [];

    while(playlists.items.length !== totalList){

        let playlist = {
            infors: {
                playlistId: null,
                img: null,
                title: null,
                description: null,
                length: null,
                totalDuration: 0
            },
            list: [],
        };
        let idsList =[];

        playlist.infors.img = randomImg(imagensEvenAdded);
        playlist.infors.title = randomName(namesEvenAdded);

        totalPerList = unBalanced(totalPerList);

        for(let i=0; idsList.length !== totalPerList; i++){

            if(idsList.length === ids.length){ break }

            let numRandom = ~~(Math.random() * ids.length);
            let hasEvenId = idsList.some(id => id == ids[numRandom]);
            if (!hasEvenId){
                idsList.push(ids[numRandom])
            }
        }

        idsList = idsList.join('-ii-');

        let { list, resquestId } = await request('mountPlaylist', idsList);

        playlist.list = list;
        playlist.infors.length = list.length;
        playlist.infors.playlistId = resquestId;

        playlists.items.push(playlist);
    }

    playlists.length = playlists.items.length;

    return playlists;
}


function randomName(namesEvenAdded){
    while(true){
        let numRandom = ~~(Math.random() * playlistNames.length);
        let hasSomeEvenNumber = namesEvenAdded.some(value => value == numRandom);

        if (!hasSomeEvenNumber){
            namesEvenAdded.push(numRandom)
            return playlistNames[numRandom]
        }
    }
}


function randomImg(imagensEvenAdded){
    while(true){
        let numRandom = ~~(Math.random() * 24);
        let hasSomeEvenNumber = imagensEvenAdded.some(value => value == numRandom);

        if (!hasSomeEvenNumber){
            imagensEvenAdded.push(numRandom)
            return `${urlBase}static/imgs/chill/${numRandom}.jpg`
        }
    }
}

module.exports = randomPlaylists
