const axios = require('axios');

const getListFromYT = async (idsTotalResult, key) => {
	var totalToSearch = idsTotalResult.length;
	var musicTotalResult =[];
    var listToSearch =[];
    var alreadyResearched = 0;

    while(true){
    	while(listToSearch.length != totalToSearch){
		    listToSearch.push( idsTotalResult[alreadyResearched] )
		    alreadyResearched++

		    if(listToSearch.length == 50){
		    	totalToSearch = totalToSearch - listToSearch.length;

				var ids = listToSearch.join('%2C')
				var { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${key}`)
			    data.items.forEach(music => {
			        musicTotalResult.push(music);
			    })

				listToSearch =[]; 
		    }
    	}
		var ids = listToSearch.join('%2C')
		var { data } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${ids}&key=${key}`)
	    data.items.forEach(music => {
	        musicTotalResult.push(music);
	    })

	    musicTotalResult.forEach(music =>{
	    	delete music['snippet']['description']
	    	delete music['snippet']['localized']['description']
	        delete music['kind']
	    	delete music['etag']
	    	delete music['snippet']['tags']
	    	delete music['snippet']['thumbnails']['high']
	    	delete music['snippet']['thumbnails']['standard']
	    	delete music['snippet']['publishedAt']
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