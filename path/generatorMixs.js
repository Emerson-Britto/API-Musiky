const allSong = require('../dataBase/MusikyAllSongs');

const selectRandomImg = () => {
	var alreadyAdded = [];
	while(true){
        let numRandom = ~~(Math.random() * 12);
        let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
        	alreadyAdded.push(numRandom)
            return `https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/${numRandom}.jpg`
        }
	}
}

const unBalanced = (totalPerList) => {
	let numRandom = ~~(Math.random() * 5);
	let secondNumRandom = ~~(Math.random() * 5);
	return numRandom - secondNumRandom;
}

const generatorMixs = (totalPlayList, totalPerList) => {
	var playListsOject = {};
	var playLists = {};
	var resumePLaylists = [];
	var alreadyAdded = [];
    console.log("dataBase  " + allSong.length)
	while(Object.keys(playLists).length !== totalPlayList){

		console.log('tamanho da list ' + Object.keys(playLists).length + ' ------ ' + totalPlayList)
		console.log("alreadyAdded " + alreadyAdded.length)
		let playList = {};
		let resumePLaylist = {};
		let musicList = [];


		let img = selectRandomImg();
		let name = `Mix ${Object.keys(playLists).length +1}`;

		const totalThisList = unBalanced(totalPerList);

		for(let i=0; musicList.length !== totalPerList + totalThisList; i++){
			if(alreadyAdded.length === allSong.length){break}
			let numRandom = ~~(Math.random() * allSong.length);
			let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
			if (!hasSomeEvenNumber){
				alreadyAdded.push(numRandom)
			    musicList.push(allSong[numRandom])				
			}
		}
		playList['playListImg'] = img;
		playList['playListTitle'] = name;
		playList['totalMusic'] = musicList.length;
		playList['musicList'] = musicList;

		resumePLaylist['playListImg'] = img;
		resumePLaylist['playListTitle'] = name;
		resumePLaylist['totalMusic'] = musicList.length;
		resumePLaylist['keyInPlaylistDetails'] = `mix${Object.keys(playLists).length +1}msk`;
		
		resumePLaylists.push(resumePLaylist);
		playLists[`mix${Object.keys(playLists).length +1}msk`] = playList
	}
	console.log("alreadyAdded " + alreadyAdded.length)
	console.log('tamanho da list ' + Object.keys(playLists).length + ' ------ ' + totalPlayList)

	playListsOject['playListResume'] = resumePLaylists
	playListsOject['playListDetails'] = playLists;

	return playListsOject;
}

module.exports = generatorMixs