// スペシャルデザインボタンを表示
function add_special_button() {
    var defaultDummybuttonsEle =
        document.getElementsByClassName("dummybuttons")[0];
    const designedDummybuttonsEle = `
    <div class="dummybuttons">
        <a>
            <div class="dummybutton" onclick="special()"><i class="fas fa-magic"></i><p>スペシャルデザイン</p></div>
        </a>
    </div>
    `;
    defaultDummybuttonsEle.innerHTML = stringToHTML(
        designedDummybuttonsEle
    ).innerHTML;
}

// 歌詞をドットフォントに変更
function dot_lyrics() {
    const lyricsEle = document.getElementById("lyrics");
    lyricsEle.style.fontFamily = "'k8x12s', sans-serif, Meiryo";
}

// 雨を降らす
// 雨の初期化
const canvas = document.createElement("canvas");
/**@type {CanvasRenderingContext2D} */
let ctx;
function initRain() {
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 初期化
    createRain();
    animateRain();
}

// 設定値（調整可能）
let rainCount = 64; // 雨の本数
let rainAngle = Math.PI / -32; // 雨の角度（ジアン）
let rainSpeed = 48; // 雨のスピード

// キャンバスサイズの初期化とリサイズ対応
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 再生停止ボタンを追加
// ※スペシャルデザインボタンと同じくspecial関数が実行される。
function addPlayStopButton() {
    const defaultDummybuttonsEle = document.querySelector(".dummybuttons");
    defaultDummybuttonsEle.innerHTML = "";
    const anchor = document.createElement("a");
    const div = document.createElement("div");
    div.className = "dummybutton";
    function setToStop() {
        div.innerHTML = `<i class="fas fa-stop"></i><p>停止</p>`;
        div.onclick = () => {
            setToPlay();
            special();
        };
    }
    function setToPlay() {
        div.innerHTML = `<i class="fas fa-play"></i><p>再生</p>`;
        div.onclick = () => {
            setToStop();
            special();
        };
    }
    setToPlay();
    anchor.appendChild(div);
    defaultDummybuttonsEle.appendChild(anchor);
}

// 雨粒クラス
class Raindrop {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        const angleOffset = Math.tan(rainAngle);
        const overshoot = canvas.height * angleOffset;
        const marginX = Math.abs(overshoot);

        // xを画面の左外から右外までの範囲にランダム配置
        this.x = Math.random() * (canvas.width + marginX * 2) - marginX;
        this.y = initial
            ? Math.random() * canvas.height
            : -Math.random() * canvas.height;
        this.length = 50 + Math.random() * 30;
        this.speedX = rainSpeed * Math.tan(rainAngle);
        this.speedY = rainSpeed;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 画面外に出たらリセット
        if (
            this.y > canvas.height ||
            this.x > canvas.width + 100 ||
            this.x < -100
        ) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
            this.x + this.length * Math.sin(rainAngle),
            this.y + this.length * Math.cos(rainAngle)
        );
        ctx.strokeStyle = "#777";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// 雨粒の生成
let raindrops = [];
function createRain() {
    raindrops = [];
    for (let i = 0; i < rainCount; i++) {
        raindrops.push(new Raindrop());
    }
}

// アニメーションループ
function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let drop of raindrops) {
        drop.update();
        drop.draw();
    }
    requestAnimationFrame(animateRain);
}
/**
 * YoutubeのVideoIdを取得する。
 * @param {string} url リンク
 */
function getVideoId(url) {
    const shortLink = /http(?:s?)\:\/\/youtu\.be\/([0-9a-zA-z_\-]+)/;
    const normalLink =
        /http(?:s?)\:\/\/(?:www\.)?youtube\.com\/watch\?v=([0-9a-zA-z_\-]+)/;
    const videoIdExec = shortLink.exec(url) ?? normalLink.exec(url);
    if (!videoIdExec) return url;
    return videoIdExec[1];
}
let youtubePlayerInited = false;
/**
 * Youtubeの埋め込みを初期化する。
 */
function initYoutubePlayer() {
    const div = document.createElement("div");
    div.id = "youtube-embed";
    document.body.appendChild(div);
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    youtubePlayerInited = true;
}

/**
 * subekashi/static/subekashi/spetial/(ID).mp3 を取得し音声を返す。
 */
function getIdMp3() {
    return new Audio(
        `${baseURL()}/static/subekashi/special/${
            location.pathname.split("/")[2]
        }.mp3`
    );
}

/**
 * 下や右や左からも出すことができるトースト。
 * @param {"ok"|"info"|"warning"|"error"} icon
 * @param {string} text
 * @param {"bottom"} side
 */
async function showToastSide(side, icon, text) {
    const styles = `
@keyframes slidein-bottom {from{bottom: -340px;}to{bottom:34px;}}
@keyframes slideout-bottom{from{bottom: 34px;}to{bottom:-340px;}}
@keyframes slidein-left {from{left: -340px;}to{left:34px;}}
@keyframes slideout-left{from{left: 34px;}to{left:-340px;}}

.toast-bottom,.toast-left{position: fixed;background: rgba(255, 255, 255, 0.9);backdrop-filter: blur(8px);padding: 10px;border-radius: 8px;text-align: center;font-family: Arial, sans-serif;z-index: 1000;}
.toast-bottom{
	bottom: -50px;
	left: 50%;
    width: 90vw;
	transform: translateX(-50%);
	animation: slidein-bottom 0.5s forwards, slideout-bottom 0.5s 8s forwards;
}
.toast-left{
	left: -50px;
	top: 50%;
    width: 90vh;
	transform: translateY(-50%) rotateZ(90deg) ;
	animation: slidein-left 0.5s forwards, slideout-left 0.5s 8s forwards;
}
.toast-bottom p, .toast-bottom a,
.toast-left p, .toast-left a
{
    color: #111;
    font-weight: bold;
    line-height: normal;
}
    `;
    if (!document.querySelector("style#toast-side-style")) {
        const style = document.createElement("style");
        style.innerHTML = styles;
        style.id = "toast-side-style";
        document.body.appendChild(style);
    }
    try {
        const response = await fetch(
            `/api/html/toast?icon=${encodeURIComponent(
                icon
            )}&text=${encodeURIComponent(text)}`
        );
        if (!response.ok) throw new Error("Failed to fetch toast(side-mode)");

        const data = await response.json();
        const toastHTML = stringToHTML(data.toast);
        toastHTML.className = `toast-${side}`;
        const toastContainerEle = document.getElementById("toast-container");
        toastContainerEle.appendChild(toastHTML);
    } catch (error) {
        console.error("Error showing toast(side-mode):", error);
    }
}

/**
 * 曲の音声の再生停止を行う。
 * Youtube Embedからの再生停止も可能。
 */
class SongAudio extends EventTarget {
    readied = false;
    playing = false;
    /**
     * @param {string} url
     * @param {"file"|"youtube"} type
     */
    constructor(url, type = "file") {
        super();
        /**@type {string} */
        this.url = getVideoId(url);
        /**@type {"file"|"youtube"} */
        this.type = type;
        if (type === "file") {
            /**@type {HTMLAudioElement?} */
            this.audio = new Audio(url);
            const intervalId = setInterval(() => {
                //ロード完了時
                if (this.audio.readyState === 4) {
                    this.onReady();
                    clearInterval(intervalId);
                }
            }, 50);
        } else {
            window.onYouTubeIframeAPIReady = (...args) =>
                this.onYouTubeIframeAPIReady(...args);
            window.onPlayerReady = (...args) => this.onReady(...args);
            window.onPlayerStateChange = (...args) =>
                this.onYoutubePlayerStateChange(...args);
            if (!youtubePlayerInited) initYoutubePlayer();
        }
    }

    stop() {
        this.playing = false;
        if (this.type === "file") {
            this.audio.pause();
        } else {
            this.player.stopVideo();
        }
    }

    play() {
        if (!this.readied) return false;
        this.playing = true;
        if (this.type === "file") {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            this.player.seekTo(0);
            this.player.playVideo();
        }
        return true;
    }

    onYoutubePlayerStateChange(event) {}

    onReady() {
        this.readied = true;
        this.dispatchEvent(new CustomEvent("audioReady"));
    }

    onYouTubeIframeAPIReady() {
        this.player = new YT.Player("youtube-embed", {
            height: "1",
            width: "1",
            videoId: this.url,
            playerVars: {
                playsinline: 1,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    }
}
/**
 * スペシャルデザインで用いる曲を管理するクラス
 *
 * BPMなど描画に必要な項目や、管理クラスを保存する
 */
class SpecialSong extends EventTarget {
    bpm = 120;
    /**
     * @param {number} bpm
     * @param {SongAudio} songAudio
     * @param {ScrollController?} scrollController
     * @param {LyricShower?} lyricShower
     */
    constructor(bpm, meter, songAudio, scrollController, lyricShower) {
        super();
        this.meter = meter;
        this.bpm = bpm;
        /**@type {SongAudio} */
        this.audio = songAudio;
        /**@type {ScrollController?} */
        this.scroll = scrollController;
        /**@type {LyricShower?} */
        this.lyric = lyricShower;
        /**@type {number} */
        this.measureCount = 0;
        /**@type {number} */
        this.waitTime = 0;
        /**@type {boolean} */
        this.playing = false;
    }
    checkPlayable() {
        return this.audio.readied;
    }
    /**
     * @param {number} meters
     */
    waitPerMeter(meters) {
        return new Promise((s, j) => {
            this.addEventListener("stoped", () => j("song stoped"));
            setTimeout(() => {
                s();
            }, (60 / this.bpm) * meters * 1000);
        });
    }
    /**
     * @param {number} meadows
     */
    waitPerMeadow(meadows) {
        return this.waitPerMeter(meadows * this.meter);
    }
    async play() {
        if (!this.checkPlayable())
            throw new Error("This Song is not ready now");
        this.playing = true;
        this.audio.play();
        //TODO: SSongからlyricとscrollの項目を外し個別制御にする
        if (!!this.lyric) this.lyric.apply();
        if (this.waitTime > 0)
            await new Promise((r) =>
                setTimeout(() => r(), this.waitTime * 1000)
            );
        if (!!this.scroll) {
            this.scroll.start();
            this.scroll.addEventListener("endScroll", (ev) => {
                this.stop(ev.detail.fulfilled);
            });
        }
        this.dispatchEvent(new CustomEvent("started", { detail: this }));
    }
    stop(_fulfilled = false) {
        this.audio.stop();
        if (!!this.scroll) this.scroll.stop();
        this.dispatchEvent(
            new CustomEvent("stoped", { detail: this, fulfilled: _fulfilled })
        );
    }
}

/**
 * ## rawLyricについて
 * `^(ピクセル数)`: その箇所にそのピクセル分空白を配置する
 *
 * `{}`: その個所をspan要素で囲い、areas配列に入れ、通し番号でidをつける
 *
 * idは`lyric-area(番号)` 入れ子可能
 *
 * 使い方
 * ```
 * ^100
 * 歌詞歌詞1行目
 * 歌詞歌詞2行目
 * ^500
 * 歌詞歌詞{特殊}3行目
 * ^1000
 * 歌詞歌詞{特{殊}}4行目
 * ```
 * - 上部に100pxの空白がある
 * - 1行目と2行目の間には`defaultHeight`pxの空白がある
 * - 2行目と3行目の間には500pxの空白がある
 * - 3行目と4行目の間には1000pxの空白がある
 *
 * + 3行目は「歌詞歌詞特殊3行目」と表示される
 * + 3行目の「特殊」という箇所だけspan要素でわかれており、`lyricShower.areas[0]`でアクセスできる
 *   + また、`lyric-area0`というIDもついている
 * - 4行目は「歌詞歌詞特殊4行目」と表示される
 * - 4行目の「特殊」という箇所に`lyricShower.areas[1]`でアクセスできる
 *   - また、`lyric-area1`というIDもついている
 * - 4行目の「殊」という箇所に`lyricShower.areas[2]`でアクセスできる
 *   - また、`lyric-area2`というIDもついている
 */
class LyricShower {
    ignoreLineHeight = true;
    fontSize = 30;
    /**
     * @param {number} fontSize
     * @param {string} rawLyric
     * @param {string} defaultHeight
     * @param {boolean} ignoreLineHeight 有効時、歌詞の一行ごとの幅が0pxになる
     */
    constructor(fontSize, rawLyric, defaultHeight, ignoreLineHeight = true) {
        /**@type {HTMLDivElement} */
        this.element = document.getElementById("lyrics");
        this.fontSize = fontSize;
        this.rawLyric = rawLyric;
        this.defaultHeight = defaultHeight;
        this.ignoreLineHeight = ignoreLineHeight;
    }
    apply() {
        this.element.style.lineHeight = this.ignoreLineHeight ? "0px" : "36px";
        this.element.style.fontSize = `${this.fontSize}px`;
        /**@type {HTMLSpanElement[]} */
        this.areas = [];
        this.element.innerHTML = "";
        // 左側に空白がある場合取り除く、改行文字統一(\n)
        this.rawLyric = this.rawLyric
            .replace(/^( )+/, "")
            .replace(/\r\n|\r|\n/, "\n");
        const lines = this.rawLyric.split("\n");
        let lastIsLyric = false;
        lines.forEach((line) => {
            const isBlank = line.startsWith("^");
            if (isBlank) {
                const div = `<div style="height:${line.slice(1)}px"></div>`;
                this.element.innerHTML += div;
                lastIsLyric = false;
            } else {
                if (lastIsLyric) {
                    const div = `<div style="height:${this.defaultHeight}px"></div>`;
                    this.element.innerHTML += div;
                }
                //エスケープ処理+span変換
                const lineLyric = line
                    .replace(/'/g, "&#39;")
                    .replace(/"/g, "&quot;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/{/g, "<span>")
                    .replace(/}/g, "</span>");
                this.element.innerHTML += lineLyric;
                lastIsLyric = true;
            }
        });
        this.element.querySelectorAll("span").forEach((span, index) => {
            span.id = `lyric-area${index}`;
            this.areas.push(span);
        });
    }
}

/**
 * スクロールを管理するクラス
 * 本当は歌詞ごとcanvasかCSSでより細かく管理できるようにすべき
 * */
class ScrollController extends EventTarget {
    scrollSpeed = 120;
    scrollTop = 0;
    /**@type {"up"|"down"} */
    direction = "down";
    directionValue = -1;
    /**
     * @param {number} scrollSpeed 何px/秒
     */
    constructor(scrollSpeed) {
        super();
        /**@type {HTMLHtmlElement} */
        this.element = document.querySelector("html");
        this.scrollSpeed = scrollSpeed;
        this.directionValue = this.direction === "down" ? 1 : -1;
        this.element.scrollTop = 0;
        this.scrollTop = this.element.scrollTop;
        /**@type {Date} */
        this.lastDate = null;
        this.scrolling = false;
    }
    start() {
        this.scrolling = true;
        this.lastDate = new Date();
        this.tick();
    }
    tick() {
        if (!this.scrolling) return;
        requestAnimationFrame(() => this.tick());
        const date = new Date();
        const mill = date - this.lastDate;
        const move =
            this.directionValue * this.scrollSpeed * (mill / 1000) * 0.965;
        this.lastDate = date;
        this.scrollTop += move;
        this.element.scrollTop = this.scrollTop;
        const e = this.element;
        if (
            // 上方向：scrollTopが0以下で停止
            (this.direction === "up" && e.scrollTop <= 0) ||
            // 下方向：スクロールが末尾に到達したら停止
            e.scrollTop + e.clientHeight >= e.scrollHeight
        ) {
            this.stop(true);
        }
    }
    stop(_fulfilled = false) {
        if (!this.scrolling) return;
        this.scrolling = false;
        this.dispatchEvent(
            new CustomEvent("endScroll", { detail: { fulfilled: _fulfilled } })
        );
    }
}

/**
 * LyricShower向けに、歌詞を隠すクラス
 * 出したいタイミングで関数を打つとspan要素で別れているエリアを1つづつ出せる
 */
class LyricHider {
    constructor(lyricShower, fromIndex) {
        /**@type {LyricShower} */
        this.lyric = lyricShower;
        this.from = fromIndex;
        this.count = 0;
        /**@type {HTMLSpanElement[]} */
        this.areas = this.lyric.areas.slice(this.from);
        this.areas.forEach((e) => {
            e.style.color = "transparent";
        });
    }
    show() {
        this.areas[this.count].style.color = "#fff";
        this.count++;
    }
}
class ReductionLyric {
    constructor(speed = 8, startFontSize = 1800, endFontSize = 20) {
        this.speed = speed;
        /**@type {HTMLStyleElement} */
        this.style = document.createElement("style");
        this.style.innerHTML = `
        @keyframes small {
            0% {
                font-size: ${startFontSize}px;
            }
            95% {
                opacity: 1;
            }
            100% {
                font-size: ${endFontSize}px;
                opacity: 0;
            }
        }

        .small_animation {
            animation: small ${speed}s cubic-bezier(0,1.09,.5,.95); forwards;
            position: fixed;
            z-index: 10;
            color: white;
            display: inline;
            text-align: center;
            transform: translate(-50%, -60%);
            top: 50%;
            left: 50%;
            white-space: nowrap;
        }
        `;
        document.body.appendChild(this.style);
    }
    show(lyric) {
        const div = document.createElement("div");
        div.className = "small_animation";
        div.innerText = lyric;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), this.speed * 1000 - 50);
    }
}
