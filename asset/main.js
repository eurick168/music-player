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

const appPlayer = {
  currentIndex: 0,
  isPlaying: false,

  songs: [
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
    const htmls = this.songs.map((song) => {
      return `
              <div class="song">
                  <div class="thumb" style="background-image: url('${song.image}')"></div>
                      <div class="body">
                          <h3 class="title">${song.name}</h3>
                          <p class="author">${song.singer}</p>
                      </div>
                      <div class="option">
                          <i class="fas fa-ellipsis-h"></i>
                      </div>
                  </div>
              </div>
          `;
    });
    getPlaylist.innerHTML = htmls.join("");
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
  },

  prevSong() {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },

  handleEvent() {
    _this = this;
    const cdWidth = getCd.offsetWidth;

    // nextSong

    getNextBtn.onclick = function () {
      _this.nextSong();
      getAudio.play();
    };

    getprevBtn.onclick = function () {
      _this.prevSong();
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
  },

  start() {
    this.defineProperties();
    this.render();
    this.handleEvent();
    this.loadCurrentSong();
  },
};

appPlayer.start();
