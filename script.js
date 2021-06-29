const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const progresBar = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')




const music = document.querySelector('audio')
const prev = document.getElementById('prev')
const play = document.getElementById('play')
const next = document.getElementById('next')

const song = [
    {
        name:'jacinto-1',
        displayName: 'Electirc chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name:'jacinto-2',
        displayName: 'Seven Nation Army',
        artist: 'Jacinto Design'
    },
    {
        name:'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name:'metric-1',
        displayName: 'Front row(Remix)',
        artist: 'Metric/jacinto Design'
    }
]

let isPlay = false

function playSong(){
    isPlay=true
    play.classList.replace('fa-play','fa-pause')
    play.setAttribute('title','Pause')
    music.play()
}

function pauseSong(){
    isPlay=false
    play.classList.replace('fa-pause','fa-play')
    play.setAttribute('title','Pause')
    music.pause()
}


play.addEventListener('click', ()=>{
    (isPlay?pauseSong():playSong());
})

function loadSong(song){
    title.textContent=song.displayName
    artist.textContent=song.artist
    music.src=`music/${song.name}.mp3`
    image.src=`img/${song.name}.jpg`
}
let songIndex=0

function prevSong(){

    songIndex--
    if(songIndex<0){
        songIndex=song.length-1
    }
    loadSong(song[songIndex]);
    playSong();

}

function nextSong(){
    songIndex++
    if(songIndex>song.length-1){
        songIndex=0
    }
    loadSong(song[songIndex]);
    playSong();

}

loadSong(song[songIndex]);

function updateProgress(e){
    if(isPlay)
    {
        const {duration , currentTime} = e.srcElement
        const progressPercent = (currentTime/duration)*100
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration/60)
        let durationSeconds = Math.floor(duration%60)
        if(durationSeconds<10){
            durationSeconds=`0${durationSeconds}`
        }

        if(durationSeconds){

            durationEl.textContent=`${durationMinutes}:${durationSeconds}`
        }

        const currentMinutes = Math.floor(currentTime/60)
        let currentSeconds = Math.floor(currentTime%60)
        if(currentSeconds<10){
            currentSeconds=`0${currentSeconds}`
        }
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`

    }

}

function setProgressBar(e){
   console.log(music)
    const clickX = e.offsetX
    const width = this.clientWidth
    const {duration} = music
    music.currentTime=(clickX/width)*duration
}

prev.addEventListener('click',prevSong)
next.addEventListener('click',nextSong)
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgress)
progresBar.addEventListener('click',setProgressBar)