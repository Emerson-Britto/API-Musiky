const allSong0 = require('../../dataBase/allSongs_Musiky_list0');
const allSong1 = require('../../dataBase/allSongs_Musiky_list1');
const allSong2 = require('../../dataBase/allSongs_Musiky_list2');
const allSong3 = require('../../dataBase/allSongs_Musiky_list3');

const musikyAllSong = [...allSong0, ...allSong1, ...allSong2, ...allSong3]


const autoComplete = (value, maxResult) => {

    var selected = []

    if (value.length > 0) {
        for (var i = 0; i < musikyAllSong.length; i++) {
            var exp = new RegExp(value, "i")
            var artist = musikyAllSong[i]['Artist']
            var title = musikyAllSong[i]['snippet']['title']
 
            artist.map(targetArtist => {
                let hasSomeEvenArtist = selected.some(value => value == targetArtist);
                if (exp.test(targetArtist) && !hasSomeEvenArtist) {
                    selected.push(targetArtist)
                }                
            })

            let hasSomeEvenTitle = selected.some(value => value == title);
            if (exp.test(title) && !hasSomeEvenTitle) {
                selected.push(title)
            }

            if(selected.length == maxResult){return selected}
        }
    }
    
    return selected;
}

module.exports = autoComplete
