const songList = {
    ambienceSong: require('../../dataBase/playlists/long_Songs-Ambient'),
    mashupSongs: require('../../dataBase/playlists/mashupSongs'),
    megaMixs: require('../../dataBase/playlists/MegaMixs')
}

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9873}/`
    : 'https://cdn-istatics.herokuapp.com/'


const randomSongs = (totalList, listType) => {
    
    var songs = [];
    var alreadyAdded = [];

    while(songs.length !== totalList){
        
        if(alreadyAdded.length === songList[listType].length){ break }

        let numRandom = ~~(Math.random() * songList[listType].length);
        let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
            alreadyAdded.push(numRandom)
            songs.push(songList[listType][numRandom])              
        }
    }

    return songs;
}

function randomImg(imagensEvenAdded){
    while(true){
        let numRandom = ~~(Math.random() * 12);
        let hasSomeEvenNumber = imagensEvenAdded.some(value => value == numRandom);

        if (!hasSomeEvenNumber){
            imagensEvenAdded.push(numRandom)
            return `${urlBase}static/imgs/chill/${numRandom}.jpg`
        }
    }
}


module.exports = randomSongs