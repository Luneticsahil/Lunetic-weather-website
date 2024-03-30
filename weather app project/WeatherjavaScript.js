const apiKey = "3052ded28e8bec25bac6810c55c7c350";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city));
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const humidity = data.main.humidity;
    const windSpeed = mpsToKmph(data.wind.speed);

    const weather = document.querySelector('.weather');
    const temperatureElement = document.getElementById('temperature');
    const icon1 = document.getElementById('icon1');
    const icon2 = document.getElementById('icon2');
    const weatherDescription = document.getElementById('weather-description');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    temperatureElement.textContent = temp;
    icon1.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon2.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDescription.textContent = data.weather[0].main;
    humidityElement.textContent = humidity;
    windSpeedElement.textContent = windSpeed;

    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

function mpsToKmph(mps) {
    return (mps * 3.6).toFixed(2);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    }
});
