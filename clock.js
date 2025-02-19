const DAY_JA = ["日", "月", "火", "水", "木", "金", "土"];
const DAY_EN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const TIME = ["朝", "昼", "放課後", "夜"];

updateClock();
setInterval(updateClock(), 1000);

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

	var text = month + '/' + date + ' ' + DAY_JA[day] + ' ' + DAY_EN[day] + ' ' + time + ' ';
	document.getElementById("clock").innerHTML = text;
}