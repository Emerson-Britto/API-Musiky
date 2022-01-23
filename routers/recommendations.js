const randomPlaylist = require('./random-content/randomPlaylist');
const getPlaylistsById = require('./playlists/getPlaylistsById');
const artistData = require('./artists/artistData');

const recommendations = async() => {
	let noVocals = await getPlaylistsById({ id: 'PLrQmjsgFFZHi2KZhTy8717zlVnSi6Jiat' });
	let officialVideos = await getPlaylistsById({ id: 'PLrQmjsgFFZHiLLcr1cKedzZVBMnujZQEE' });
	let song = noVocals.list[~~(Math.random() * noVocals.list.length - 1)];
	let data = await artistData({ id: song.artists[0].replace(/ /gi, '-') });
	let tragetTitle = new RegExp(song.title, 'i');
	let tragetArtist = new RegExp(song.artists[0], 'i');
	let clip = officialVideos.list.find(vid => {
		return tragetTitle.test(vid.originTitle) 
		&& tragetArtist.test(vid.originTitle)
		|| tragetArtist.test(vid.artists[0])
	});

	return {
		instrumental: song,
		artist: data.artistData,
		clip: clip
	}
};

module.exports = recommendations;