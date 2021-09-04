const axios = require('axios');

const allSong0 = require('../dataBase/allSongs_Musiky_list0');
const allSong1 = require('../dataBase/allSongs_Musiky_list1');
const allSong2 = require('../dataBase/allSongs_Musiky_list2');
const allSong3 = require('../dataBase/allSongs_Musiky_list3');

const musikyAllSong = [...allSong0, ...allSong1, ...allSong2, ...allSong3]

const getData = async(artistNames) => {
	artistNames.map(async(name, i)=> {
		let newName = name.replaceAll(' ', '+').replaceAll('.','+')
		console.log(newName)
		var { data } = await axios.get(`https://api.spotify.com/v1/search?q=${newName}&type=artist`)
		console.log(data)
		return data
	})
}

const createArtistsImg = async() => {
	artistsImg ={}
	artistNames =[]

	musikyAllSong.map((music, i)=> {

		artistList = music['Artist']

		artistList.map(artist => {

            let hasSomeEvenNumber = artistNames.some(value => value == artist);

            let longString = artist.length > 18;
            if (!hasSomeEvenNumber && !longString){
                artistNames.push(artist)
            }
        })
	})
	console.log(artistNames)
	return getData(artistNames)

}

module.exports = createArtistsImg
// https://api.spotify.com/v1/search?q=khalid&type=artist