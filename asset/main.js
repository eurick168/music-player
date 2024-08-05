/**
 * 1.   Render songs
 * 2.   Scroll top
 * 3.   Play / pause / seek
 * 4.   CD rotate
 * 5.   next / prev
 * 6.   random
 * 7.   Next / Repeat when ended
 * 8.   Actice song
 * 9.   Scroll active song into view
 * 10.  Play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const getPlaylist = $(".playlist");
const getCd = $(".cd");
const getAudio = $("#audio");
const getheading = $("header h2");
const getCdthumb = $(".cd-thumb");
const getPlayBtn = $(".btn-toggle-play");
const getPlayer = $(".player");
const getrange = $(".progress");
const getNextBtn = $(".btn-next");
const getprevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

const appPlayer = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  playedIndices: [],
  songs: [
    {
      name: "Dạ Vũ",
      singer: "Tăng Duy Tân",
      path: "./asset/music/DẠ VŨ - TĂNG DUY TÂN.mp3",
      image: "./asset/img/tăng-duy-tân.jpg",
    },
    {
      name: "Despacito",
      singer: "Luis Fonsi",
      path: "./asset/music/Despacito - Luis Fonsi.mp3",
      image: "./asset/img/Luis-Fonsi.jpg",
    },
    {
      name: "Shape of You",
      singer: "Ed Sheeran",
      path: "./asset/music/Ed Sheeran - Shape of You.mp3",
      image: "./asset/img/Ed-Sheeran.jpeg",
    },
    {
      name: "Monkey dance",
      singer: "Tones and I",
      path: "./asset/music/monkey dance - Tones and I.mp3",
      image: "./asset/img/Tones-and-I.jpg",
    },
    {
      name: "Let Her Go",
      singer: "Passenger",
      path: "./asset/music/Passenger - Let Her Go.mp3",
      image: "./asset/img/Passenger.jpg",
    },
    {
      name: "See you again",
      singer: "Chaelie-Puth",
      path: "./asset/music/see you again - children voice.mp3",
      image: "./asset/img/Chaelie-Puth.jpg",
    },

    {
      name: "兄弟再干一杯",
      singer: "豆包",
      path: "./asset/music/兄弟再干一杯 - 豆包.mp3",
      image: "./asset/img/豆包.jpg",
    },
    {
      name: "難卻",
      singer: "平生不晚",
      path: "./asset/music/難卻.- 平生不晚.mp3",
      image: "./asset/img/平生不晚.jpg",
    },
    {
      name: "凉凉",
      singer: "杨宗纬",
      path: "./asset/music/凉凉 - 杨宗纬 .mp3",
      image: "./asset/img/杨宗纬.jpg",
    },
    {
      name: "起风了",
      singer: "吴青峰",
      path: "./asset/music/起风了 - 吴青峰 .mp3",
      image: "./asset/img/吴青峰.jpg",
    },
  ],

  render() {
    const htmls = this.songs.map((song, index) => {
      return `
              <div class="song ${index === this.currentIndex ? "active" : ""} " data-index="${index}">
                  <div class="thumb" style="background-image: url('${song.image}')"></div>
                      <div class="body">
                          <h3 class="title">${song.name}</h3>
                          <p class="author">${song.singer}</p>
                      </div>
                 
                  </div>
              </div>
          `;
    });
    getPlaylist.innerHTML = htmls.join("");
  },

  updateActiveClass() {
    const songNodes = $$(".song");
    songNodes.forEach((songNode, index) => {
      if (index === this.currentIndex) {
        songNode.classList.add("active");
      } else {
        songNode.classList.remove("active");
      }
    });
  },

  defineProperties() {
    Object.defineProperty(this, "currentSong", {
      get() {
        return this.songs[this.currentIndex];
      },
    });
  },

  loadCurrentSong() {
    getheading.innerText = this.currentSong.name;
    getCdthumb.style.backgroundImage = `url(${this.currentSong.image})`;
    getAudio.src = this.currentSong.path;
  },

  nextSong() {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    this.updateActiveClass();
  },

  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.updateActiveClass();
  },

  // function random songs

  randomSong() {
    if (this.playedIndices.length === this.songs.length) {
      this.playedIndices = [];
    }

    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (this.playedIndices.includes(newIndex));

    this.playedIndices.push(newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
    this.updateActiveClass();
  },

  // function srollview active song

  // function Handle

  handleEvent() {
    _this = this;
    const cdWidth = getCd.offsetWidth;

    // nextSong

    getNextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      getAudio.play();
    };

    getprevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }

      getAudio.play();
    };

    // handle rotate cd
    const cdThumbAnimate = getCdthumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 8000,
        iterations: Infinity,
      }
    );

    cdThumbAnimate.pause();

    // handle zoom in / out cd rotate

    document.onscroll = function () {
      const srcollTop = window.scrollY || document.documentElement.scrollTop;
      const newWidth = cdWidth - srcollTop;
      getCd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      getCd.style.opacity = newWidth / cdWidth;
    };

    // handle when we click play button

    getPlayBtn.onclick = function () {
      if (_this.isPlaying) {
        getAudio.pause();
      } else {
        getAudio.play();
      }
    };

    getAudio.onpause = function () {
      _this.isPlaying = false;
      getPlayer.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    getAudio.onplay = function () {
      _this.isPlaying = true;
      getPlayer.classList.add("playing");
      cdThumbAnimate.play();
    };

    // change the tempo of the song while playing

    getAudio.ontimeupdate = function () {
      if (this.duration) {
        const tempoPercent = Math.floor((this.currentTime / this.duration) * 100);
        getrange.value = tempoPercent;
      }
    };

    getrange.oninput = function (e) {
      const seekTime = (getAudio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // switch btn random

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // handle next song when song is ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        getNextBtn.click();
      }
    };

    // repeat song when we click

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    //listen event click to playlist

    getPlaylist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (e.target.closest(".song:not(.active)") || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.getAttribute("data-index"));
          _this.loadCurrentSong();
          _this.render();
          getAudio.play();
        }
      }
    };
  },

  start() {
    this.defineProperties();
    this.render();
    this.handleEvent();
    this.loadCurrentSong();
    this.updateActiveClass();
  },
};

appPlayer.start();
