const allSong = require('../dataBase/MusikyAllSongs');

const randomSongs = async (totalResult) => {
	
    var alreadyAdded = [], musicResult = [];

    for (var i = 0; musicResult.length < totalResult; i++) {
        var numRandom = Math.floor(Math.random() * allSong.length);
        var hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
        if (hasSomeEvenNumber == false) {
            alreadyAdded.push(numRandom);
            musicResult.push(allSong[numRandom]);
        }
    }

    return musicResult;
}

module.exports = randomSongs
