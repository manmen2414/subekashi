/**
 * 馬鹿とか、 - 定期券売り場[old]
 * https://youtu.be/kzsxE_bgwCA
 * https://lyrics.imicomweb.com/songs/3406/
 */
const FONTSIZE = 27;
const SONG_URL = "https://youtu.be/kzsxE_bgwCA";
let countBeat = 0;
const BPM = 156;
/**@type {SpecialSong?} */
let specialsong;
const css = `@font-face{font-family:"KHDot";src:url(/static/subekashi/special/KH-Dot/KH-Dot-Ningyouchou-16.woff2) format("woff2");font-display:swap}.kh{font-family:"KHDot"}`;
document.addEventListener("DOMContentLoaded", () => {
  const cssElem = document.createElement("style");
  cssElem.innerHTML = css;
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
  if (!!specialsong) {
    specialsong.stop();
    specialsong = null;
    return;
  }
  const songAudio = new SongAudio(SONG_URL, "youtube");
  const song = new SpecialSong(BPM, 6, songAudio);
  specialsong = song;
  // 曲がずれる気がするのでちょっとだけマイナスオフセットを入れる
  song.offset = -0.007;
  // 曲開始・同期
  await new Promise((r) => {
    song.audio.addEventListener("audioReady", async () => {
      await song.wait(0.2);
      await song.play();
      r();
    });
  });

  const speed = (60 / song.bpm) * 36;
  const deletes = [
    document.querySelector("#mainarticle"),
    document.querySelector("header"),
    document.querySelector("footer"),
  ];
  deletes.forEach((d) =>
    d.animate([{ opacity: "1" }, { opacity: "0" }], {
      easing: "linear",
      duration: 500,
    }),
  );
  const I_1 = new PlaceLyricGroup(FONTSIZE, "10%", "50%")
    .add("例えば、", 8)
    .add("", 5 * 8)
    .add("例えば、", 8)
    .add("", 5 * 8);
  const I_2 = new PlaceLyricGroup(FONTSIZE, "10%", "50%")
    .add("例えば、誰かが青空の美しさを識り、価値を示したときには、", 24)
    .add("あなたと相容れない法則の使者を、この声で届けよう。", 24)
    .add("法則は意匠を貫いて、灯と混ざる夜半の夢を見ていた。", 24)
    .add("楽園を飾る僅かな追憶ですら許されぬというのか?", 24);
  const II = new PlaceLyricGroup(FONTSIZE, "90%", "50%")
    .add("境界は見えなくなった。", 11)
    .add("紛い物は、応えに近づいた。", 13)
    .add("類推を繰り返した。", 11)
    .add("己の身勝手さを嘆いた。", 13)
    .add("蒼穹は青く澄んだ。", 11)
    .add("策を曳いて、解を遺していた。", 13)
    .add("溟海に線を引いた。", 11)
    .add("不可抗力は手綱を引いた。", 13);
  const III = new RiseLyricGroup(FONTSIZE, "85%", speed * 0.85, "bottom")
    .add("応答は深く沈んだ。", 11)
    .add("枷を聴いて、何かを願っていた。", 13)
    .add("啓蒙は此方を向いた。", 11)
    .add("あの日蒔いた種を憂いた。", 13)
    .add("蒼穹は青く澄んだ。", 11)
    .add("策を曳いて、解を遺していた。", 13)
    .add("溟海に線を引いた。", 11)
    .add("不可抗力は手綱を引いた。", 13);
  const IV = new RiseLyricGroup(FONTSIZE, "35%", speed, "bottom")
    .add("諡は徴に化けた。", 15)
    .add("因果は移ろいだ。", 14)
    .add("失せ物を書き記した。", 19)
    .add("醜悪は黒影を継いだ。", 14)
    .add("唄は秩序を飛び越えた。", 20)
    .add("常なる遺産を生んだ。", 14);
  const V = new RiseLyricGroup(FONTSIZE, "65%", speed, "bottom")
    .add("鍵を置いた桁を忘れた。", 12)
    .add("恣意の眼差しを見つけた。", 18)
    .add("寂れた浅を渡った。", 19)
    .add("或る場所に名前を付けた。", 19)
    .add("まるで御伽の様だ。", 10)
    .add("偽の追憶を赦した。", 18);
  const VI = new RiseLyricGroup(FONTSIZE, "50%", speed * 1.5, "bottom")
    .add("思い出も まぼろしも", 12)
    .add("いつか鄙びてゆくの", 11)
    .add("願い事と 隠し事", 13)
    .add("みんなが追い求めてる", 12)
    .add("ささやかな ともし火は", 12)
    .add("いつも隣にいるんだ", 36);
  const VII = new RiseLyricGroup(FONTSIZE, "15%", speed, "bottom")
    .add("応答は深く沈んだ。", 11)
    .add("枷を聴いて、何かを願っていた。", 13)
    .add("啓蒙は此方を向いた。", 11)
    .add("あの日蒔いた種を憂いた。", 13)
    .add("蒼穹は青く澄んだ。", 11)
    .add("策を曳いて、解を遺していた。", 13)
    .add("溟海に線を引いた。", 11)
    .add("不可抗力は手綱を引いた。", 13);
  const VIII = new RiseLyricGroup(FONTSIZE, "45%", speed * 0.85, "bottom")
    .add("諍いの重さを悔やんだ。", 12)
    .add("起こり得ない事を探した。", 10)
    .add("怯者から錨を抜いた。", 11)
    .add("記憶の中の花が咲いた。", 9)
    .add("まだ救えていた。", 7)
    .add("嘘言を招いた。", 9)
    .add("声明無き未来を夢見た。", 10)
    .add("崇拝に憾みを溶かした。", 11)
    .add("時の渡りと共にぼやけた。", 10)
    .add("ただ悲しかった。", 7)
    .add("如何してなの?", 12)
    .add("如何してもなの?", 11)
    .add("私の所為なの?", 12)
    .add("あなたの所以なの?", 13)
    .add("如何してなの?", 12)
    .add("如何してもなの?", 11)
    .add("私の所為なの?", 12)
    .add("如何して?", 13);
  const IX = new RiseLyricGroup(FONTSIZE, "55%", speed, "top")
    .add("前提の足りない清濁は、", 14)
    .add("流浪の無い霊を呼ぶ。", 10)
    .add("弔いの仲も腑に落ちず、", 12)
    .add("何かが間違っていた。", 12)
    .add("弔いを数えた旅路に、", 14)
    .add("寂れた言葉を結ぶ。", 10)
    .add("輻湊探す陽炎の羽は、", 11)
    .add("何処かへ堕ちてしまったよ。", 13);
  const X = new RiseLyricGroup(FONTSIZE, "15%", speed, "top")
    .add("災害は長く続いた。", 11)
    .add("狼藉の中、霹靂が已んだ。", 13)
    .add("例外は奈落へ堕ちた。", 11)
    .add("狂信者の落伍を望んだ。", 13)
    .add("曖昧な呼吸を止めた。", 11)
    .add("奇跡なんて、何処にも無かった。", 13)
    .add("終焉が剣を抜いた。", 11)
    .add("邂逅は二度許されなかった。", 13);
  const XI = new RiseLyricGroup(FONTSIZE, "35%", speed, "top")
    .add("涸れた二粒の慰めを、", 8)
    .add("浮浪者と謳う宵の月、", 10)
    .add("誂えと僥倖 応えと顧みる、", 12)
    .add("美醜も在らず。", 14)
    .add("明日が無いifの慰めと、", 12)
    .add("伽藍堂へ続く宵の月、", 10)
    .add("探せど探せど虚を顧みる、", 12)
    .add("青薔薇の花。", 18);
  const XII = new RiseLyricGroup(FONTSIZE, "50%", speed * 1.5, "top")
    .add("呼び声と 歌声は", 12)
    .add("いつも救われなくて", 11)
    .add("その景色を ふるさとを", 13)
    .add("元から作り直して", 12)
    .add("空を見て 月明かり", 12)
    .add("どこかの君も見ている", 18)
    .add("今はまだ 言えない言葉だらけで", 18);
  const XIII = new PlaceLyricGroup(FONTSIZE, "25%", "50%")
    .add("栞に綴じた勉めと、", 12)
    .add("岬に埋めた啓示と、", 12)
    .add("重ね合わせた誤解も、", 12)
    .add("また元に戻るだろう。", 12)
    .add("栞に翳すイデアと、", 12)
    .add("見境の無いカルマと、", 12)
    .add("踵置く罪の味も、", 12)
    .add("遍く遺されるだろう。", 12);
  const XIV = new RiseLyricGroup(FONTSIZE, "55%", speed * 0.85, "bottom")
    .add("諍いの重さを悔やんだ。", 12)
    .add("起こり得ない事を探した。", 10)
    .add("怯者から錨を抜いた。", 11)
    .add("記憶の中の花が咲いた。", 9)
    .add("まだ救えていた。", 7)
    .add("嘘言を招いた。", 9)
    .add("声明無き未来を夢見た。", 10)
    .add("崇拝に憾みを溶かした。", 11)
    .add("時の渡りと共にぼやけた。", 10)
    .add("ただ悲しかった。", 7)
    .add("如何してなの?", 12)
    .add("如何してもなの?", 11)
    .add("私の所為なの?", 12)
    .add("あなたの所以なの?", 13)
    .add("如何してなの?", 12)
    .add("如何してもなの?", 11)
    .add("私の所為なの?", 12)
    .add("如何して?", 13);
  const lyricGroups = [
    I_1,
    I_2,
    II,
    III,
    IV,
    V,
    VI,
    VII,
    VIII,
    IX,
    X,
    XI,
    XII,
    XIII,
    XIV,
  ];
  const Debugger = {
    selecting: 0,
    created: false,
    elem: document.createElement("div"),
    create() {
      this.elem.style.position = "fixed";
      this.elem.style.left = "0%";
      this.elem.style.top = "0%";
      this.elem.style.backgroundColor = "#000";
      this.elem.style.width = "400px";
      this.elem.style.height = "400px";
      this.elem.style.padding = "4px";
      this.elem.style.opacity = "0.75";
      this.elem.style.color = "#fff";
      document.body.append(this.elem);
      this.created = true;
      setInterval(() => this.reloadShowing(), 50);
    },
    reloadShowing() {
      const lyric = lyricGroups[this.selecting];
      const showing = (() => {
        if (lyric instanceof PlaceLyricGroup) {
          return lyric.elem.innerText;
        } else {
          const text = lyric.mainText;
          if (!text) return "";
          return text.element.innerText;
        }
      })();
      const elem = document.querySelector("#showing");
      if (!elem) return;
      elem.innerText = showing;
    },
    display() {
      if (!this.created) this.create();
      if (this.selecting === 0) return;
      const lyric = lyricGroups[this.selecting];
      const type = lyric instanceof PlaceLyricGroup ? "Placed" : "Rising";

      this.elem.innerText = `${this.selecting}: ${type} Lyric
歌詞:
${lyric.lyrics.map((t) => t.text).join("\n")}

現在表示中:
`;
      this.elem.innerHTML += `<span id="showing"></span>`;
      this.reloadShowing();
    },
    selectLeft() {
      if (this.selecting === 0) this.selecting = lyricGroups.length;
      this.selecting--;
      this.display();
    },
    selectRight() {
      this.selecting++;
      if (this.selecting === lyricGroups.length) this.selecting = 0;
      this.display();
    },
    init() {
      document.addEventListener("keydown", (ev) => {
        if (ev.key === "ArrowLeft") this.selectLeft();
        if (ev.key === "ArrowRight") this.selectRight();
        if (ev.key === " ") this.display();
      });
    },
  };
  Debugger.init();
  await song.wait(0.4);
  deletes.forEach((d) => (d.style.opacity = "0"));
  genCenter();
  await song.wait(0.12);
  // t();
  I_1.execute();
  II.execute();
  await song.waitPerMeter(47); //47
  III.execute();
  await song.waitPerMeter(1); //48 1
  IV.execute();
  await song.waitPerMeter(8); //8
  V.execute();
  await song.waitPerMeter(14); //22
  VI.execute();
  await song.waitPerMeter(26); //48 2
  I_1.clear();
  VII.execute();
  await song.waitPerMeter(1); //1
  I_2.execute();
  await song.waitPerMeter(45); //46
  VIII.execute();
  await song.waitPerMeter(2); //48 3
  IX.execute();
  X.execute();
  await song.waitPerMeter(7); //7
  XI.execute();
  await song.waitPerMeter(16); //23
  XII.execute();
  await song.waitPerMeter(25); //48 4
  await song.waitPerMeter(2); //2
  XIII.execute();
  await song.waitPerMeter(44); //46
  XIV.execute();
}

function genCenter() {
  const obj = document.createElement("div");
  const sizeW = innerWidth * 0.225;
  const sizeH = innerHeight * 0.4;
  // 小きい方を取る
  const size = sizeW > sizeH ? sizeH : sizeW;
  obj.style.position = "fixed";
  obj.style.width = `${size}px`;
  obj.style.height = `${size}px`;
  obj.style.backgroundColor = "#fff";
  obj.style.opacity = "0.2";
  obj.style.left = "50%";
  obj.style.top = "50%";
  obj.style.transform = "translate(-50%,-50%)";
  document.body.append(obj);
  return obj;
}

function genBackEffect() {}

class PlaceLyricGroup {
  /**
   * @param {number} fontSize
   * @param {string} top
   * @param {string} left
   */
  constructor(fontSize, top, left) {
    this.fontSize = fontSize;
    this.top = top;
    this.left = left;
    /**@type {{text:string,waitMeter:number,isHTML?:boolean}[]} */
    this.lyrics = [];
    this.running = false;
    this.elem = document.createElement("div");

    this.elem.style.position = "fixed";
    this.elem.style.color = "#fff";
    this.elem.className = "kh";
    this.elem.style.left = left;
    this.elem.style.top = top;
    this.elem.style.transform = "translate(-50%,-50%)";
    this.elem.style.fontSize = `${fontSize}px`;
    document.body.append(this.elem);
  }

  /**
   * @param {string} text
   * @param {number} waitMeter
   * @param {boolean} isHtml
   */
  add(text, waitMeter, isHTML = false) {
    this.lyrics.push({ text, waitMeter, isHTML });
    return this;
  }

  async execute() {
    this.running = true;
    while (this.running) {
      for (const lyric of this.lyrics) {
        if (!this.running) break;
        if (!specialsong) break;
        if (!lyric.isHTML) this.elem.innerText = lyric.text;
        else this.elem.innerHTML = lyric.text;
        await specialsong.waitPerMeter(lyric.waitMeter);
      }
    }
  }

  stop() {
    this.running = false;
  }

  clear() {
    this.stop();
    this.elem.innerText = "";
  }
}

class RiseLyricGroup {
  /**
   * @param {number} fontsize
   * @param {string} left
   * @param {number} speed
   * @param {"top"|"bottom"} anchor
   */
  constructor(fontsize, left, speed, anchor) {
    this.fontSize = fontsize;
    this.left = left;
    this.speed = speed;
    this.anchor = anchor;
    /**@type {{text:string,waitMeter:number,isHTML?:boolean}[]} */
    this.lyrics = [];
    this.running = false;
    /**@type {RiseingText[]} */
    this.texts = [];
    /**@type {RiseingText?} */
    this.mainText = null;
  }
  /**
   * @param {string} text
   * @param {number} waitMeter
   * @param {boolean} isHtml
   */
  add(text, waitMeter, isHTML = false) {
    this.lyrics.push({ text, waitMeter, isHTML });
    return this;
  }
  async execute() {
    this.running = true;
    while (this.running) {
      for (const lyric of this.lyrics) {
        if (!this.running) break;
        if (!specialsong) break;
        this.mainText = new RiseingText(
          lyric.isHTML ?? false,
          lyric.text,
          this.fontSize,
          this.speed,
          this.anchor,
        );
        this.mainText.element.style.whiteSpace = "nowrap";
        this.mainText.element.classList.add("kh");
        this.mainText.element.style.left = this.left;
        this.texts.push(this.mainText);
        await specialsong.waitPerMeter(lyric.waitMeter);
      }
      this.texts = this.texts.filter((r) => !r.rised);
    }
  }

  stop() {
    this.running = false;
  }

  removeAll() {
    this.stop();
    this.texts.forEach((r) => {
      r.stopRiseing();
      r.element.remove();
    });
    this.mainText = null;
    this.texts = [];
  }
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
