const playPauseButton = document.querySelector('.play-pause')
const forwardButton = document.querySelector('.forward')
const backwardButton = document.querySelector('.backward')
const body = document.querySelector('body')
const cover = document.querySelector('.cover')
const title = document.querySelector('.title')
const cdDesign = document.querySelector('.cdDesign')
const volumeDisplay = document.querySelector('#volumeDisplay')
const volumeBar = document.querySelector('.volumeBar')
const playlistDisplay = document.querySelector('.playlistDisplay')
const playlistView = document.querySelector('.playlistView')
const loaderText = document.querySelectorAll('.loader span')
let pause = 0
let playTime = 0
let playCount = 0

//Loader
let loading = true
function startLoad(){
    j = 400
    for (let i = 0; i < 9; i++){
        setInterval(() => {
            loaderText[i].style.opacity = '1'
            loaderText[i].style.color = '#fff'
            loaderText[i].style.textShadow = '2px 2px 10px #A3A3A3'
        }, j);
        j += 400
    }    
}

//Update Playtime
function updatePlayTime(reverseTimer) {
    let audioTimerReverse = (reverseTimer) ? audio.duration - audio.currentTime : audio.currentTime

    const totalTime = Math.floor(audio.duration % 60) //it is converting totalTime into minutes
    const audioCurrentTime = Math.floor(audioTimerReverse % 60)

    if (audioCurrentTime) {
        if (reverseTimer) {
            document.querySelector('.playTime').innerHTML = `-${Math.floor(audioTimerReverse / 60)}: ${(audioCurrentTime < 10) ? '0' + audioCurrentTime : audioCurrentTime}`
        }
            
        else if (!reverseTimer){
            document.querySelector('.playTime').innerHTML = `${Math.floor(audioTimerReverse / 60)}:${(audioCurrentTime < 10) ? '0' + audioCurrentTime : audioCurrentTime}`
        }
        
    }
    
    if (totalTime) {
       document.querySelector('.totalTime').innerHTML = `${Math.floor(audio.duration / 60)}:${(totalTime < 10) ? '0' + totalTime : totalTime}` 
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

//play/pause Song
function PlayPauseSong(){
    if (pause===0) {
        if (playTime===0) {
            audio = new Audio(songsList[playCount].path)
        }
        audio.play()
        pause=1

        cover.src = songsList[playCount].cover
        title.innerHTML = songsList[playCount].name

        playPauseButton.innerHTML = `<svg class='pause' id="controlButton" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><style>svg{fill:#ffffff}</style><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`
        cover.style.animationName = 'rotateImg'
        cover.style.border = '1px solid rgba(255, 255, 255, 0.500)'
        cdDesign.style.opacity = '1'
    }
    else if(pause===1){
        audio.pause()
        pause=0
        playPauseButton.innerHTML = `<svg class="play" id="controlButton" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><style>svg{fill:#ffffff}</style><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`
        cover.style.border = ''
        cover.style.animationName = ''
        cdDesign.style.opacity = '0'
    }


    // listen time update
    /*
    playTime is percentage of music played - (currentTime/duration)*100
    playTimeBar is music progress bar which total length is 360 degree. 360*(playTime)/100
    shadowBar is little bit ahead of main bar
    */
    audio.addEventListener('timeupdate', () => {
        updatePlayTime(reverseTimer)

        playTime = (audio.currentTime/audio.duration)
        let playTimeBar = 360*(playTime)
        let shadowBar = 360*(playTime/12)
        body.style.setProperty('--changePlayTime', `conic-gradient(#FF0059 ${playTimeBar}deg, transparent ${playTimeBar+shadowBar}deg)`)

        if(playTimeBar===360){
            playTime = 0
            playCount+=1
            PlayPauseSong()
            if (playCount >= songsList.length-1) {
                playCount= -1
            }
        }
    })
}



// Loading Screen
if (loading) {
    startLoad()
}

window.addEventListener('load', () => {
    document.querySelector('.loaderPage').style.opacity = '0'
    setTimeout(() => {
        document.querySelector('.loaderPage').style.display = 'none'
    }, 600);
    loading = false
})


//Player
//Song List
const songsList = [ {name: 'If You Believe', cover: 'song/If You Believe.jpeg', path: 'song/If You Believe.mp3'},
                    {name: 'Mera Safar', cover: 'song/Mera_Safar.jpeg', path: 'song/Mera_Safar.mp3'},
                    {name: "It's You", cover: "song/It's_You.jpeg", path: "song/It's_You.mp3"},
                    {name: 'Daylight', cover: 'song/Daylight.jpeg', path: 'song/Daylight.mp3'},
                    {name: "Busy Earnin'", cover: "song/Busy_Earnin'.jpeg", path: "song/Busy_Earnin'.mp3"},
                    {name: 'New Kings', cover: 'song/New_Kings.jpeg', path: 'song/New_Kings.mp3'},
                    {name: 'Happy Man', cover: 'song/Happy_Man.jpeg', path: 'song/Happy_Man.mp3'},
                    {name: 'Something in the way', cover: 'song/Something_In_The_Way.jpeg', path: 'song/Something_In_The_Way.mp3'},
                    {name: 'Blinding Lights', cover: 'song/Blinding_Lights.jpeg', path: 'song/Blinding_Lights.mp3'},
                    {name: 'Hustler', cover: 'song/Hustler.jpeg', path: 'song/Hustler.mp3'},
                    {name: 'Hum katha Sunate', cover: 'song/Hum_katha_Sunate_Shri_Ram_Ki.jpeg', path: 'song/Hum_katha_Sunate_Shri_Ram_Ki.mp3'},
                    {name: 'Can You Hear me', cover: 'song/Can_You_Hear_me.jpeg', path: 'song/can_you_hear_me.mp3'},
                    {name: "Waving' Flag", cover: "song/Wavin'_Flag.jpeg", path: "song/Wavin'_Flag.mp3"},
                    {name: 'Whatever It Takes', cover: 'song/Whatever_It_Takes.jpeg', path: 'song/Whatever_It_Takes.mp3'},
                    {name: 'Wrecked', cover: 'song/Wrecked.jpeg', path: 'song/Wrecked.mp3'},                    
]


//shuffle the songsList
shuffle(songsList)
cover.src = songsList[playCount].cover
title.innerHTML = songsList[playCount].name


let audio = new Audio(songsList[playCount].path)

// play and pause
playPauseButton.addEventListener('click', PlayPauseSong)
body.addEventListener('keypress', (e) => {
    if (e.key === ' ') {
        PlayPauseSong()
    }
})

//forward And backward
forwardButton.addEventListener('click', () => {
    audio.pause()
    playTime = 0
    pause = 0
    playCount+=1
    if (playCount === songsList.length) {
        playCount=0
    }
    PlayPauseSong()
    playPauseButton.innerHTML = `<svg class='pause' id="controlButton" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><style>svg{fill:#ffffff}</style><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`
})

backwardButton.addEventListener('click', () => {
    audio.pause()
    playTime = 0
    pause = 0
    playCount-=1
    if (playCount < 0) {
        playCount = songsList.length - 1
    }
    pause = 0
    PlayPauseSong()
    playPauseButton.innerHTML = `<svg class='pause' id="controlButton" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><style>svg{fill:#ffffff}</style><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>`
})


// Change the Play Time to Time left
reverseTimer = false
document.querySelector('.playTime').addEventListener('click', () => {
    reverseTimer = (reverseTimer) ? false : true
})


//playlist
songsList.forEach(element => {
    const span = document.createElement("span");
    span.innerHTML = `<img src="${element.cover}" alt="M" class="playlistCover"><div class="playlistTitle">${element.name}</div>`
    playlistView.appendChild(span)
});

let playlistVisible = 0

playlistDisplay.addEventListener('click', () => {
    

    if (playlistVisible===0) {
        playlistView.style.opacity = '1'
        playlistDisplay.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 384 512"><style>svg{fill:#ffffff}</style><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>'
        playlistVisible = 1
    }
    else {
        playlistView.style.opacity = '0'
            playlistDisplay.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 448 512"><style>svg{fill:#ffffff}</style><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>'
        playlistVisible = 0
    }
})
