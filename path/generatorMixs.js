const allSong = require('../dataBase/MusikyAllSongs');

const unBalanced = (totalPerList) => {
	let numRandom = ~~(Math.random() * 5);
	let secondNumRandom = ~~(Math.random() * 5);
	return numRandom - secondNumRandom;
}

const generatorMixs = (totalPlayList, totalPerList) => {
	var playLists = [];
	var alreadyAdded = [];

	while(Object.keys(playLists).length != totalPlayList){
		let playList = {};
		let musicList = [];

		let numRandom = ~~(Math.random() * 12);

		let img = `https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/${numRandom}.jpg`
		let name = `Mix ${Object.keys(playLists).length +1}`

		const totalThisList = unBalanced(totalPerList);

		for(let i=0; i != totalPerList + totalThisList; i++){
			let numRandom = ~~(Math.random() * allSong.length);
			let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
			if (!hasSomeEvenNumber){
			    musicList.push(allSong[numRandom])				
			}
		}
		playList['playListImg'] = img;
		playList['playListTitle'] = name;
		playList['totalMusic'] = musicList.length;
		playList['musicList'] = musicList;
		playLists.push(playList);
	}
	return playLists;
}

module.exports = generatorMixs