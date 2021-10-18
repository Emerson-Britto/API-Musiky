const allSong0 = require('../../dataBase/allSongs_Musiky_list0');
const allSong1 = require('../../dataBase/allSongs_Musiky_list1');
const allSong2 = require('../../dataBase/allSongs_Musiky_list2');
const allSong3 = require('../../dataBase/allSongs_Musiky_list3');

const musikyAllSong = [...allSong0, ...allSong1, ...allSong2, ...allSong3]


const selectRandomImg = imagemAdded => {
    while(true){
        let numRandom = ~~(Math.random() * 24);
        let hasSomeEvenNumber = imagemAdded.some(value => value == numRandom);
        if (!hasSomeEvenNumber){
            imagemAdded.push(numRandom)
            return `https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/${numRandom}.jpg`
        }
    }
}

const unBalanced = totalPerList => {
    let numRandom = ~~(Math.random() * 5);
    let secondNumRandom = ~~(Math.random() * 5);
    return numRandom - secondNumRandom;
}

const randomPlaylists = config => {
    
    let listPrefix = config.listPrefix ? config.listPrefix : 'mix';
    let listSuffix = config.listSuffix ? config.listSuffix : 'eMeb-msk-mU51ky4';

    let totalList = parseInt(config.totalList)
    let totalPerList = parseInt(config.totalPerList)

    let playListsOject = {};
    let playLists = {};
    let resumePLaylistsInfor = [];
    let numberAlreadyAdded = [];
    let imagemAdded = [];
    let unBalanceThisList = 0;

    while(Object.keys(playLists).length !== totalList){

        let playList = {};
        let resumePLaylist = {};
        let musicList = [];


        let img = selectRandomImg(imagemAdded);
        let name = `Mix ${Object.keys(playLists).length +1}`;

        if(!config.valueExact || config.valueExact == 'false') {
            unBalanceThisList = unBalanced(totalPerList);
        }
        
        for(let i=0; musicList.length !== totalPerList + unBalanceThisList; i++){
            if(numberAlreadyAdded.length === musikyAllSong.length){break}
            let numRandom = ~~(Math.random() * musikyAllSong.length);
            let hasSomeEvenNumber = numberAlreadyAdded.some(value => value == numRandom);
            if (!hasSomeEvenNumber){
                numberAlreadyAdded.push(numRandom)
                let targetMusisc = musikyAllSong[numRandom]
                musicList.push(targetMusisc)
            }
        }
        playList['playListImg'] = img;
        playList['playListTitle'] = name;
        playList['totalMusic'] = musicList.length;
        playList['musicList'] = musicList;

        resumePLaylist['playListImg'] = img;
        resumePLaylist['playListTitle'] = name;
        resumePLaylist['totalMusic'] = musicList.length;
        resumePLaylist['keyInPlaylistDetails'] = `${ listPrefix + 'cs50' + Object.keys(playLists).length+1 + listSuffix }`;
        
        resumePLaylistsInfor.push(resumePLaylist);
        playLists[`${ listPrefix + 'cs50' + Object.keys(playLists).length + 1 + listSuffix }`] = playList
    }

    playListsOject['playListResume'] = resumePLaylistsInfor
    playListsOject['playListDetails'] = playLists;

    return playListsOject;
}

module.exports = randomPlaylists
