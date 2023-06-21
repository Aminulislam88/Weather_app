// API configuration
const apiKey = 'd6c3fa7a15384efc97073333232006'; // Replace with your actual API key
const apiUrl = 'https://api.weatherapi.com/v1/current.json';

// Get weather data for a location
const getWeatherData = async (location) => {
    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}&q=${location}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error.message);
        }
    } catch (error) {
        throw new Error('Failed to fetch weather data.');
    }
};

// Update the weather information on the page
const updateWeatherInfo = (weatherData) => {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
    <h3>${weatherData.location.name}, ${weatherData.location.country}</h3>
    <p>Temperature: ${weatherData.current.temp_c}°C</p>
    <p>Condition: ${weatherData.current.condition.text}</p>
    <p>Humidity: ${weatherData.current.humidity}%</p>
  `;
};

// Handle button click event
const getWeatherBtn = document.getElementById('getWeatherBtn');
getWeatherBtn.addEventListener('click', async () => {
    const locationInput = document.getElementById('locationInput');
    const location = locationInput.value;
    if (location) {
        try {
            const weatherData = await getWeatherData(location);
            updateWeatherInfo(weatherData);
        } catch (error) {
            alert(error.message);
        }
    } else {
        alert('Please enter a location.');
    }
});
