const axios = require('axios');

const urlBase = process.env.DEV_ENV 
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const request = async(name, params='') => {
    let path = {
        'allMusicNames': 'music/all'
    }
    let { data } = await axios.get(`${urlBase + path[name] + '?' + params}`);
    return data
}

const autoComplete = async(value, maxResult=10) => {

    let { items } = await request('allMusicNames', 'names=1&artists=1&maxResult=5000')

    var selected = [];

    if (value.length > 0) {
        for (var i = 0; i < items.length; i++) {

            var exp = new RegExp(value, "i");
            var item = items[i];
 
            let hasSomeEvenArtist = selected.some(value => value === item);
            if (exp.test(item) && !hasSomeEvenArtist) {
                selected.push(item);
            }

            if(selected.length >= maxResult) return selected
        }
    }
    
    return selected;
}

module.exports = autoComplete
