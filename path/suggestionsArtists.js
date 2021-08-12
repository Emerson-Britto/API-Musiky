const allSong0 = require('../dataBase/allSongs_Musiky_list0');
const allSong1 = require('../dataBase/allSongs_Musiky_list1');
const allSong2 = require('../dataBase/allSongs_Musiky_list2');
const allSong3 = require('../dataBase/allSongs_Musiky_list3');

const musikyAllSong = [...allSong0, ...allSong1, ...allSong2, ...allSong3]

const suggestionsArtists = total => {
	var suggestionsList =[]
	var alreadyAdded =[]

	while(suggestionsList !== total) {

		let randomNum = ~~(Math.random() * musikyAllSong.length)
        let hasSomeEvenNumber = alreadyAdded.some(value => value == randomNum)
        if (!hasSomeEvenNumber){
            alreadyAdded.push(numRandom)
            let artists = musikyAllSong[numRandom]['Artist']
            artists.map((artist, index) => {
            	let hasSomeEvenNumber = suggestionsList.some(value => value == artist)
            	if (!hasSomeEvenNumber){
            		suggestionsList.push(artist)
            	}
            })
        }
	}

    return suggestionsList
}

module.exports = suggestionsArtists
