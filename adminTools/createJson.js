const axios = require('axios');

const setDuration = (music) => {
	var fliter1 = music['contentDetails']['duration'].replace('PT', '');
	filter2 = fliter1.replace(/M\dS/, ':00');
	filter3 = filter2.replace(/M(?!\d)/, ':00').replace(/M/, ':').replace(/S/, '');
	if(filter3.length === 4){ return filter3.replace(/H/, ':00:') }
	if(filter3.length === 6){ return filter3.replace(/H/, ':0') }
	return filter3.replace(/H/, ':')
}

const getApiResult = async (listToSearch, resultNoFormat, key) => {
	var ids = listToSearch.join('%2C')
	var { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${key}`)
    data.items.forEach(music => {
        resultNoFormat.push(music);
    })	
}

const getListFromYT = async (idsTotalResult, key) => {
	var totalToSearch = idsTotalResult.length;
	var resultNoFormat =[];
	var musicTotalResult =[];
    var listToSearch =[];
    var alreadyResearched = 0;

    while(true){
    	while(listToSearch.length != totalToSearch){
		    listToSearch.push( idsTotalResult[alreadyResearched] )
		    alreadyResearched++

		    if(listToSearch.length == 50){
		    	totalToSearch = totalToSearch - listToSearch.length;

                await getApiResult(listToSearch, resultNoFormat, key);

				listToSearch =[]; 
		    }
    	}

        await getApiResult(listToSearch, resultNoFormat, key);

	    resultNoFormat.forEach(music =>{
	    	delete music['snippet']['description']
	    	delete music['snippet']['localized']['description']
	        delete music['kind']
	    	delete music['etag']
	    	delete music['snippet']['tags']
	    	delete music['snippet']['thumbnails']['high']
	    	delete music['snippet']['thumbnails']['standard']
	    	delete music['snippet']['publishedAt']

	    	var re = /.(\(|\[)(.)?\w+(.\w+)?(\)|\]|.)(-.|\/.)?(\w+.\w+)?(\]|\))?/;
	    	music['snippet']['title'] = music['snippet']['title'].replace(re, '');

	    	music['contentDetails']['duration'] = setDuration(music);

	        let hasSomeEvenNumber = musicTotalResult.some(value => value.id === music.id);
	        if (hasSomeEvenNumber === false){
	            musicTotalResult.push(music);
	        }
	    })

	    return musicTotalResult;
    }
}

const createJson = async (playlistId, key) => {
	var nextPag = true;
	var nextPagToken ='';
	var idsTotalResult = [];

	while(nextPag){

		const { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=999${nextPagToken}&playlistId=${playlistId}&key=${key}`)
        data.items.forEach(music => {
	        idsTotalResult.push(music.snippet.resourceId.videoId);
        })

		if (idsTotalResult.length == parseInt(data.pageInfo.totalResults)){
			return await getListFromYT(idsTotalResult, key)
		}
		nextPagToken = `&pageToken=${data.nextPageToken}`
	}
}

module.exports = createJson