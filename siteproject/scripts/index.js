import { responsiveNavbar } from "./navbar.js";
import { getCurrentYear } from "./navbar.js";

// Initialize responsiveNavbar 
responsiveNavbar()
document.querySelector("#year").textContent = getCurrentYear();

const filePath = 'data/AC.json'
let acData = [];


const getAcData = async () => {
    try {
        const response = await fetch(filePath)
        const data = await response.json();
        acData = data.airConditioningSystems;
        console.log(acData);
        renderAcData(acData);

    } catch (error) {
        console.log(error.message);
    }
}

getAcData();

const renderAcData = (data) => {
    const randomNumbers = new Set();
    
    // Generate 3 unique random numbers between 0 and data.length - 1
    while (randomNumbers.size < 3) {
        randomNumbers.add(Math.floor(Math.random() * data.length));
        
    }
    // converting the set class to an array
    const randomIndices = [...randomNumbers]
    
    const spotLight = randomIndices.map(index => data[index])

    // Get the container
    const acContainer = document.querySelector('#cards');
    
    // Remove any existing cards
    acContainer.innerHTML = '';
    
    // Populate the container with selected members
    spotLight.forEach(ac => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        const acImg = document.createElement('img');
        const acName = document.createElement('h2');
        const acDescription = document.createElement('p');
        
        // Set the company details
        acImg.src = ac.image;
        acImg.setAttribute('alt', `${ac.name}`);
        acName.textContent = ac.name;
        acDescription.textContent = ac.description;
        
        // Append the elements to the card
        card.appendChild(acImg);
        card.appendChild(acName);
        card.appendChild(acDescription);
        
        // Append the card to the container
        acContainer.appendChild(card);

    })
}