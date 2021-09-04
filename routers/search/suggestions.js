const allSong0 = require('../../dataBase/allSongs_Musiky_list0');
const allSong1 = require('../../dataBase/allSongs_Musiky_list1');
const allSong2 = require('../../dataBase/allSongs_Musiky_list2');
const allSong3 = require('../../dataBase/allSongs_Musiky_list3');

const musikyAllSong = [...allSong0, ...allSong1, ...allSong2, ...allSong3]


const generateSuggestions = total => {
    var suggestionsList = [];
    var alreadyAdded = [];

    while(suggestionsList.length < total){

    	let numRandom = ~~(Math.random() * musikyAllSong.length);

    	let artists = musikyAllSong[numRandom]['Artist']

        artists.map(artist =>{

            let hasSomeEvenNumber = suggestionsList.some(value => value == artist);

            let longString = artist.length > 18;
            if (!hasSomeEvenNumber && !longString){
                suggestionsList.push(artist)
            }
        })    
    }
    return suggestionsList;
}

module.exports = generateSuggestions
