const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDescription = document.querySelector('figcaption');

const apiKey = 'a6cc1b99e6a55af96a1ad4238ae31676'
const lat = 49.75
const lon = 6.62

url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
// Fetch weather data from API
const getWhether = async(url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(response)
        console.log(data)
        renderwhether(data)
        
    } catch (error) {
        console.log(error.message)
        
    }
    
}

getWhether(url)

const renderwhether = (data) => {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('alt', 'Sunny weatherIcon')
    captionDescription.innerHTML = data.weather[0].description;
}