const DAY_JA = ["日", "月", "火", "水", "木", "金", "土"];
const DAY_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME = ["朝", "昼", "放課後", "夜"];

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

	document.getElementById('date').textContent = month + "/" + date;
    document.getElementById('day_ja').textContent = DAY_JA[day];
    document.getElementById('day_en').textContent = DAY_EN[day];
    document.getElementById('time').textContent = time;
}