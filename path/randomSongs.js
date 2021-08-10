const allSong0 = require('../dataBase/allSongs_Musiky_list0');
const allSong1 = require('../dataBase/allSongs_Musiky_list1');
const allSong2 = require('../dataBase/allSongs_Musiky_list2');
const allSong3 = require('../dataBase/allSongs_Musiky_list3');

const musikyAllSong = [...allSong0, ...allSong1, ...allSong2, ...allSong3]

//const musikyAllSong = require(`../dataBase/allSongs_Musiky_list${~~(Math.random() * 4)}`);

const selectRandomImg = (imagemAdded) => {
    while(true){
        let numRandom = ~~(Math.random() * 12);
        let hasSomeEvenNumber = imagemAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
            imagemAdded.push(numRandom)
            return `https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/${numRandom}.jpg`
        }
    }
}

const unBalanced = (totalPerList) => {
    let numRandom = ~~(Math.random() * 5);
    let secondNumRandom = ~~(Math.random() * 5);
    return numRandom - secondNumRandom;
}

const setArtistListOnMusic = (musicTitle) => {
    var filterMinusSign = musicTitle.split("-", 1);
    var filterCommas = filterMinusSign.split(",");
    return filterCommas
}

const randomSongs = (totalList, totalPerList, listPrefix='mix', listSuffix='eMeb-msk-mU51ky4', valueExact='false') => {
    var playListsOject = {};
    var playLists = {};
    var resumePLaylists = [];
    var alreadyAdded = [];
    var imagemAdded = [];
    var unBalanceThisList = 0;
    while(Object.keys(playLists).length !== totalList){

        let playList = {};
        let resumePLaylist = {};
        let musicList = [];


        let img = selectRandomImg(imagemAdded);
        let name = `Mix ${Object.keys(playLists).length +1}`;

        if(valueExact === 'false') {
            unBalanceThisList = unBalanced(totalPerList);
        }
        
        for(let i=0; musicList.length !== totalPerList + unBalanceThisList; i++){
            if(alreadyAdded.length === musikyAllSong.length){break}
            let numRandom = ~~(Math.random() * musikyAllSong.length);
            let hasSomeEvenNumber = alreadyAdded.some(value => value == numRandom);
            if (!hasSomeEvenNumber){
                alreadyAdded.push(numRandom)
                let musicWithArtistFilter = musikyAllSong[numRandom]
                let targetTitleToFilter = musikyAllSong[numRandom].snippet.title
                musicWithArtistFilter['Artist'] = setArtistListOnMusic(targetTitleToFilter);
                musicList.push(musicWithFilterArtist)
            }
        }
        playList['playListImg'] = img;
        playList['playListTitle'] = name;
        playList['totalMusic'] = musicList.length;
        playList['musicList'] = musicList;

        resumePLaylist['playListImg'] = img;
        resumePLaylist['playListTitle'] = name;
        resumePLaylist['totalMusic'] = musicList.length;
        resumePLaylist['keyInPlaylistDetails'] = `${ listPrefix + Object.keys(playLists).length+1 + listSuffix }`;
        
        resumePLaylists.push(resumePLaylist);
        playLists[`${ listPrefix + Object.keys(playLists).length+1 + listSuffix }`] = playList
    }

    playListsOject['playListResume'] = resumePLaylists
    playListsOject['playListDetails'] = playLists;

    return playListsOject;
}

module.exports = randomSongs
