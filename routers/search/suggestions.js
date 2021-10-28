const axios = require('axios');


const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9873}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let type = {
        'allArtistsNames': 'artist/allNames'
    }
    let { data } = await axios.get(`${urlBase + type[name] + params}`);
    return data
}

const generateSuggestions = async(total) => {

    let { names } = await request('allArtistsNames')

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
