const DAY_JA = ["日", "月", "火", "水", "木", "金", "土"];
const DAY_EN = ["SuNDaY", "MoNDaY", "TUESDaY", "WeDNESDaY", "ThursDaY", "FRiDaY", "SATRRDaY"];
const TIME = [" 　　朝", "　昼間", "放課後", "　　夜"];

updateClock();
setInterval(() => updateClock(), 60000);

function updateClock(){
    var d = new Date();
	var month = d.getMonth() + 1;
	var date = d.getDate();
	var day = d.getDay();
	var hour = d.getHours();
    var time = "";

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

    // spanを挟む
    month = month.split('').join('</span><span>');
    date = date.split('').join('</span><span>');
    var day_en = DAY_EN[day].split('').map((char, index) => index % 2 === 0 ? `<span>${char}</span>` : `${char}`).join('');
    time = time.split('').join('</span><span>');

    document.getElementById('month').innerHTML = month;
	document.getElementById('date').innerHTML = date;
    document.getElementById('day_ja').textContent = DAY_JA[day];
    document.getElementById('day_en').innerHTML = day_en;
    document.getElementById('time').innerHTML = time;
}