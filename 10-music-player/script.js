const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
	title.innerHTML = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

function playSong() {
	musicContainer.classList.add('play');
	playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	audio.play();
}

function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.innerHTML = '<i class="fas fa-play"></i>';
	audio.pause();
}

function prevSong() {
	songIndex--;

	if(songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex]);
	playSong();
}

function nextSong() {
	songIndex++;

	if(songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex]);
	playSong();
}

function updateProgress(e) {
	const {duration, currentTime} = e.srcElement;
	const progerssPercent = (currentTime / duration) * 100;
	progress.style.width = `${progerssPercent}%`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if(isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
