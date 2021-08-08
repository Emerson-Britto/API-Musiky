const ambienceSong = require('../dataBase/playlists/long_Songs-Ambient');

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

const getDiskList = totalList => {
    var diskList = [];
    var alreadyAdded = [];
    //var imagemAdded = [];

    while(diskList.length !== totalList){

        //let img = selectRandomImg(imagemAdded);
        
        if(alreadyAdded.length === ambienceSong.length){break}
        let numRandom = ~~(Math.random() * ambienceSong.length);
        let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
            alreadyAdded.push(numRandom)
            diskList.push(ambienceSong[numRandom])              
        }
    }

    return diskList;
}

module.exports = getDiskList