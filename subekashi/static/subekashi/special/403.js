/**
 * 揺 - 全て玉響の所為です。
 * https://youtu.be/XE4vBv8knVE
 * https://lyrics.imicomweb.com/songs/403/
 */
const FONTSIZE = 45;
const SONG_URL = "https://youtu.be/XE4vBv8knVE";
let countBeat = 0;
const BPM = 160;
/**@type {SpecialSong?} */
let specialsong;
const CSS = "";
document.addEventListener("DOMContentLoaded", () => {
  const cssElem = document.createElement("style");
  cssElem.innerHTML = CSS;
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
async function special() {
  const reductionLyric = new ReductionLyric(4, 1000, 10);
  if (!!specialsong) {
    specialsong.stop();
    specialsong = null;
    return;
  }
  const songAudio = new SongAudio(SONG_URL, "youtube");
  const song = new SpecialSong(BPM, 4, songAudio);
  specialsong = song;
  // 曲がずれる気がするのでちょっとだけマイナスオフセットを入れる
  song.offset = -0.005;
  // 曲開始・同期
  await new Promise((r) => {
    song.audio.addEventListener("audioReady", async () => {
      await song.wait(0.2);
      await song.play();
      r();
    });
  });

  const mainSpeed = (60 / song.bpm) * 12;
  const [messeageLogDiv, log] = showLogArea();
  const deletes = [
    document.querySelector("#mainarticle"),
    document.querySelector("header"),
    document.querySelector("footer"),
  ];
  deletes.forEach((d) =>
    d.animate([{ opacity: "1" }, { opacity: "0" }], {
      easing: "linear",
      duration: 11.4 * 1000,
    }),
  );
  log(new Date().toLocaleString());
  await song.wait(1.2);
  log("[さいと■なおき] はいって、ようこそ。");
  await song.wait(2.2);
  log("[さいと■なおき] もしかして玉響ってアブナい言葉だと思っていませんか？");
  await song.wait(4.5);
  log("[さいと■なおき] それ、完全に間違ってますヨ。");
  await song.wait(3);
  log("[さいと■なおき] さいと■なおきです。");
  deletes.forEach((d) => (d.style.display = "none"));
  await song.wait(2.2);
  log("[さいと■なおき] 今日も気まぐれ添削やっていきます。");
  await song.wait(3.2);
  log("[さいと■なおき] それでは、よろしくお願いいたします。");
  await song.wait(2.5);
  messeageLogDiv.animate([{ opacity: "1" }, { opacity: "0" }], {
    easing: "linear",
    duration: 4100,
  });
  await song.wait(4);
  messeageLogDiv.style.display = "none";
  await song.wait(0.8);
  reductionLyric.show(
    '呼ん<span id="da">だ\xa0\xa0\xa0\xa0\xa0</span>あなたの名前。',
    true,
  );
  await song.waitPerMeter(1);
  await song.waitPerMeter(0.5);
  let elemDa = document.querySelector("#da");
  for (let i = 0; i < 5; i++) {
    const left = "\xa0".repeat(i + 1);
    const right = "\xa0".repeat(4 - i);
    elemDa.innerText = `${left}だ${right}`;
    await song.waitPerMeter(0.5);
  }
  await song.waitPerMeter(4);
  reductionLyric.show('また<span id="barabara"></span>に', true);
  await song.waitPerMeter(1);
  let elemBarabara = document.querySelector("#barabara");
  for (let i = 0; i < 4; i++) {
    elemBarabara.innerText += `バラ`;
    await song.waitPerMeter(1);
  }
  await song.waitPerMeter(1);
  reductionLyric.show("放されてゆく。");
  await song.waitPerMeter(4);
  reductionLyric.show("伽藍堂に");
  await song.waitPerMeter(4);
  reductionLyric.show("揺らされてゆく。");
  await song.waitPerMeter(4);
  reductionLyric.show("魂と手");
  await song.waitPerMeter(6);
  reductionLyric.show("花池や捉えた摩天楼");
  await song.waitPerMeter(7);
  reductionLyric.show("辱、数杯の魔羅。");
  await song.waitPerMeter(8.5);
  reductionLyric.show("悲願、お決まりの言葉でしょう？");
  await song.waitPerMeter(8);
  reductionLyric.show("魂が揺れ動いた。");
  await song.waitPerMeter(9.5);
  await song.waitPerMeter(60);

  const kantan = new RiseingText(false, "", FONTSIZE, mainSpeed);
  kantan.element.innerText = "か";
  await song.waitPerMeter(1);
  kantan.element.innerText = "かん";
  await song.waitPerMeter(1);
  kantan.element.innerText = "かんた";
  await song.waitPerMeter(1);
  kantan.element.innerText = "感嘆するほどに夢中";
  await song.waitPerMeter(5);
  new RiseingText(false, "並行から", FONTSIZE, mainSpeed);
  await song.waitPerMeter(4);
  new RiseingText(false, "お決まりの免罪符", FONTSIZE, mainSpeed);
  await song.waitPerMeter(6);
  /**@type {RiseingText[]} */
  let deleteTexts = [];
  deleteTexts.push(
    new RiseingText(false, "あなたに跨るのです。", FONTSIZE, mainSpeed),
  );
  await song.waitPerMeter(6);
  deleteTexts.push(new RiseingText(false, "声を荒げ", FONTSIZE, mainSpeed));
  await song.waitPerMeter(4);
  deleteTexts.push(new RiseingText(false, "息を荒げ", FONTSIZE, mainSpeed));
  await song.waitPerMeter(3);
  deleteTexts.forEach((r) => {
    r.element.style.display = "none";
  });
  await song.waitPerMeter(1);

  reductionLyric.show("着床する君の奥");
  await song.waitPerMeter(8);
  reductionLyric.show("割れた隔。");
  await song.waitPerMeter(4);
  reductionLyric.show("「如何して？」と焦る君。");
  await song.waitPerMeter(6);
  reductionLyric.show('命が<span id="yurayura">ゆらゆら</span>と、', true);
  await song.waitPerMeter(6);
  reductionLyric.show('<div id="sway">揺れ動いた。</div>', true);
  document
    .querySelector("#sway")
    .animate(
      [
        { transform: "translateX(-5%)" },
        { transform: "translateX(5%)" },
        { transform: "translateX(-5%)" },
      ],
      { duration: 1000, iterations: Infinity },
    );
  await song.waitPerMeter(4);
  reductionLyric.show('<div id="sway2">揺れ動いた。</div>', true);
  document
    .querySelector("#sway2")
    .animate(
      [
        { transform: "translateX(-10%)" },
        { transform: "translateX(10%)" },
        { transform: "translateX(-10%)" },
      ],
      { duration: 800, iterations: Infinity },
    );
  await song.waitPerMeter(5);

  reductionLyric.show('呼ん<span id="da">だ\xa0</span>あなたの名前。', true);
  await song.waitPerMeter(1);
  await song.waitPerMeter(0.5);
  elemDa = document.querySelector("#da");
  for (let i = 0; i < 5; i++) {
    if (i % 2 === 0) elemDa.innerText = `\xa0だ`;
    else elemDa.innerText = `だ\xa0`;
    await song.waitPerMeter(0.5);
  }
  await song.waitPerMeter(4);
  reductionLyric.show('また<span id="barabara"></span>に', true);
  await song.waitPerMeter(1);
  elemBarabara = document.querySelector("#barabara");
  for (let i = 0; i < 8; i++) {
    if (i % 2 === 0) elemBarabara.innerText = `バ　バ　`;
    else elemBarabara.innerText = `　ラ　ラ`;
    await song.waitPerMeter(0.5);
  }
  elemBarabara.innerText = "バラバラ";
  await song.waitPerMeter(1);
  reductionLyric.show("放されてゆく。");
  await song.waitPerMeter(4);
  reductionLyric.show("伽藍堂に");
  await song.waitPerMeter(4);
  reductionLyric.show("揺らされてゆく。");
  await song.waitPerMeter(4);
  reductionLyric.show("魂と手");
  await song.waitPerMeter(6);
  reductionLyric.show("花池や捉えた摩天楼");
  await song.waitPerMeter(7);
  reductionLyric.show("辱、数杯の魔羅。");
  await song.waitPerMeter(8.5);
  reductionLyric.show("悲願、お決まりの言葉でしょう？");
  await song.waitPerMeter(8);
  reductionLyric.show("魂が揺れ動いた。");
  await song.waitPerMeter(9.5);
  await song.waitPerMeter(28.5);

  new RiseingText(false, "苛立つその馬耳東風", FONTSIZE, mainSpeed);
  await song.waitPerMeter(8);
  new RiseingText(false, "苦い汁が", FONTSIZE, mainSpeed);
  await song.waitPerMeter(4);
  new RiseingText(false, "深雪を降らすのだ。", FONTSIZE, mainSpeed);
  await song.waitPerMeter(6);
  /**@type {RiseingText[]} */
  deleteTexts = [];
  deleteTexts.push(
    new RiseingText(
      true,
      'あたまが<span id="guragura">グラグラ</span>と',
      FONTSIZE,
      mainSpeed,
    ),
  );
  let guragura = document.querySelector("#guragura");
  guragura.style.opacity = "0";
  await song.waitPerMeter(2);
  guragura.style.opacity = "1";
  await song.waitPerMeter(1);
  guragura.innerText = "guragura";
  await song.waitPerMeter(1);
  guragura.innerText = "ぐらぐら";
  await song.waitPerMeter(2);
  deleteTexts.push(new RiseingText(false, "苦しいのか？", FONTSIZE, mainSpeed));
  await song.waitPerMeter(4);
  deleteTexts.push(new RiseingText(false, "恐れなのか？", FONTSIZE, mainSpeed));
  await song.waitPerMeter(3);
  deleteTexts.forEach((r) => {
    r.element.style.display = "none";
  });
  await song.waitPerMeter(1);

  reductionLyric.show("玉響それはTestes");
  await song.waitPerMeter(8);
  reductionLyric.show("生命の始まりを表すもの");
  await song.waitPerMeter(10);
  reductionLyric.show("あなたも同じなのです。");
  await song.waitPerMeter(6);
  reductionLyric.show("音を忘れ");
  await song.waitPerMeter(4);
  reductionLyric.show("声も忘れ。");
  await song.waitPerMeter(2);
  messeageLogDiv.animate([{ opacity: "0" }, { opacity: "1" }], {
    easing: "ease",
    duration: 2000,
  });
  messeageLogDiv.style.display = "";
  await song.waitPerMeter(3);

  log("");
  log(new Date().toLocaleString());
  const sorehalog = log("[？？？] それは");
  await song.waitPerMeter(4);
  sorehalog.innerText = "[？？？] それはあなたの所為で、\n";
  await song.waitPerMeter(4);
  log("[？？？] 一つ魂を消した。");
  await song.waitPerMeter(6);
  const dousitelog = log("");
  dousitelog.innerHTML = "[？？？] <span>如何してなの？</span><br>";
  await song.waitPerMeter(4);
  dousitelog.innerHTML =
    '[？？？] <span style="text-decoration:line-through">如何してなの？</span> 如何してでも！<br>';
  await song.waitPerMeter(4);
  log("[？？？] こうするしか、");
  await song.waitPerMeter(4);
  log("[？？？] なかったのだ。");
  await song.waitPerMeter(2);
  messeageLogDiv.animate([{ opacity: "1" }, { opacity: "0" }], {
    easing: "ease",
    duration: 1500,
  });
  await song.waitPerMeter(4);
  messeageLogDiv.style.display = "none";
  new RiseingText(false, "正しいのはあなたの希望論", FONTSIZE, mainSpeed * 2);
  await song.waitPerMeter(7);
  new RiseingText(
    true,
    `「<span id="wasu">忘</span><span id="re">れ</span><span id="te">て</span>」<span id="toso">逃葬の中。</span>`,
    FONTSIZE,
    mainSpeed * 2,
  );
  document
    .querySelectorAll("#wasu,#re,#te,#todo")
    .forEach((e) => (e.style.opacity = "0"));
  document.querySelector("#wasu").style.opacity = "1";
  await song.waitPerMeter(1);
  document.querySelector("#re").style.opacity = "1";
  await song.waitPerMeter(0.5);
  document.querySelector("#te").style.opacity = "1";
  await song.waitPerMeter(1);
  document.querySelector("#toso").style.opacity = "1";
  await song.waitPerMeter(6);
  new RiseingText(false, "穢", FONTSIZE, mainSpeed * 2);
  await song.waitPerMeter(2);
  new RiseingText(
    true,
    'お決まりの<span id="kisu">接吻</span>をして、',
    FONTSIZE,
    mainSpeed * 2,
  );
  document.querySelector("#kisu").style.opacity = "0";
  await song.waitPerMeter(3);
  document.querySelector("#kisu").style.opacity = "1";
  await song.waitPerMeter(3);
  await song.waitPerMeter(2);
  const hara = document.createElement("p");
  hara.innerText = "腹を深く抉るのだ。";
  hara.style.position = "fixed";
  hara.style.left = "50%";
  hara.style.transform = "translate(-50%,-50%) scale(1)";
  hara.style.fontSize = `${FONTSIZE}px`;
  document.body.appendChild(hara);
  hara.animate([{ bottom: "0px" }, { bottom: "50%" }], {
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    duration: 1000,
  });
  setTimeout(() => {
    hara.style.bottom = "50%";
  }, 999);
  await song.waitPerMeter(2);
  hara.animate(
    [
      { transform: `translate(-50%,-50%) scale(1)` },
      { transform: `translate(-50%,-50%) scale(10)` },
    ],
    { easing: "ease", duration: 2000 },
  );
  await song.waitPerMeter(2);
  hara.remove();
  const bgcanvas = document.createElement("canvas");
  document.body.append(bgcanvas);
  bgcanvas.width = innerWidth;
  bgcanvas.height = innerHeight;
  const ctx = bgcanvas.getContext("2d");
  /**@param {number} radius  */
  function setRedrad(radius) {
    const gradient = ctx.createRadialGradient(
      innerWidth / 2,
      innerHeight / 2,
      0,
      innerWidth / 2,
      innerHeight / 2,
      radius,
    );
    gradient.addColorStop(1, "rgba(64, 7, 7, 0)");
    gradient.addColorStop(0, "rgba(64, 7, 7, 1)");

    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = gradient;
    ctx.lineWidth = 5; // 線の幅は5px
    ctx.beginPath();
    ctx.arc(innerWidth / 2, innerHeight / 2, radius, 0, 2 * 3.14);
    ctx.closePath();
    ctx.fill();
  }
  const aside = document.querySelector("aside");
  const biggerInner = innerWidth < innerHeight ? innerHeight : innerWidth;
  aside.animate([{opacity:"1"},{opacity:"0"}],{duration:1000});
  setTimeout(()=>{aside.style.opacity = "0"},999);
  new Promise(async () => {
    for (let i = 0; i < biggerInner; i += 20) {
      setRedrad(i);
      await song.waitPerMeter(20 / biggerInner);
    }
  });

  await song.waitPerMeter(2);
  reductionLyric.show("それはあなたの所為だ。");
  await song.waitPerMeter(8);
  reductionLyric.show("カラスが遠くで泣いた。");
  await song.waitPerMeter(6);
  reductionLyric.show("「もう嫌だよ」");
  log("");
  log(new Date().toLocaleString());
  log("[？？？] もう嫌だよ");
  await song.waitPerMeter(4);
  reductionLyric.show("「もう許して」");
  log("[？？？] もう許して");
  await song.waitPerMeter(4);
  reductionLyric.show("その言葉はから回って。");
  await song.waitPerMeter(8);
  reductionLyric.show("私だけ見捨てた神様よ");
  await song.waitPerMeter(7);
  reductionLyric.show("すなわち純情と魔羅。");
  await song.waitPerMeter(8.5);
  reductionLyric.show("それで心は済むのですか？");
  await song.waitPerMeter(8);
  reductionLyric.show("全て玉響の所為です。");
  await song.waitPerMeter(9.4);
  reductionLyric.show("嗚呼");
  await song.waitPerMeter(6);
  reductionLyric.show("今");
  await song.waitPerMeter(7);
  reductionLyric.show("命が");
  await song.waitPerMeter(6);
  reductionLyric.show("止まる刻");
  await song.waitPerMeter(9);
  bgcanvas.remove();
  await song.waitPerMeter(0.5);
  showToast("error", "さよなら");
  await song.waitPerMeter(4.5);
  await song.waitPerMeter(4);
  messeageLogDiv.animate([{ opacity: "0" }, { opacity: "1" }], {
    easing: "ease",
    duration: 2000,
  });
  messeageLogDiv.style.display = "";
  await song.waitPerMeter(4);
  log("[？？？] ね");
  await song.waitPerMeter(8);
  log("[？？？] ね");
  await song.waitPerMeter(6);
  log("[？？？] ね");
  await song.waitPerMeter(6);
  messeageLogDiv.animate([{ opacity: "1" }, { opacity: "0" }], {
    easing: "ease",
    duration: 2000,
  });
  setTimeout(()=>{
    messeageLogDiv.style.display = "none";

  },1999)
  await song.wait(2);
  showToast("error","重大なエラーが発生しました。<br>ページを再読み込みしてください。")
}

/**
 *
 * @returns {[HTMLDivElement,(text:string)=>HTMLElement]}
 */
function showLogArea() {
  const main = document.createElement("div");
  main.style.backgroundColor = "#222e";
  main.style.position = "fixed";
  main.style.left = "50%";
  main.style.top = "50px";
  main.style.transform = "translateX(-50%)";
  main.style.width = "70%";
  main.style.height = "65%";
  main.style.zIndex = "10";
  main.style.color = "#fff";
  main.style.padding = "1%";
  main.style.borderRadius = "10px";
  document.body.append(main);

  const messageLogNav = document.createElement("div");
  messageLogNav.style.width = "100%";
  messageLogNav.style.textAlign = "center";
  messageLogNav.style.fontSize = "130%";
  messageLogNav.style.marginBottom = "10px";
  messageLogNav.style.borderBottom = "2px solid #fff";
  messageLogNav.innerText = "Message Log";
  main.append(messageLogNav);

  return [
    main,
    (text) => {
      const log = document.createElement("tt");
      log.innerText = text + "\n";
      main.append(log);
      return log;
    },
  ];
}
class RiseingText {
  /**
   * @param {boolean} isHTML
   * @param {string} text
   * @param {number} fontsize
   * @param {number} speed スクロールが完了するまでの秒数
   * @param {"top"|"bottom"} anchor
   *
   */
  constructor(isHTML, text, fontsize, speed, anchor = "bottom") {
    this.text = isHTML ? text : escapeHtmlChars(text);
    this.fontsize = fontsize;
    this.speed = speed;
    this.anchor = anchor;
    /**@type {HTMLParagraphElement} */
    this.element = document.createElement("p");
    this.element.style.position = "fixed";
    this.element.style.left = "50%";
    this.element.style.transform = "translate(-50%,0px)";
    this.element.style.fontSize = `${fontsize}px`;
    this.element.innerHTML = this.text;
    this.setElementY(0);
    this.max = window.innerHeight + this.fontsize;
    this.movePerMillisecond = this.max / speed / 1000;
    this.date = new Date();
    this.rising = true;
    this.rised = false;
    document.body.appendChild(this.element);
    this.riseTick();
  }
  riseTick() {
    if (!this.rising) return;
    const date = new Date();
    const milliseconds = date - this.date;
    this.date = date;
    const moveValue = this.movePerMillisecond * milliseconds;
    const rised = this.setElementY(this.y + moveValue);
    if (!rised) {
      requestAnimationFrame(() => this.riseTick());
    } else {
      this.rising = false;
      this.element.remove();
      this.rised = true;
    }
  }
  stopRiseing() {
    this.rising = false;
  }
  /**@param {number} num  */
  setElementY(num) {
    this.y = num;
    this.rawY = num - this.fontsize;
    this.element.style.setProperty(this.anchor, `${this.rawY}px`);
    return this.rawY >= this.max;
  }
}
