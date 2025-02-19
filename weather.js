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
            document.getElementById('weather').textContent = weather;
        })
        .catch(error => {
            console.log(error);
        });
}