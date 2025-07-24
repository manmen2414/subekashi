/**
 * ∴∴∴∴ - 全てあなたの所以です。
 * https://youtu.be/XkIKM80-Znc
 * https://lyrics.imicomweb.com/songs/636/
 * 
 * ※本番環境適用前に23.jsを636.jsに改名する。
 */
const FONTSIZE = 45;
const SONG_URL = "https://youtu.be/XkIKM80-Znc"
/**
 * @type {(string|string[])[]}
 */
//圧縮済み: https://rakko.tools/tools/33/
const css = `@keyframes move-glitch{0%{transform:translate(-10px,5px)}10%{transform:translate(5px,-5px)}20%{transform:translate(7px,3px)}30%{transform:translate(-5px,0)}40%{transform:translate(-10px,5px)}50%{transform:translate(-6px,-10px)}60%{transform:translate(2px,5px)}70%{transform:translate(7px,-6px)}80%{transform:translate(5px,7px)}90%{transform:translate(0,0)}}.center{position:fixed;left:50%;top:50%;transform:translate(-50%,-50%)}.move-glitch{animation:0.2s steps(1) 0s 1 normal both running move-glitch}`;

const BPM = 132;
/**@type {SpecialSong?} */
let specialsong;
document.addEventListener("DOMContentLoaded", () => {
    const cssElem = document.createElement("style");
    cssElem.innerHTML = css;
    document.body.appendChild(cssElem)
    addPlayStopButton();
});
async function special() {
    if (!!specialsong) {
        specialsong.stop();
        specialsong = null;
        return;
    }
    const songAudio = new SongAudio(SONG_URL, "youtube");
    const song = new SpecialSong(
        BPM,
        4,
        songAudio,
    );
    specialsong = song;
    // 曲開始をインデント深めずにその場で行う
    // 本当はsong.playがこの役割をしてくれたはずなんだけどね？
    await new Promise((r) => {
        song.audio.addEventListener("audioReady", async () => {
            await song.wait(0.2);
            await song.play(); r();
        })
    })
    YYYYLog("Playing")
    await song.wait(37.1);
    unDisplayItemWithGlitch(document.querySelector("#lyrics-wrapper"));
    YYYYLog("Deleted Lyrics");
    await song.waitPerMeadow(1);
    unDisplayItemWithGlitch(document.querySelector("#song-info"));
    YYYYLog("Deleted Song Info");
    await song.waitPerMeadow(1);
    unDisplayItemWithGlitch(document.querySelector(".dummybuttons"));
    YYYYLog("Deleted Buttons");
    await song.waitPerMeadow(1);
    unDisplayItemWithGlitch(document.querySelector("header"));
    YYYYLog("Deleted Header");
    function genSongInfo() {
        // <div class="center">
        const songInfo = document.createElement("div");
        songInfo.className = "center";
        // <h1>∴∴∴∴</h1>
        const title = document.createElement("h1");
        title.innerText = "∴∴∴∴";
        title.style.opacity = 0;
        // <p id="lyrics">全てあなたの所以です。</p>
        const author = document.createElement("p");
        author.id = "lyrics";
        author.innerText = "全てあなたの所以です。";
        author.style.opacity = 0;
        // <p id="lyrics">2021/11/25</p>
        const date = document.createElement("p");
        date.id = "lyrics";
        date.innerText = "2021/11/25";
        date.style.opacity = 0;
        // </div>
        songInfo.append(title, author, date)
        document.body.append(songInfo);
        return [songInfo, title, author, date];
    }
    YYYYLog("Generated SongInfo")
    const songInfos = genSongInfo();
    await song.waitPerMeadow(1);
    displayItemWithGlitch(songInfos[1])
    YYYYLog("Show ∴∴∴∴")
    await song.waitPerMeadow(1);
    displayItemWithGlitch(songInfos[2])
    YYYYLog("Show 全てあなたの所以です。")
    await song.waitPerMeadow(1);
    displayItemWithGlitch(songInfos[3])
    YYYYLog("Show 2021/11/25")
    await song.waitPerMeadow(1);
    unDisplayItemWithGlitch(songInfos[0])
    YYYYLog("Delete SongInfo")
    //※1拍手前にずらす
    await song.waitPerMeadow(0.75);
    const lyricFunctions = [
        melody1A,
        melody1Hook,
        melody1_2,
        melody2A,
        melody2Hook,
        melodyC,
        melody3Hook,
        melodyD,
        melodyE,
        melodyLast
    ];
    for (const func of lyricFunctions) {
        await func();
    }
}
async function melody1A() {
    YYYYLog("1A", "part");
    const speed = (60 / specialsong.bpm) * 12;
    new RiseingText(false, `放浪を続けて辿り着いた、`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(2);
    new RiseingText(false, `その場所は酷く窮屈で、`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(2);
    new RiseingText(false, `宝の山に見間違えていた、`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(2);
    new RiseingText(true, `<span id="coufuku">幸福</span>を噛み締めていた。`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(0.1);
    document.querySelector("#coufuku").innerText = "無福";
    await specialsong.waitPerMeadow(0.1);
    document.querySelector("#coufuku").innerText = "無常";
    await specialsong.waitPerMeadow(1.8);
    new RiseingText(false, `むかしむかしあるところなる、`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(2);
    new RiseingText(false, `殺し合う仲の語り部は、`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(2);
    new RiseingText(false, `経緯の盈虚に酔い痴れた、`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(2);
    new RiseingText(true, `<span id="nanika">何か</span>が間違っていた。`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(0.1);
    document.querySelector("#nanika").innerText = "　か";
    await specialsong.waitPerMeadow(0.1);
    document.querySelector("#nanika").innerText = "　　";
    await specialsong.waitPerMeadow(1.8);
    //※1拍手前にずれている
}
//TODO: モールス信号を何らかの形で表現する(自作ライブラリを用いてもよい)
async function melody1Hook() {
    YYYYLog("1Hook", "part");
    const speed = (60 / specialsong.bpm) * 12;
    async function showInvisibleText(ishtml, text) {
        const rise = new RiseingText(ishtml, text, FONTSIZE, speed);
        await specialsong.waitPerMeadow(1.5);
        for (let i = 0; i < 10; i++) {
            rise.element.style.opacity = `${(9 - i) / 10}`;
            await specialsong.waitPerMeter(2 / 10);
        }
    }
    await showInvisibleText(false, `爆ぜた事象の片も、`);
    await showInvisibleText(true, `<span style="font-size:${FONTSIZE / 2}px">中身のない嬰</span>の集いも、`);
    await showInvisibleText(true, `大きな白い壁も、`);
    new RiseingText(true, `全てあなたの<span id="yuen">所以</span>です。`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(1.5);
    document.querySelector("#yuen").style.backgroundColor = "#ffffff";
    await specialsong.waitPerMeadow(0.5);
    await showInvisibleText(true, `手にする<span style="color:red;">赤い目</span>も、`);
    await showInvisibleText(true, `輝ける<span style="color:#888888;">昏い過去</span>も、`);
    await showInvisibleText(false, `振り翳した彼の身も、`);
    new RiseingText(true, `全てあなたの<span id="yuen2">所以</span>です。`, FONTSIZE, speed);
    await specialsong.waitPerMeadow(1.5);
    document.querySelector("#yuen2").style.color = "#111111";
    await specialsong.waitPerMeadow(0.75);
}
//TODO: モールス信号を表現する
async function melody1_2() {
    const soBeChars = [
        "uuu dd uuuuu uuu uuu dd uuuuuu uuu ",
        "uuu dd uuuuuu u uuu dd uuuuuuuuu dd、",
        "uuuuuuuu uuuuuuuuu uuuuuuuu du uuu dd ",
        "uuuuuu uuuuuu uuu dd uuuuuuuu uuuuuuuu。",
        "uuu dd uuuuuu uuuuuuuuu uuu dd uuuu uuuuuu ",
        "uuu dd uuuuu uuuuuuu uuu dd uuuuuu uuuuuu、",
        "uuuuuu uuu uu duuuuu uuu dd uuuuuuuu d uuuuu ",
        "uuuu u u uuu dd uuuu uuuu uuu dd uuuuuu uuuuuu、",
        "uuu dd uuuu duuuuu uuu dd uuuuuuuu duu uuu dd ",
        "uuuuuu d uuu dd uuuu uuuu uuu dd uuuuuu duuuu？",
        "uuu dd uuuuu d uuu dd uuuuuu ",
        "uuu uuu dd uuuuuu uuuuuuuu、",
        "uuuu duuuu dd dd uuuuuuu ",
        "duuu duuu uu uuu dd uuuuuu du、",
        "uuuuu duu uuuu uuuuu uuu dd uuuuu duuuuu uuu ",
        "dd uuuu du uuu dd uuuuuu uuu uuu dd uuuuu duuuuu。",
    ]
    const songlist = [
        "DSC_9998.mp4",
        "∴",
        "確執",
        "∴∴",
        "想い出の枯葉が飛び去る前に",
        "鵺",
        "∴∴∴[short]",
        "センプレ",
        "偶/奇",
        "dsc_9997.m4v",
        "∴∴∴",
        "未知数",
        "M.A.Z.",
        "線分でわけて",
        "呪縛",
        "∴∴∴∴",
    ]
    YYYYLog("Showed Header");
    const header = document.querySelector("header");
    header.style.display = "inline";
    displayItemWithGlitch(header);
    const title = document.querySelector("header>div:nth-child(2)>a:nth-child(2)");
    await specialsong.wait(0.3);
    YYYYLog("1-2", "part")
    for (let i = 0; i < soBeChars.length; i++) {
        const angou = soBeChars[i];
        const songName = songlist[i];
        title.innerText = angou.replace(/u/g, "∴").replace(/d/g, "∵");
        document.title = `${songName} / 全てあなたの所以です。 | 全て歌詞の所為です。`;
        await specialsong.waitPerMeadow(1);
    }
    unDisplayItemWithGlitch(header);
    await specialsong.wait(0.2);
    title.innerText = "全て歌詞の所為です。"
}

async function melody2A(lyric) {
    YYYYLog("2A", "part")
        `雨上がりの足跡の側、
賞味期限の切れたFの様、
亡くした人を呪い蔑んで、
永劫に溺れていたのか。
そして墓場ごと掘り返して、
色褪せたイデアの先では、
Ѥられるモノが遊歩する、
何かが間違っていた。`
}

async function melody2Hook(lyrics) {
    YYYYLog("2Hook", "part")[
        `蠱惑の草の根も、
渡り行く時間軸も、
何かの住まう理も、
全てあなたの所以です。
穢れゆく詐欺師も、
疲弊した破落戸も、
偽物の∴∴∴∴も、
全てあなたの所以です。`
        ,
        `遡れる者も、
廃れた誰かの顔も、
緋色に見えた星も、
全てあなたの所以です。
三の火の在処も、
ユメウツツの望遠鏡も、
傾いた∴∴∴∴も、
全てあなたの所以です。`
    ]
}

//TODO: 歌詞に合わせたエフェクト(https://youtu.be/ExNf-EC8ZVk みたいな感じ)
async function melodyC(lyric) {
    `反転して、
反転して、
反転して、
反転する。
複製して、
複製して、
Sを引き伸ばすのです。
記憶して、
延長して、
挫折して、
邂逅する。
あの日夢に見たものは、
身を投じた彼岸花。`
    YYYYLog("C", "part")
}

async function melody3Hook(lyric) {
    YYYYLog("3Hook", "part")
        `呪縛の呼び声も、
確執を生んだ直線も、
鵺に唆された、
答えを割り切っていた。
不可視なる顧慮者も、
虚の空の向こうも、
教室外の墓場も、
全てあなたの■■です。`
}

async function melodyD(lyrics) {
    YYYYLog("D", "part")[
        `食指の喉元も、
身を隠した窮の嘶きも、
歌にできない言葉も、
全てあなたの所以です。`
        ,
        `飛び散ったカードの破片を、
恣意の基に探し出し、
構築ごと流れて行った、
全てあなたの所以です。`
    ]
}

async function melodyE(lyric) {
    YYYYLog("E", "part")
        `硯の下の次元の、
ベクトルに見ゆ、
底辺の家。
明け暮れた不安、
為す術も無いもので、
只、嘲笑うのです。`
}

async function melodyLast(lyrics) {
    YYYYLog("Last", "part")[
        `都合良く口を開いては、
都合良く耳を塞ぐ。
復讐を誓った朱い眼が、
公正を取り戻して！`
        ,
        `有限の平行線の中で、
あなたの足跡を辿る。
指図を受けた蒼の字は、
公正を取り戻して！`
    ]

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
        this.element.style.transform = "translate(-50%,0px)"
        this.element.style.fontSize = `${fontsize}px`
        this.element.innerHTML = this.text;
        this.setElementY(0);
        this.max = window.innerHeight + this.fontsize;
        this.movePerMillisecond = this.max / speed / 1000;
        this.date = new Date();
        this.rising = true;
        this.rised = false;
        YYYYLog(this.element.innerText, "RiseingText")
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
            requestAnimationFrame(() => this.riseTick())
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
        this.element.style.setProperty(this.anchor, `${this.rawY}px`)
        return this.rawY >= this.max;
    }
}


function YYYYLog(log, areaName = "Main") {
    console.log(`%cYYYY/${areaName}%c: ${log}`, `color:yellow;`, `color:white;`)
}
/**
 * @param {HTMLElement} item 
 */
function displayItemWithGlitch(item) {
    item.classList.add("move-glitch");
    function timeout(count = 1) {
        item.style.opacity = `${count * 0.15}`;
        if (count > 9) {
            item.classList.remove("move-glitch");
            return;
        };
        setTimeout(() => timeout(count + 1), 300 / 10)
    }
    timeout();
}
/**
 * @param {HTMLElement} item 
 */
function unDisplayItemWithGlitch(item) {
    item.classList.add("move-glitch");
    function timeout(count = 1) {
        item.style.opacity = `${1 - (count * 0.15)}`;
        if (count > 9) {
            item.classList.remove("move-glitch");
            item.style.display = "none";
            return;
        };
        setTimeout(() => timeout(count + 1), 300 / 10)
    }
    timeout();
}