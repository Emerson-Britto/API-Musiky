const axios = require('axios');
/*
const randomSongs = async (totalList, resultPerList) => {
    var numed = [], musicResult = [];
    const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=999&playlistId=PLmqZgWL_h1i9TZTr6AhRhEkXSKCTvIdMr&key=AIzaSyDmGmPsa0KCP5qnHrQi384--tEvrj5u-0g`)
    for (var i = 0; i < 9; i++) {
        var numRandom = Math.floor(Math.random() * data.items.length);
        var hasSomeEvenNumber = numed.some(value => value == numRandom);
        if (hasSomeEvenNumber == false) {
            numed.push(numRandom);
            musicResult.push(data.items[numRandom]);
        }
    }

    return data;
}

module.exports = randomSongs*/


const randomSongs = async (totalList, resultPerList) => {
	var nextPag = true;
	var nextPagToken ='';
	var musicTotalResult = [];

	while(nextPag){

		const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=999${nextPagToken}&playlistId=PLmqZgWL_h1i9TZTr6AhRhEkXSKCTvIdMr&key=AIzaSyDmGmPsa0KCP5qnHrQi384--tEvrj5u-0g`)
        data.items.forEach(music => {
	        musicTotalResult.push(music);
        })

		if (musicTotalResult.length == parseInt(data.pageInfo.totalResults)){
			return musicTotalResult;
		}
		nextPagToken = `&pageToken=${data.nextPageToken}`
	}
}

module.exports = randomSongs