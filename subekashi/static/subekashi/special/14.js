const beat4blank = 200;

const lyric = `
^300
歌声が聞こえた、
空をたゆたうあなたの声。
この日は強い風の日で、
見上げたらもう、いなくなっていた。
ゆうやけこやけのチャイムは、
はやくお帰りよと、
そっと教えてくれたけど、
目を開けたら、
^${beat4blank}
日が{暮}{れ}{て}{い}{た。}
^${beat4blank}
帰りの空は
^${beat4blank}
とても赤くて、
^${beat4blank}
急いだのを
^${beat4blank}
覚えています。
^${beat4blank}
名の無い星が
^${beat4blank}
空に堕ちたら、
^${beat4blank}
くじらの歌が
^${beat4blank}
聞こえました。
^${beat4blank}
天の川の方へ、
どんどん伸びる彼方の影。
呼ぶ声が聞こえないほど、
遠くの空へ飛んでいった。
むつまじく
^${beat4blank}
あやとりをして
^${beat4blank}
わらうのに
^${beat4blank}
むちゅうで
^${beat4blank}
めをつむり
^${beat4blank}
かぞえおろして
^${beat4blank}
たのしそうに
^${beat4blank}
てをふっていた
^${beat4blank * 1.5}
帰りの空は
^${beat4blank}
とても赤くて、
^${beat4blank}
見るやいなや
^${beat4blank}
走っていった。
^${beat4blank}
名の無い星が
^${beat4blank}
空に堕ちたら、
^${beat4blank}
くじらの歌が
^${beat4blank}
聞こえるでしょう。
^${beat4blank}
わらべうたの意味は、
二度と思い出せず。
ゆるやかに忘れられて、
{瑠璃色}{の}{石}{に}{なる}{でしょう。}
帰りの空は
^${beat4blank}
とても赤くて、
^${beat4blank}
見るやいなや
^${beat4blank}
走っていった。
^${beat4blank}
名の無い星が
^${beat4blank}
空に堕ちたら、
^${beat4blank}
くじらの歌が
^${beat4blank}
聞こえるでしょう。
^${beat4blank}
帰りの空は
^${beat4blank}
とても赤くて、
^${beat4blank}
見るやいなや
^${beat4blank}
走っていった。
^${beat4blank}
名の無い星が
^${beat4blank}
空に堕ちたら、
^${beat4blank}
くじらの歌が
^${beat4blank}
聞こえるでしょう。
^${beat4blank}
歌声が聞こえた、
空をたゆたうあなたの声。
^2000
`;

const BPM = 100;
const WAITTIME = 22.4;
/**@type {SpecialSong?} */
let specialsong;
document.addEventListener("DOMContentLoaded", () => {
    addPlayStopButton();
});
async function special() {
    if (!!specialsong) {
        specialsong.stop();
        specialsong = null;
        return;
    }
    const songAudio = new SongAudio(
        `${baseURL()}/static/subekashi/special/${
            location.pathname.split("/")[2]
        }.mp3`
    );
    const scrollController = new ScrollController(
        ((BPM / 60) * beat4blank) / 4 + 3.3
    );
    const lyricShower = new LyricShower(60, lyric, beat4blank * 2, true);
    const song = new SpecialSong(
        BPM,
        4,
        songAudio,
        scrollController,
        lyricShower
    );
    specialsong = song;
    song.waitTime = WAITTIME;
    songAudio.addEventListener("audioReady", () => {
        song.play();
    });
    await song.waitPerMeadow(0.75);

    showToast(
        "ok",
        "本日は？？？？??？？に御アクセスいただき、ありがとうございます。大変申し訳ありませんが、"
    );
    await song.waitPerMeadow(2.6);
    showToast(
        "warning",
        'この動画はアップロード者が<span style="color:red;">？？？？???？？</span>した為、'
    );
    await song.waitPerMeadow(2);
    showToast(
        "warning",
        'ご覧になることが<span style="color:red;">出来ません。</span>'
    );
    await song.waitPerMeadow(1);
    showToast("info", "またの御アクセスをお待ちしております。");
    song.addEventListener("started", async () => {
        const hider = new LyricHider(lyricShower, 0);
        await song.waitPerMeadow(15);
        for (let i = 0; i < 5; i++) {
            hider.show();
            await song.waitPerMeter(0.5);
        }
        await song.waitPerMeter(4 - 2.5);
        await song.waitPerMeadow(15.75);
        showToast("warning", "むすんだのは");
        await song.waitPerMeadow(8 / 8);
        showToast("warning", "あかいいとで");
        await song.waitPerMeadow(8 / 8);
        showToast("warning", "だれと");
        await song.waitPerMeadow(5 / 8);
        showToast("warning", "わらってるの");
        await song.waitPerMeadow(11 / 8);
        showToast("warning", "めをあけて");
        await song.waitPerMeadow(7 / 8);
        showToast("warning", "いきをころして");
        await song.waitPerMeadow(9 / 8);
        showToast("warning", "だれのほうに");
        await song.waitPerMeadow(7 / 8);
        showToast("warning", "てをふってるの");
        await song.waitPerMeter(7);
        await song.waitPerMeadow(8);
        await song.waitPerMeadow(5 + 7 / 8);
        hider.show();
        await song.waitPerMeadow(4 / 8);
        hider.show();
        await song.waitPerMeadow(1 / 8);
        hider.show();
        await song.waitPerMeadow(3 / 8);
        hider.show();
        await song.waitPerMeadow(1 / 8);
        hider.show();
        await song.waitPerMeadow(2 / 8);
        hider.show();
        await song.waitPerMeadow(6 / 8);
        //rainのコード流用
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();
        const { clientWidth, clientHeight } = canvas;
        const aside = document.querySelector("aside");
        const gradient = ctx.createLinearGradient(
            clientWidth / 2,
            0,
            clientWidth / 2,
            clientHeight * 0.75
        );
        gradient.addColorStop(0, "#ff9241");
        gradient.addColorStop(1, "#111111");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, clientWidth, clientHeight);
        //四分の間にフェードイン
        for (let i = 0; i < 16; i++) {
            canvas.style.opacity = `${0.0625 * (i + 1)}`;
            aside.style.opacity = `${0.0625 * (15 - i)}`;
            await song.waitPerMeter(0.0625);
        }
        await song.waitPerMeadow(15.5);
        //四分の間にフェードアウト
        for (let i = 0; i < 16; i++) {
            aside.style.opacity = `${0.0625 * (i + 1)}`;
            canvas.style.opacity = `${0.0625 * (15 - i)}`;
            await song.waitPerMeter(0.0625);
        }
    });
}
