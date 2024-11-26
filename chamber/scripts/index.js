const menu = document.querySelector('#mobile_menu');
const menuLink = document.querySelector('.navbar_menu');

menu.addEventListener('click', function() { 
    menu.classList.toggle('is-active');
    menuLink.classList.toggle('active');
})

// Fetching the data JSON for weather..

const weatherContainer = document.querySelector('#weather-card');
const forecast = document.querySelector('#forecast');

const apiKey = 'a6cc1b99e6a55af96a1ad4238ae31676';
const lat = 6.60    
const lon = 3.34

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
// Fetch weather data from API
const getWeather = async(url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        renderWeather(data)
        
    } catch (error) {
        console.log(error.message)
        
    }
    
}

const capitalizeWords = (str) => {
    return str
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join the words back into a single string
}

getWeather(url)

const renderWeather = (data) => {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('weatherContainer');
    
    const weatherTemp = document.createElement('h3');
    const weatherHumidity = document.createElement('p');
    const weatherWindSpeed = document.createElement('p');
    const stateName = document.createElement('h2');


    // Format numbers to zero decimal points
    const formattedTemp = Math.round(data.main.temp); 
    const formattedWindSpeed = Math.round(data.wind.speed);

    weatherTemp.textContent = `${formattedTemp}℉`;
    //weatherDesc.textContent =
    //weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    //weatherIcon.setAttribute('alt', 'Weather Icon');
    weatherHumidity.textContent = `Humidity: ${data.main.humidity}%`;
    weatherWindSpeed.textContent = `Wind Speed: ${formattedWindSpeed} mph`;
    stateName.textContent = `${data.name}, ${data.sys.country}`;

    cardsContainer.appendChild(stateName);
    //cardsContainer.appendChild(weatherIcon);
    cardsContainer.appendChild(weatherTemp);
    //cardsContainer.appendChild(weatherDesc);
    cardsContainer.appendChild(weatherHumidity);
    cardsContainer.appendChild(weatherWindSpeed);

    data.weather.forEach(weather => {
        const weatherContainer = document.createElement('div');
        weatherContainer.classList.add('singleWeather');

        const weatherIcon = document.createElement('img');
        const weatherDesc = document.createElement('p');

        weatherDesc.textContent = capitalizeWords(weather.description);
        weatherIcon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        weatherIcon.setAttribute('alt', 'Weather Icon');
        
        cardsContainer.appendChild(weatherDesc);
        cardsContainer.appendChild(weatherIcon);

        // cardsContainer.appendChild(weatherContainer);
    })

    weatherContainer.appendChild(cardsContainer);
    
};

const getForecast = async (forecastUrl) => {
    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();
        renderThreeDayForecast(data);

    } catch (err) {
        console.error('Error fetching forecast data:', err);
    }

}

const renderThreeDayForecast = (data) => {
    const forecastContainer = document.createElement('div');
    forecastContainer.classList.add('forecastContainer');

    // Filter data for one forecast per day (e.g., 12:00 PM)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    dailyForecasts.slice(0, 3).forEach(day => {
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('dayForecast');

        // Extract and format data
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
        const temp = Math.round(day.main.temp);
        const weatherDesc = capitalizeWords(day.weather[0].description);
        const weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

        // Create and append elements
        const dateElement = document.createElement('h3');
        dateElement.textContent = date;

        const iconElement = document.createElement('img');
        iconElement.src = weatherIcon;
        iconElement.alt = `Weather Icon - ${weatherDesc}`;

        const tempElement = document.createElement('p');
        tempElement.textContent = `${temp}℉`;

        const descElement = document.createElement('p');
        descElement.textContent = weatherDesc;

        dayContainer.appendChild(dateElement);
        dayContainer.appendChild(iconElement);
        dayContainer.appendChild(tempElement);
        dayContainer.appendChild(descElement);

        forecastContainer.appendChild(dayContainer);
    });

    forecast.appendChild(forecastContainer);
};


getForecast(forecastUrl)


// FETCHING THE COMPANY DATA TO DISPLAY AT THE FRONTEND


const filePath = 'data/members.json'
let companyData = [];

const getCompanyData = async () => {
    const response = await fetch(filePath);
    const data = await response.json();
    companyData = data.members;
    console.log(companyData)
    renderCompanyData(companyData); // Render all initially
}

getCompanyData();

const renderCompanyData = (companydata) => {

    const spotlightMembers = companydata.filter(member => 
    member.membership === "gold" || member.membership === "gold")

    //shuffle the array
    spotlightMembers.sort(() => Math.random() - 0.5);
    
    // Select two or three members
    const selectedMembers = spotlightMembers.slice(0, 3);

    // Get the container
    const companyContainer = document.querySelector('#cards');

    // Remove any existing cards
    companyContainer.innerHTML = '';

    // Populate the container with selected members
    selectedMembers.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
    const companyImg = document.createElement('img');
    const companyName = document.createElement('h2');
    const companyAddress = document.createElement('p');
    const companyPhone = document.createElement('p');
    const companyDesc = document.createElement('p');
    const companyWebsite = document.createElement('a');
    const companyMembership = document.createElement('p');
    
    // Set the company details
    companyImg.src = member.image;
    companyImg.setAttribute('alt', "companyImage");
    companyName.textContent = member.name;
    companyAddress.textContent = member.address;
    companyPhone.textContent = `Phone: ${member.phone}`;
    companyDesc.textContent = member.description;
    companyWebsite.href = member.website;
    companyWebsite.textContent = `Visit Website`;
    companyWebsite.target = '_blank'; // Open link in new tab
    companyMembership.textContent = `Membership: ${member.membership}`;

    // Add the elements to the card
    card.appendChild(companyImg);
    card.appendChild(companyName);
    card.appendChild(companyAddress);
    card.appendChild(companyPhone);
    card.appendChild(companyWebsite);
    card.appendChild(companyDesc);
    card.appendChild(companyMembership);
    
    // Add the card to the container
    companyContainer.appendChild(card);
   }) 
}










// FOOTER DATE JS
function getCurrentYear() {
    const now = new Date();
    return now.getFullYear(); 
}


function getCurrentDateTime() {
    const now = new Date(); // Get the current date and time

    // Extract date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = String(now.getDate()).padStart(2, '0');

    // Extract time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Format the date and time as a string
    const currentDate = `${day}/${month}/${year}`;
    const currentTime = `${hours}:${minutes}:${seconds}`;

    // Combine the date and time
    return `${currentDate} ${currentTime}`;
}

function updateDateTime() {
    document.getElementById('lastModified').textContent = getCurrentDateTime();
    document.getElementById('year').textContent = getCurrentYear();
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display the current date and time immediately
updateDateTime();
