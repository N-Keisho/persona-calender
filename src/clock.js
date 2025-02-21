const DAY_JA = ["日", "月", "火", "水", "木", "金", "土"];
const DAY_EN = ["SuNDaY", "MoNDaY", "TUESDaY", "WeDNESDaY", "ThursDaY", "FRiDaY", "SATRRDaY"];
const TIME = [" 　　朝", "　昼間", "放課後", "　　夜"];

const YEAR = new Date().getFullYear();
var holiday = undefined;


loadHoliday();
updateClock();

// 1分ごとに更新
setInterval(() => updateClock(), 60000);

// 祝日データを読み込む
// 内閣府のホームページからデータを取得して更新する必要あり
function loadHoliday() {
    fetch(`../data/holiday${YEAR}.json`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            holiday = data;
        })
        .catch(error => {
            console.log(error);
        });
}

function updateClock(){
    var d = new Date();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var day = d.getDay();
	var hour = d.getHours();
    var time = "";
    var isHoliday = false;

    if(hour >= 5 && hour < 11){
        time = TIME[0];
    }
    else if(hour >= 11 && hour < 16){
        time = TIME[1];
    }
    else if(hour >= 16 && hour < 20){
        time = TIME[2];
    }
    else{
        time = TIME[3];
    }

    // 0埋め
    month = ("0" + month).slice(-2);
    date = ("0" + date).slice(-2);

    // 祝日判定
    if(holiday === undefined){ // データが読み込まれていない場合は再度読み込む
        setTimeout(() => updateClock(), 100);
        return;
    }
    for( const h of holiday.holidays){
        if(h.month === month && h.date === date){
            isHoliday = true;
            break;
        }
    }

    // spanを挟む - CSSでがたがたさせるため
    month = month.split('').join('</span><span>');
    date = date.split('').join('</span><span>');
    var day_en = DAY_EN[day].split('').map((char, index) => index % 2 === 0 ? `<span>${char}</span>` : `${char}`).join('');
    time = time.split('').join('</span><span>');

    // 数字を表示
    document.getElementById('month').innerHTML = month;
	document.getElementById('date').innerHTML = date;
    document.getElementById('day_ja').textContent = DAY_JA[day];
    document.getElementById('day_en').innerHTML = day_en;
    document.getElementById('time').innerHTML = time;

    // 土日祝日の場合は色を変える
    if(day === 0 || isHoliday){
        document.getElementById('day_en').style.filter = 'url(#dilate_orow)';
        document.getElementById('day_ja_bg').style.backgroundColor = 'rgba(255, 0, 0)';
    }
    else if(day === 6){
        document.getElementById('day_en').style.filter = 'url(#dilate_obow)';
        document.getElementById('day_ja_bg').style.backgroundColor = 'rgba(0, 255, 255)';
    }
}