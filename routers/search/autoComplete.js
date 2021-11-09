const axios = require('axios');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let path = {
        'allMusicNames': 'music/all',
        'allArtistNames': 'artist/allNames'
    }
    let { data } = await axios.get(`${urlBase + path[name] + '?' + params}`);
    return data
}

const autoComplete = async(value, maxResult=10) => {

    let { items } = await request('allMusicNames', 'names=1&maxResult=5000');
    let { names } = await request('allArtistNames');

    var selected = [];

    if (value.length > 0) {
        for (var i = 0; i < items.length; i++) {

            var exp = new RegExp(value, "i");
            var item = items[i];
            var name = names[i];
 
            let hasSomeEvenMusic = selected.some(value => value === item);
            if (exp.test(item) && !hasSomeEvenMusic) {
                selected.push(item.replace(/^ /g, ''));
            }

            let hasSomeEvenArtist = selected.some(value => value === name);
            if (exp.test(name) && !hasSomeEvenArtist) {
                selected.push(name);
            }

            if(selected.length >= maxResult) return selected
        }
    }
    
    return selected;
}

module.exports = autoComplete
