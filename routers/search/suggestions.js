const { request } = require('../../external/api');


const generateSuggestions = async(total) => {

    let { names } = await request('allArtistNames')

    var suggestionsList = [];

    while(suggestionsList.length < total){

    	let numRandom = ~~(Math.random() * names.length);
    	let artistName = names[numRandom]

        let hasSomeEvenName = suggestionsList.some(value => value == artistName);

        if (!hasSomeEvenName){
            suggestionsList.push(artistName)
        }  
    }
    return suggestionsList;
}

module.exports = generateSuggestions
