const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

const song = ['meditate', 'unwind'];

let songIndex = 0;

loadSong(song[songIndex]);
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add("play");
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
function pauseSong() {
    musicContainer.classList.remove("play");
    playButton.querySelector('i.fas').classList.add('fa-play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}
function prevSong() {
    songIndex--;
    if (songIndex < 0)
        songindex = song.length - 1;
    loadSong(song[songIndex]);

    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex >= song.length) {
        songIndex = 0;
    }

    loadSong(song[songIndex]);

    playSong();
}
function updatePogBar(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}
function setPogBar(e) {
    const width = this.clientWidth;
    const clix = e.offsetX;
    const durn = audio.duration;
    audio.currentTime = (clix / width) * durn;

}
function DurTime(e) {
    const { duration, currentTime } = e.target;
    var sec;
    var sec_d;

  
    let min = (currentTime == null) ? 0 :
        Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

 
    function get_sec(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }

    get_sec(currentTime, sec);


    currTime.innerHTML = min + ':' + sec;

    
    let min_d = (isNaN(duration) === true) ? '0' :
        Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;


    function get_sec_d(x) {
        if (Math.floor(x) >= 60) {

            for (var i = 1; i <= 60; i++) {
                if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' :
                Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }
    get_sec_d(duration);

 
    durTime.innerHTML = min_d + ':' + sec_d;

};
playButton.addEventListener('click', () => {
    const playing = musicContainer.classList.contains('play');
    if (playing)
        pauseSong();
    else
        playSong();
});
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updatePogBar);
progressContainer.addEventListener('click', setPogBar);
audio.addEventListener('ended', nextSong);
audio.addEventListener('timeupdate', DurTime);