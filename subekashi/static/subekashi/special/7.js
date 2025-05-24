const beat4blank = 200;

const lyric = `誰もそこにいない事、^16
誰にも教えたくなくて、^16
誰もそこにいないなら、^16
見つめているのはだあれ？^16
あなたがここにいない事、^16
あなたにも教えたくなくて、^16
あなたもここにいないなら、^16
なにを見つめているの？^16
それは土を捏ねて作ったヒトの様だった。^14
脊髄という名の神経の、^12
片方の端が膨らんで、^20
自ら意思を持ち始め、^12
我々を操り始めたのです。^16
^73
いつもそこにいない事、^16
いつもあなたに教えたくて、^16
いつもそこにいないなら、^16
なにを追いかけているの？^16
あなたがここにいない事、^16
あなたにも教えたくなくて、^16
あなたもここにいないなら、^16
なにを見つめているの？^16
それは型だけを模したミメシスの様だった。^14
脊髄という名の神経の、^12
片方の端が膨らんで、^20
自ら意思を持ち始め、^12
我々を操り始めたのです。^16`;
const KENBANS = [
    "232153355351332142635200136062250566544303116634466216204110014 232153355351332142635200136062250566544303116634466216204110014 ",
];
const wait = (n) => new Promise((r) => setTimeout(() => r(), n * 1000));
class Kenban {
    static inited = false;
    constructor(noteStr, waitSecond) {
        Kenban.initKenban();
        /**@type {string} */
        this.note = noteStr;
        /**@type {number} */
        this.waitSecond = waitSecond;
        /**@type {HTMLDivElement} */
        this.kenban = document.querySelector("#kenban-main");
        this.index = 0;
        this.playing = false;
    }
    async play() {
        this.playing = true;
        for (let i = 0; i < this.note.length; i++) {
            this.playNote();
            await wait(this.waitSecond - 0.008);
        }
        this.playing = false;
        return true;
    }
    playNote() {
        this.clickNote(this.note[this.index]);
        this.index++;
        return this.index - 1;
    }
    clickNote(id) {
        const element = document.getElementById(`kenban-${id}`);
        if (!!element) element.classList.add("active");
        setTimeout(() => {
            if (!!element) element.classList.remove("active");
        }, 100);
    }
    static destory() {
        document.querySelector("#kenban-main").remove();
        this.inited = false;
    }
    static initKenban() {
        if (this.inited) return;
        this.inited = true;
        const kenbanDivStr = `
<div id="kenban-main" >
    <div class="kenban-white" id="kenban-0"><div class="kenban-black"></div></div>
    <div class="kenban-white" id="kenban-1"><div class="kenban-black" id="kenban-2"></div></div>
    <div class="kenban-white"></div>
    <div class="kenban-white" id="kenban-3"><div class="kenban-black"></div></div>
    <div class="kenban-white" id="kenban-4"><div class="kenban-black"></div></div>
    <div class="kenban-white"><div class="kenban-black" id="kenban-5"></div></div>
    <div class="kenban-white"></div>
    <div class="kenban-white" id="kenban-6"></div>
    <style>
    #kenban-main{position: fixed;bottom: 200px;border: solid #535353 3px;display: flex;left: 50%;transform: translateX(-50%);}
    .kenban-white {width: 50px;height: 140px;background-color: white;border: solid #545454 3px;}
    .kenban-white.active{background-color:#979797;}
    .kenban-black {width: 40px;position: absolute;background: #777777;height: 100px;transform: translate(33px,0px);}
    .kenban-black.active{background-color:#2a2a2a;}
    </style>
</div>
`;
        document.body.appendChild(stringToHTML(kenbanDivStr));
    }
}
const BPM = 150;
/**@type {SpecialSong?} */
let specialsong;
document.addEventListener("DOMContentLoaded", () => {
    addPlayStopButton();
});
async function special() {
    const reductionLyric = new ReductionLyric();
    if (!!specialsong) {
        specialsong.stop();
        specialsong = null;
        return;
    }
    const blankLyric = new LyricShower(0, `^10000`);
    blankLyric.apply();
    document.querySelector("html").scrollTop = 3000;
    const songAudio = new SongAudio(
        `${baseURL()}/static/subekashi/special/${
            location.pathname.split("/")[2]
        }.mp3`
    );
    specialsong = new SpecialSong(BPM, 4, songAudio);
    songAudio.addEventListener("audioReady", async () => {
        const kenban = new Kenban("", 30 / specialsong.bpm);
        kenban.kenban.style.opacity = `0`;
        await specialsong.play();
        await wait(20.5);
        console.log("教育");
        startKyouikuMoji();
        await wait(25.5);
        console.log("開始");
        showLyric(reductionLyric);
        await specialsong.waitPerMeadow(52.0);
        console.log("鍵盤１回目");
        playKenban(kenban, KENBANS[0]);
        await specialsong.waitPerMeter(73);
        console.log("2番");
    });
}
/**
 * @param {Kenban} kenban
 * @param {string} note
 */
async function playKenban(kenban, note) {
    for (let i = 0; i < 16; i++) {
        kenban.kenban.style.opacity = `${0.0625 * (i + 1)}`;
        await specialsong.waitPerMeter(0.0625);
    }
    kenban.note = note;
    await kenban.play();
    for (let i = 0; i < 16; i++) {
        kenban.kenban.style.opacity = `${0.0625 * (15 - i)}`;
        await specialsong.waitPerMeter(0.0625);
    }
}
async function showLyric(reductionLyric) {
    const lines = lyric.split("\n");
    /**
     * @param {string} line
     * @returns
     */
    const func = (line) =>
        new Promise(async (r) => {
            const [text, waitTime] = line.split("^");
            reductionLyric.show(text);
            await specialsong.waitPerMeter(parseFloat(waitTime));
            r();
        });
    for (const index in lines) {
        await func(lines[index]);
    }
}
function startKyouikuMoji() {}
