/**
 * @typedef {import("./.vscode/1004.d.ts").anime} anime
 */

/**
 * ■■ - 何時か忘れて仕舞うのでしょう。
 * https://youtu.be/f4aIi2GEKSw
 * https://lyrics.imicomweb.com/songs/1004/
 *
 * 試験的にAnime.jsを用いてみる。
 */
const FONTSIZE = "3.5vw";
const SONG_URL = "https://youtu.be/f4aIi2GEKSw";
const BPM = 132;
/**@type {SpecialSong?} */
let specialsong;
const customCSS = "";
document.addEventListener("DOMContentLoaded", () => {
  const cssElem = document.createElement("style");
  cssElem.innerHTML = customCSS;
  document.body.appendChild(cssElem);
  addPlayStopButton();

  document.body.appendChild(
    stringToHTML(
      '<audio src="/static/subekashi/special/tempo.mp3" id="tempo">',
    ),
  );
});
function t() {
  /**@type {HTMLAudioElement} */
  const tp = document.getElementById("tempo");
  tp.currentTime = 0;
  tp.play();
}
/**
 * @returns {Promise<anime>}
 */
function loadAnimeJS() {
  const URL =
    "https://cdn.jsdelivr.net/npm/animejs/dist/bundles/anime.umd.min.js";
  return new Promise((s, j) => {
    const script = document.createElement("script");
    script.src = URL;

    script.onload = () => {
      s(anime);
    };
    script.onerror = () => {
      j();
    };

    document.body.appendChild(script);
  });
}

async function special() {
  const tickSetter = dev();
  const songAudio = new SongAudio(SONG_URL, "youtube");
  const song = new SpecialSong(BPM, 4, songAudio);
  const mainSpeed = (60 / song.bpm) * 8;

  const millsecondsForBeat = (60 / BPM) * 1000;
  specialsong = song;
  // 曲がずれる気がするのでちょっとだけマイナスオフセットを入れる
  song.offset = -0.005;
  const anime = await loadAnimeJS();
  const lyric = anime.$("#lyrics")[0];
  // 要素の全作成
  initAllLyricText();
  // タイムラインの作成
  const timeline = anime.createTimeline({ autoplay: false });
  let nowTime = 1400;
  let DEV_SETSEEKAT = 0;

  window.timeline = timeline;
  // 先に要素を全て設定する
  timeline.call(() => setupLyric(), 0);
  // スクロール用タイマー
  const scrollTime = 13200;
  const scrollTimer = anime.createTimer({
    duration: scrollTime,
    onUpdate: (self) => {
      const scrollSize = document.body.clientHeight - innerHeight;
      scrollTo({ top: (scrollSize / scrollTime) * self.currentTime });
    },
  });
  timeline.call(() => t(), nowTime);
  timeline.sync(scrollTimer, nowTime);
  nowTime += scrollTime;
  // 要素非表示
  const elementHideBehavior = {
    display: { from: "unset", to: "none" },
    duration: 1,
  };
  timeline.add("section", elementHideBehavior, nowTime);
  timeline.add("header", elementHideBehavior, nowTime);
  timeline.add("#footer-wrapper", elementHideBehavior, nowTime);
  nowTime += 1800;
  // 開始
  function addLyric(id, beats = 12) {
    timeline.add(
      `#generatedl-${id}`,
      {
        ...elementBottomToUpBehavior,
        duration: millsecondsForBeat * beats,
      },
      nowTime,
    );
  }
  const elementBottomToUpBehavior = {
    bottom: {
      from: `-${FONTSIZE}`,
      to: `calc( ${innerHeight}px + ${FONTSIZE})`,
    },
    ease: "linear",
  };
  timeline.call(() => t(), nowTime);
  // ああ、意味はなくても
  addLyric(0);
  nowTime += millsecondsForBeat * 7;
  addLyric(1);
  addLyric(2);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 14;
  addLyric(3);
  addLyric(4);
  nowTime += millsecondsForBeat * 2;
  nowTime += millsecondsForBeat * 8;
  // ああ、逃げれなくても
  addLyric(5);
  nowTime += millsecondsForBeat * 7;
  addLyric(6);
  addLyric(7);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 14;
  addLyric(8);
  addLyric(9);
  nowTime += millsecondsForBeat * 2;
  nowTime += millsecondsForBeat * 7;
  // 感情の老廃物、
  addLyric(10);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 6;
  addLyric(11);
  nowTime += millsecondsForBeat * 1;
  addLyric(12);
  addLyric(13);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 7;
  addLyric(14);
  nowTime += millsecondsForBeat * 1;
  addLyric(15);
  addLyric(16);
  nowTime += millsecondsForBeat * 7;
  addLyric(17);
  addLyric(18);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 8;
  nowTime += millsecondsForBeat * 32;
  // 何にも出来ない...
  (() => {
    let nowTimeForSub = nowTime;
    function randomPosLyricViaAnime(text) {
      const el = randomPosLyric(text);
      timeline.add(
        el,
        {
          display: { from: "none", to: "block" },
          duration: 1,
        },
        nowTimeForSub,
      );
      timeline.add(
        el,
        {
          opacity: { from: 1, to: 0 },
          duration: millsecondsForBeat * 4,
        },
        nowTimeForSub + 5000,
      );
      timeline.add(
        el,
        {
          display: { from: "block", to: "none" },
          duration: 1,
        },
        nowTimeForSub + 5000 + millsecondsForBeat * 4,
      );
    }
    for (let i = 0; i < 8; i++) {
      randomPosLyricViaAnime("何にも出来ない。");
      nowTimeForSub += millsecondsForBeat * 2;
    }
    for (let i = 0; i < 8; i++) {
      randomPosLyricViaAnime("宙を見つめている。");
      nowTimeForSub += millsecondsForBeat * 2;
    }
    for (let i = 0; i < 8; i++) {
      randomPosLyricViaAnime("何にも出来ない。");
      nowTimeForSub += millsecondsForBeat * 2;
    }
    for (let i = 0; i < 8; i++) {
      randomPosLyricViaAnime("宙を見つめている。");
      nowTimeForSub += millsecondsForBeat * 2;
    }
    for (let i = 0; i < 16; i++) {
      randomPosLyricViaAnime("何にも出来ない。");
      nowTimeForSub += millsecondsForBeat * 2;
    }
  })();
  // 受動的な言葉、
  nowTime += millsecondsForBeat * 32;
  addLyric(19);
  nowTime += millsecondsForBeat * 5;
  addLyric(20);
  nowTime += millsecondsForBeat * 3;
  nowTime += millsecondsForBeat * 1;
  addLyric(21);
  nowTime += millsecondsForBeat * 3;
  nowTime += millsecondsForBeat * 4;
  addLyric(22);
  nowTime += millsecondsForBeat * 11;
  addLyric(23);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 4;
  addLyric(24);
  nowTime += millsecondsForBeat * 5;
  addLyric(25);
  nowTime += millsecondsForBeat * 3;
  nowTime += millsecondsForBeat * 1;
  addLyric(26);
  nowTime += millsecondsForBeat * 3;
  nowTime += millsecondsForBeat * 27;
  // 落としていたキーホルダー、
  addLyric(27, 16);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 7;
  addLyric(28, 16);
  addLyric(29, 16);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 7;
  addLyric(30, 16);
  nowTime += millsecondsForBeat * 1;
  addLyric(31, 16);
  addLyric(32, 16);
  nowTime += millsecondsForBeat * 7;
  addLyric(33, 12);
  addLyric(34, 12);
  nowTime += millsecondsForBeat * 1;
  DEV_SETSEEKAT = nowTime; // これをスライドするとそその位置に飛ぶ
  nowTime += millsecondsForBeat * 3;
  nowTime += millsecondsForBeat * 4;
  // 取り零した笑顔と、
  addLyric(35);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 6;
  addLyric(36);
  nowTime += millsecondsForBeat * 1;
  addLyric(37);
  addLyric(38);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 7;
  addLyric(39);
  nowTime += millsecondsForBeat * 1;
  addLyric(40);
  addLyric(41);
  nowTime += millsecondsForBeat * 7;
  addLyric(42);
  addLyric(43);
  nowTime += millsecondsForBeat * 1;
  nowTime += millsecondsForBeat * 8;

  // timeline.add("#lyrics", { opacity: 0, duration: 500 }, 5000);

  // 曲開始
  song.audio.addEventListener("audioReady", async () => {
    await song.play();
    const id = setInterval(() => {
      if (song.audio.player.getCurrentTime() === 0) return;
      clearInterval(id);
      timeline.play();
    });
    setInterval(() => {
      const songTime = Math.floor(song.audio.player.getCurrentTime() * 1000);
      const animeTime = timeline.currentTime;
      if (Math.abs(songTime - animeTime) > 0.3) {
        timeline.seek(songTime);
        timeline.play();
      }
    }, 100);
    setInterval(() => {
      const songTime = Math.floor(song.audio.player.getCurrentTime() * 1000);
      tickSetter(timeline.currentTime, songTime);
    });
    // デバッグ
    seek(DEV_SETSEEKAT / 1000 - 0.5);
  });
}

function setupLyric() {
  const lyric = document.getElementById("lyrics");
  const START_LYRIC_TEXT = `
<br><br><br><br><br><br>
<br><br><br><br><br><br>
大変申し訳ありませんが、
<br><br><br><br><br><br>
<br><br><br><br><br><br>
この動画はアップロード者が削除された為、
<br><br><br><br><br><br>
<br><br><br><br><br><br>
<span id="saisei1">■■</span>することが出来ません。
<br><br><br><br><br><br>
<br><br><br><br><br><br>
またの御アクセスをお待ちしております。
<br><br><br><br><br><br>
<br><br><br><br><br><br>
`;
  lyric.innerHTML = START_LYRIC_TEXT;
  lyric.style.fontSize = "3vw";
}

function dev() {
  const panel = stringToHTML(
    `<div style="position:fixed;left:0px;bottom:0px;color:#000;background-color:#fff;" id="devTimer"></div>`,
  );
  document.body.appendChild(panel);
  return (anime, youtube) => (panel.innerText = `${anime} / ${youtube}`);
}

function seek(sec) {
  specialsong.audio.player.seekTo(sec);
}

function initAllLyricText() {
  const lyrics = [
    `ああ、意味はなくても、`,
    `どこかにへと逃げたいと、`,
    `!どこかにへと逃げたいと、`,
    `思う日々と、嵩む日々。`,
    `!(思う日々と、)嵩む日々。`,
    `ああ、逃げれなくても、`,
    `どこか遠い星にでも、`,
    `!どこか遠い星にでも、`,
    `願う日々と、叫ぶ日々。`,
    `!(願う日々と、)叫ぶ日々。`,
    `感情の老廃物、`,
    `!溶け出して、`,
    `ぽつぽつ溢れた。`,
    `!(ぽつ)ぽつ溢れた。`,
    `!今も。`,
    `ザラメのような、`,
    `!(ザラメの)ような、`,
    `甘い空想を。`,
    `!(甘い)空想を。`,
    `受動的な言葉、`,
    `日も届かぬ、`,
    `意味を、意味を、紡ぐ。`,
    `綺語と解決を望む逃避行、`,
    `救われないのに。`,
    `ああ、星を飛び出てみて、`,
    `記憶を消せば、`,
    `何時か、沈めるのかな。`,
    `落としていたキーホルダー、`,
    `もう戻りはせず。`,
    `!もう戻りはせず。`,
    `!だけど...`,
    `指された罪を、`,
    `!(指された)罪を、`,
    `全て宵闇の所為にしたくて。`,
    `!(全て)宵闇の(所為にしたくて。)`,
    `取り零した笑顔と、`,
    `!柔らかくて。`,
    `消せられぬ想い。`,
    `!(消せ)られぬ想い。`,
    `!重い。`,
    `ザラメのような、`,
    `!(ザラメの)ような、`,
    `甘い偶像を。`,
    `!(甘い)偶像を。`,
  ];
  document.body.append(
    ...lyrics.map((str, i) => {
      const el = generateLyricText(str);
      el.id = `generatedl-${i}`;
      return el;
    }),
  );
}

/**
 * @param {string} str
 */
function generateLyricText(str) {
  const slices = 5;
  const element = document.createElement("p");
  element.style.position = "fixed";
  element.style.fontSize = FONTSIZE;
  element.style.bottom = `-${FONTSIZE}`;
  element.style.whiteSpace = "nowrap";

  let html = str;

  if (str.startsWith("!")) {
    element.style.left = `calc( 50% + ${slices}px )`;
    element.style.transform = `translate(-50%,${slices}px)`;
    element.style.color = "#666";
    element.style.zIndex = "9";
    html = str.substring(1);
  } else {
    element.style.left = "50%";
    element.style.transform = "translate(-50%,0px)";
    element.style.zIndex = "10";
  }
  html = html.replace(/\(([^\)]+)\)/g, `<span style="opacity:0">$1</span>`);
  element.innerHTML = html;
  return element;
}

/**@param {string} text */
function randomPosLyric(text) {
  const el = generateLyricText(`!${text}`);
  el.style.left = `${Math.random() * 100}%`;
  el.style.bottom = `${Math.random() * 100}%`;
  el.style.display = "none";
  el.style.fontSize = `calc(${FONTSIZE} * 0.75)`;
  document.body.appendChild(el);
  return el;
}
