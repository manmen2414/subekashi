
var defaultDummybuttonsEle = document.getElementsByClassName("dummybuttons")[0];

function showPlusAtRandom(){
    const plus = document.createElement("div");
    plus.innerText = "+";
    plus.style.position = "fixed";
    plus.style.color = "#8d8d8dff";
    plus.style.top = `${Math.random()*innerHeight}px`;
    plus.style.left = `${Math.random()*innerWidth}px`;
    plus.style.opacity = "1";
    plus.style.transition = "opacity 2s ease";
    plus.style.fontSize = "17px";
    plus.style.fontFamily = "normal";
    document.body.appendChild(plus);
    setTimeout(()=>{
        plus.style.opacity = "0";
    },50)
    setTimeout(()=>{
        plus.remove();
    },2050)
}


function special() {
    defaultDummybuttonsEle.remove();
    setInterval(()=>{
        for (let i = 0; i < (Math.random()*5)+1; i++) {
            showPlusAtRandom();
        }
    },2000)

    const style = document.createElement("style");
    style.innerHTML = ".blue{color:#7a76f1;} .blue2{color:#041d69;} .green{color:#08651d;} .red{color:#2f0511;} #yakusoku{text-decoration:underline;}"
    document.head.appendChild(style);

    document.querySelector("#lyrics").innerHTML = `
    もしも、<br>
    夜星になれたら、<br>
    歌が落とした色を拾い集めて、<br><br>
    いつか、<br>
    夜空の端まで、<br>
    描く一の目はやがて<br>
    標となるでしょう。<br><br>
    もしも、<br>
    自らを訝り、<br>
    訳無しを厭う者が消えてゆくなら、<br><br>
    諍い畏れた<span class="blue">右</span>の筆、<br>
    遠巻きで焦がれるがまま。<br><br>
    編まれた意図が、対の杭に掛けられて、<br>
    決断の兆しを待っていた。<br>
    霞む音と音が、<br>
    忌むべ<span class="blue">き</span>物に化けていた、<br>
    道はもう交わらない<span class="blue">の</span>？<br><br>
    掴み取る啓示を進む糧に変えた、<br>
    彼我の境の真<span class="blue">似</span>事の上で、<br>
    足踏みして、<br>
    星座の切れ端が初めから輝くなら、<br>
    <span class="blue">非</span>自明な不透明度に、<br>
    あなたも騙さ<span class="blue">れ</span>ていたんだ！<br><br>
    見たいモノだけを見て、<br>
    擬えの多寡を知る、<br>
    漂った枝葉に掛けた言葉があると、<br>
    覚えていよう、<br>
    約束だよ。<br><br><br>
    もしも、<br>
    あなたを差し招く、<br>
    行く先の逃げ水も消えてゆくなら、<br>
    融け合い、疑り深い程に、<br>
    想像が価値を歪めていく。<br><br>
    退け<span class="blue">よ</span>うと乱れる航海は、<br>
    天の焉てを、逢瀬を、<br>
    端にも信じてくれなかった、<br>
    もう逢<span class="blue">え</span>ぬと知っているのに！<br><br>
    繋ぎ止めたままの過ちの味を知る、<br><br>
    歩み出す創世を切<span class="blue">な</span>る願いとした、<br>
    埋まらない最後のピースは、<br>
    痘<span class="blue2">痕</span>の影を模し<span class="blue">て</span>、<br>
    星<span class="blue">座</span>の切れ<span class="green">端</span>を誰かが盗み出したら、<br>
    灯<span class="red">火</span>の不誠実さに、<br>
    いつ<span class="blue">か</span>は滞んで行くのさ！<br><br>
    信じたいモノを信じて、<br>
    色に縋る侭に、<br>
    <span class="blue">誤</span>った祝詞に捧ぐ無何有の郷を、<br>
    見つけて欲しいの、<br>
    <span id="yakusoku">約束</span>だよ。<br><br>
    美しいままに終わる者よ、<br>
    廻間に生きた声を手繰る者よ、<br>
    名も無き海に<span id="yakusoku">堕</span>ちた曙光を、<br>
    取り戻すと誓った、<br>
    あなたが旅立つまでに。`;

    const yakusoku = document.querySelector("#yakusoku");
    yakusoku.addEventListener("mouseover",()=>{yakusoku.innerText="⠹⠫⠥⠰"});
    yakusoku.addEventListener("mouseleave",()=>{yakusoku.innerText="約束"});
    yakusoku.addEventListener("touchstart",()=>{
        yakusoku.innerText=yakusoku.innerText==="約束"?"⠹⠫⠥⠰":"約束";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    add_special_button();
});