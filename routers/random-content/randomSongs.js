const songList = {
    ambienceSong: require('../../dataBase/playlists/long_Songs-Ambient'),
    mashupSongs: require('../../dataBase/playlists/mashupSongs'),
    megaMixs: require('../../dataBase/playlists/MegaMixs')
}

const selectRandomImg = (imagemAdded) => {
    while(true){
        let numRandom = ~~(Math.random() * 12);
        let hasSomeEvenNumber = imagemAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
            imagemAdded.push(numRandom)
            return `https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/${numRandom}.jpg`
        }
    }
}

const randomSongs = (totalList, listType) => {
    var songs = [];
    var alreadyAdded = [];
    //var imagemAdded = [];

    while(songs.length !== totalList){

        //let img = selectRandomImg(imagemAdded);
        
        if(alreadyAdded.length === songList[listType].length){break}
        let numRandom = ~~(Math.random() * songList[listType].length);
        let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
            alreadyAdded.push(numRandom)
            songs.push(songList[listType][numRandom])              
        }
    }

    return songs;
}

module.exports = randomSongs