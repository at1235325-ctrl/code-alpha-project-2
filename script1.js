const songs = [

{
title:"Song 1",
artist:"Artist 1",
src:"songs/song1.mp3",
cover:"images/cover1.jpg"
},

{
title:"Song 2",
artist:"Artist 2",
src:"songs/song2.mp3",
cover:"images/cover2.jpg"
},

{
title:"Song 3",
artist:"Artist 3",
src:"songs/song3.mp3",
cover:"images/cover3.jpg"
}

];

let currentSong = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

function loadSong(index){

audio.src=songs[index].src;

title.innerHTML=songs[index].title;

artist.innerHTML=songs[index].artist;

cover.src=songs[index].cover;

}

loadSong(currentSong);

function playSong(){

audio.play();

playBtn.innerHTML='<i class="fas fa-pause"></i>';

}

function pauseSong(){

audio.pause();

playBtn.innerHTML='<i class="fas fa-play"></i>';

}

playBtn.addEventListener("click",()=>{

if(audio.paused){

playSong();

}

else{

pauseSong();

}

});

nextBtn.onclick=()=>{

currentSong++;

if(currentSong>=songs.length){

currentSong=0;

}

loadSong(currentSong);

playSong();

};

prevBtn.onclick=()=>{

currentSong--;

if(currentSong<0){

currentSong=songs.length-1;

}

loadSong(currentSong);

playSong();

};

audio.addEventListener("timeupdate",()=>{

progress.max=audio.duration;

progress.value=audio.currentTime;

current.innerHTML=format(audio.currentTime);

duration.innerHTML=format(audio.duration);

});

progress.addEventListener("input",()=>{

audio.currentTime=progress.value;

});

volume.addEventListener("input",()=>{

audio.volume=volume.value;

});

audio.addEventListener("ended",()=>{

nextBtn.click();

});

function format(time){

if(isNaN(time)) return "0:00";

let min=Math.floor(time/60);

let sec=Math.floor(time%60);

if(sec<10) sec="0"+sec;

return min+":"+sec;

}

songs.forEach((song,index)=>{

let li=document.createElement("li");

li.innerHTML=song.title+" - "+song.artist;

playlist.appendChild(li);

li.onclick=()=>{

currentSong=index;

loadSong(currentSong);

playSong();

}

});