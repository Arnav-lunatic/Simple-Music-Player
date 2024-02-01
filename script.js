const playPauseButton = document.querySelector('.play-pause')
const forwardButton = document.querySelector('.forward')
const backwardButton = document.querySelector('.backward')
const body = document.querySelector('body')
const cover = document.querySelector('.cover')
const title = document.querySelector('.title')
const artist = document.querySelector('.artist')
const cdDesign = document.querySelector('.cdDesign')
const playlistDisplay = document.querySelector('.playlistDisplay')
const playlistView = document.querySelector('.playlistView')
const loaderText = document.querySelectorAll('.loader span')
let pause = 0
let playTime = 0
let playCount = 0

//Loader
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
startLoad()

window.addEventListener('load', () => {
    document.querySelector('.loaderPage').style.opacity = '0'
    setTimeout(() => {
        document.querySelector('.loaderPage').style.display = 'none'
    }, 600);
})

//Song List
const songsList = [
    { name: 'If You Believe', artist: 'Strive to Be, Patch Crowe', cover: 'song/If You Believe.jpeg', path: 'song/If You Believe.mp3', yt: 'https://www.youtube.com/watch?v=OEdNx0i7Q6I' },

    { name: 'Mera Safar', artist: 'Iqlipse Nova', cover: 'song/Mera_Safar.jpeg', path: 'song/Mera_Safar.mp3', yt: 'https://www.youtube.com/watch?v=mn7MKh3l1iM' },

    { name: "It's You", artist: 'Ali Gatie', cover: "song/It's_You.jpeg", path: "song/It's_You.mp3", yt: 'https://www.youtube.com/watch?v=F-cO2CMue4Q' },
    
    { name: 'Daylight', artist: 'David Kushner', cover: 'song/Daylight.jpeg', path: 'song/Daylight.mp3', yt: 'https://www.youtube.com/watch?v=MoN9ql6Yymw' },
    
    { name: "Busy Earnin'", artist: 'Jungle', cover: "song/Busy_Earnin'.jpeg", path: "song/Busy_Earnin'.mp3", yt: 'https://www.youtube.com/watch?v=BcsfftwLUf0' },
    
    { name: 'Happy Man', artist: 'Jungle', cover: 'song/Happy_Man.jpeg', path: 'song/Happy_Man.mp3', yt: 'https://www.youtube.com/watch?v=lv5uiDbbWv0' },
    
    { name: 'Something in the way', artist: 'Nirvana', cover: 'song/Something_In_The_Way.jpeg', path: 'song/Something_In_The_Way.mp3', yt: 'https://www.youtube.com/watch?v=4VxdufqB9zg' },
    
    { name: 'Blinding Lights', artist: 'The weeknd', cover: 'song/Blinding_Lights.jpeg', path: 'song/Blinding_Lights.mp3', yt: 'https://www.youtube.com/watch?v=4NRXx6U8ABQ' },
    
    { name: 'Hum katha Sunate', cover: 'song/Hum_katha_Sunate_Shri_Ram_Ki.jpeg', path: 'song/Hum_katha_Sunate_Shri_Ram_Ki.mp3', yt: 'https://www.youtube.com/watch?v=V3Am1_xNbtE' },
    
    { name: 'Can You Hear me', artist: 'Munn', cover: 'song/Can_You_Hear_me.jpeg', path: 'song/can_you_hear_me.mp3', yt: 'https://www.youtube.com/watch?v=-yAltxrbk0g' },
    
    { name: 'Wrecked', artist: 'Imagine Dragons', cover: 'song/Wrecked.jpeg', path: 'song/Wrecked.mp3', yt: 'https://www.youtube.com/watch?v=Y2NkuFIlLEo' },
    
    { name: 'Cancer', artist: 'Twenty One Pilots', cover: 'song/Cancer.jpeg', path: 'song/Cancer.mp3', yt: 'https://www.youtube.com/watch?v=6P-43ukn_l0' },
    
    { name: 'All of the Star', artist: 'Ed Sheeran', cover: 'song/All_of_the_Stars.jpeg', path: 'song/All_of_the_Stars.mp3', yt: 'https://www.youtube.com/watch?v=nkqVm5aiC28' },
    
    { name: "Mirage-Assassin's Creed", artist: 'One Republic', cover: 'song/Mirage.jpeg', path: 'song/Mirage.mp3', yt: 'https://www.youtube.com/watch?v=Dm_BrGu1sHM' },
    
    { name: "Supermarket Flowers", artist: 'Ed Sheeran', cover: 'song/Supermarket Flowers.jpeg', path: 'song/Supermarket Flowers.mp3', yt: 'https://www.youtube.com/watch?v=bIB8EWqCPrQ' },

    { name: "White Flag", artist: 'Dido', cover: 'song/White Flag.jpeg', path: 'song/White Flag.mp3', yt: 'https://www.youtube.com/watch?v=RnDDQ9CY-1I' },
    
    { name: "Thank You", artist: 'Dido', cover: 'song/Thank you.jpeg', path: 'song/Thank You.mp3', yt: 'https://www.youtube.com/watch?v=irzOMH7GcnQ' },
    
    { name: "The Night We Met", artist: 'Lord Huro', cover: 'song/The_Night_We_Met.jpeg', path: 'song/The_Night_We_Met.mp3', yt: 'https://www.youtube.com/watch?v=wGF7PswOENQ' },
    
    { name: "Snowman", artist: 'Isak Danielson', cover: 'song/Snowman.jpeg', path: 'song/Snowman.mp3', yt: 'https://www.youtube.com/watch?v=gset79KMmt0' },
    
]

//shuffle the songsList
shuffle(songsList)


//Update Playtime
function updatePlaytime() {
    // listen time update
    /*
    playTime is percentage of music played - (currentTime/duration)*100
    playTimeBar is music progress bar which total length is 360 degree. 360*(playTime)/100
    shadowBar is little bit ahead of main bar
    */
    audio.addEventListener('timeupdate', () => {
        reverseTime(reverseTimer)

        playTime = (audio.currentTime/audio.duration)
        let playTimeBar = 360*(playTime)
        let shadowBar = 360*(playTime/12)
        body.style.setProperty('--changePlayTime', `conic-gradient(#FF0059 ${playTimeBar}deg, transparent ${playTimeBar + shadowBar}deg)`)
    })

    // end audio
    audio.addEventListener('ended', () => {
        playTime = 0
        playCount += 1
        audio.pause()
        if (playCount === songsList.length) {
            playCount=0
        }
        audio.pause()
        audio = new Audio(songsList[playCount].path)
        audio.play()
        songPlaying()
        updatePlaytime()
        // update the playing song in playlist view
        whichSongPlaying()
    })
}

// show the left time 
function reverseTime(reverseTimer) {
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



// this function will run all the other thing which should start with a song
function songPlaying() {
    cover.src = songsList[playCount].cover
    title.innerHTML = songsList[playCount].name
    artist.innerHTML = songsList[playCount].artist?songsList[playCount].artist : 'Unknown Artist'
    setVolume()
    if (looped) {
        runLoop()
    }
    if (mute) {
        muted()
    }

    playPauseButton.innerHTML = `<img src="assets/pause.png"></img>`
    cover.style.border = '1px solid rgba(255, 255, 255, 0.500)'
    cover.style.animationName = 'rotateImg'
    cover.style.borderRadius = '50%'
    cdDesign.style.opacity = '1'
    pause=1
}

//play/pause Song
function PlayPauseSong(){
    if (pause===0) {
        if (playTime === 0) {
            audio = new Audio(songsList[playCount].path)
        }
        audio.play()
        audio.controls = true

        songPlaying()
    }
    else if(pause===1){
        audio.pause()
        pause=0
        playPauseButton.innerHTML = `<img src="assets/play.png">`
        cover.style.border = ''
        cover.style.animationName = ''
        cover.style.borderRadius = '20px'
        cdDesign.style.opacity = '0'
    }
    updatePlaytime()
}


//============================================Player==================================================

cover.src = songsList[playCount].cover
title.innerHTML = songsList[playCount].name
artist.innerHTML = songsList[playCount].artist?songsList[playCount].artist : 'Unknown Artist'


let audio = new Audio(songsList[playCount].path)
audio.controls = true

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
    playPauseButton.innerHTML = `<img src="assets/pause.png">`

    //change unmute icon
    muteButton.src = 'assets/volume.png'

    // update the playing song in playlist view
    whichSongPlaying()
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
    playPauseButton.innerHTML = `<img src="assets/play.png">`

    //change unmute icon
    muteButton.src = 'assets/volume.png'
    
    // update the playing song in playlist view
    whichSongPlaying()
})

// 10 seconds forward and backward
const forward10 = document.querySelector('.forward10sec')
const backward10 = document.querySelector('.backward10sec')

forward10.addEventListener('mousedown', () => {
    if (pause === 0) {
        PlayPauseSong()
    }
    audio.currentTime += 10
    forward10.style.rotate = '100deg'
    setTimeout(() => {
        forward10.style.rotate = '0deg'
    }, 500);
})
backward10.addEventListener('mousedown', () => {
    if (pause === 0) {
        PlayPauseSong()
    }
    audio.currentTime -= 10
    backward10.style.rotate = '-100deg'
    setTimeout(() => {
        backward10.style.rotate = '0deg'
    }, 500);
})


// Change the Play Time to Time left
let reverseTimer = false
document.querySelector('.playTime').addEventListener('click', () => {
    reverseTimer = (reverseTimer) ? false : true
})


//playlist
const line1 = document.querySelector('.line1')
const line2 = document.querySelector('.line2')
const line3 = document.querySelector('.line3')

songsList.forEach(element => {
    const span = document.createElement("span");
    span.id = element.name
    span.innerHTML = `<img src="${element.cover}" alt="M" class="playlistCover">
                      <div class="playlistTitle">${element.name}</div>`
    
    playlistView.appendChild(span)
});

let playlistVisible = 0
playlistDisplay.addEventListener('click', () => {
    

    if (playlistVisible===0) {
        playlistView.style.opacity = '1'
        playlistView.style.pointerEvents= 'auto';
        line1.style.transform = 'rotate(45deg)'
        line2.style.opacity = '0'
        line3.style.transform = 'rotate(-45deg)'
        playlistVisible = 1
    }
    else {
        playlistView.style.opacity = '0'
        playlistView.style.pointerEvents= 'none';
        line1.style.transform = ''
        line2.style.opacity = '1'
        line3.style.transform = ''
        playlistVisible = 0
    }
})

// It will indicate the playing song in playlist
function whichSongPlaying() {
    for (let index = 1; index < playlistView.childElementCount+1 ; index++) {
        playlistView.childNodes[index].style.color = '#fff'
    }

    playlistView.childNodes[playCount + 1].style.color = '#FF0059'
}
whichSongPlaying()

// play song from playlist

playlistView.childNodes.forEach(element => {
    element.addEventListener('click', () => {
        for (let index = 0; index < songsList.length; index++) {
            if (songsList[index].name === element.id) {
                audio.pause();
                audio = new Audio(songsList[index].path);
                audio.play()
                playCount = index
                whichSongPlaying()
                updatePlaytime()
                songPlaying()
                break;
            }            
        }
        
    })
});

// Volume
const volumeBar = document.querySelector('.volume')

function setVolume() {
    audio.volume = volumeBar.value / 100
    document.querySelector('.volumePercent').innerHTML = volumeBar.value
}

volumeBar.addEventListener('input', () => {
    setVolume()
})

setVolume() // it update the volume Percentage

//mute button
let mute = false
const muteButton = document.querySelector('.muteButton')
function muted() {
    audio.muted = false;
    mute = false;
    muteButton.src = 'assets/volume.png';
}
muteButton.addEventListener('click', () => {
    if (!mute) {
        audio.muted = true;
        mute = true;
        muteButton.src = 'assets/volume-mute.png';
    } else {
        muted()
    }
})

// loop button
const loop = document.querySelector('.loop')
let looped = false
function runLoop() {
    loop.classList.add('looped')
    audio.loop = true;
    looped = true
}
loop.addEventListener('click', () => {
    if (!looped) {
        runLoop()
    } else {
        loop.classList.remove('looped')
        audio.loop = false;
        looped = false
    }
})

//replay
document.querySelector('.replay').addEventListener('click', () => {
    audio.load()
    audio.play()
})

// open on youtube
document.querySelector('.openOnYTlink').addEventListener('click', ()=>{
    document.querySelector('.openOnYTlink').href = songsList[playCount].yt
})

// Preload Image and song
function preloadImage(imgUrl) {
    const img = new Image();
    img.src = imgUrl;
}

for (let index = 0; index < songsList.length-1; index++) {
    preloadImage(songsList[index].cover);
}