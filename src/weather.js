const url = 'https://weather.tsukumijima.net/api/forecast/city/130010';

getWeather();

function getWeather() {
    
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const weather = data.forecasts[0].telop;
            console.log(weather);
            return weather;
        })
        .then(weather => {
            if(weather.includes('雨')){
                weather = 'rain';
            }
            else if(weather.includes('晴')){
                weather = 'sunny';
            }
            else if(weather.includes('曇')){
                weather = 'cloud';
            }
            else {
                weather = 'cloud';
            }

            document.getElementById('weather').src = `./img/${weather}.png`;
            document.getElementById('weather').style.animation = `${weather} 5s infinite`;
        })
        .catch(error => {
            console.log(error);
        });
}