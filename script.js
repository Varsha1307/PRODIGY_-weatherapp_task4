const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeather(location);
});

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Location not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayWeather(data) {
    const { name, main, weather } = data;
    weatherResult.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>Temperature: ${main.temp} °C</p>
        <p>Condition: ${weather[0].description}</p>
    `;
}