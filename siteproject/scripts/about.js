import { responsiveNavbar } from "./navbar.js";
import { getCurrentYear } from "./navbar.js";

// Initialize responsiveNavbar 
responsiveNavbar()
document.querySelector("#year").textContent = getCurrentYear();

const filePath = 'data/AC.json'
let acData = [];
const acContainer = document.querySelector('#cards');

const getAcData = async () => {
    try {
        const response = await fetch(filePath)
        const data = await response.json();
        acData = data.airConditioningSystems;
        renderAcData();

    } catch (error) {
        console.log(error.message);
    }
}

getAcData();

const renderAcData = () => {

    // Render company data
    acData.forEach(ac => {

        const acCard = document.createElement('div');
        acCard.classList.add('cards-contents');
         
        acCard.style.display = 'grid'; // Set display to block for grid 
        acContainer.classList.add('cards-container'); 
        

        const acImage = document.createElement('img');
        acImage.src = ac.image;
        acImage.alt = 'ac image';

        // const acName = document.createElement('p');
        // acName.textContent = ac.name;

        const acdescription = document.createElement('p');
        acdescription.textContent = ac.description;

        const acName = document.createElement('h2');
        acName.textContent = ac.Name;

        acCard.appendChild(acImage);
        acCard.appendChild(acdescription);
        acCard.appendChild(acName);
        
        

        acContainer.appendChild(acCard);
    


    });


}