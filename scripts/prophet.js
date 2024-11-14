const prophetsContainer = document.querySelector("#cards");
const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
let prophetsArr = [];


// Fetch data and render initially
const getProphetData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    prophetsArr = data.prophets;
    renderProphets(); // Render all initially

};

getProphetData();


// CALCULATIND THE AGE FROM THEIR BIRTHDATE AND DEATHDATE TO SEE WHO LIVE AFTER 95 YEARS
const calculateAge = (birthdate, deathdate) => {
    const birthDate = new Date(birthdate);
    const deathDate = new Date(deathdate);
    let age = deathDate.getFullYear() - birthDate.getFullYear(); 
    if(deathDate.getMonth() < birthDate.getMonth() || deathDate.getMonth() == birthDate.getMonth() && deathDate.getDate < birthDate.getDate())
    {
        age--;
        
    }
    return age;
}


// Define renderProphets globally
const renderProphets = (filter = 'all') => {
    prophetsContainer.innerHTML = ''; // Clear existing content
    const filteredProphets = prophetsArr.filter(prophet => {
        // if(filter === 'all') {
        //     return true;
        // }
        // if(filter === 'Utah' && prophet.birthplace === filter) {
        //     return true;
        // }
        // if(filter === 'tah' && prophet.birthplace !== 'Utah') {
        //     return true;
        // }
        // if(filter === 10 && prophet.numofchildren >= filter ){
        //     return true;
        // }
        // if(filter === 15 && prophet.length >= filter ) {
        //     return true;
        // }
        
        // return false; REPLACED THE IF STATEMENT TO SWITCH FOR BETTER READABILITY AND EFFIENCY
        switch(filter) {
            case 'all':
                return true;
            case 'Utah':
                return prophet.birthplace === 'Utah';
            case 'tah':
                return prophet.birthplace !== 'Utah';
            case 10:
                return prophet.numofchildren >= 10;
            case 15:
                return prophet.length >= 15;
            case 'age':
                return calculateAge(prophet.birthdate, prophet.death) >= 95; // Check if prophet is older than 95 years old
            default:
                return false;
        }
        
    });

    filteredProphets.forEach(prophet => {
        const prophetCard = document.createElement('div');
        prophetCard.classList.add('cards-content');
        prophetCard.innerHTML = `
            <h1>${prophet.name} ${prophet.lastname}</h1>
            <p>Date of birth: ${prophet.birthdate}</p>
            <p>Place of birth: ${prophet.birthplace}</p>
            <img src="${prophet.imageurl}" alt="${prophet.name}" loading="lazy" />
        `;
        prophetsContainer.appendChild(prophetCard);
    });
};

// Example of adding filter event listeners
document.querySelector("#birthplaceButton").addEventListener("click", () => renderProphets('Utah'));
document.querySelector("#resetButton").addEventListener("click", () => renderProphets('all'));
document.querySelector("#served15").addEventListener("click", () => renderProphets(15));
document.querySelector("#children10").addEventListener("click", () => renderProphets(10));
document.querySelector("#outsideUtah").addEventListener("click", () => renderProphets('tah'));
document.querySelector("#age").addEventListener("click", () => renderProphets('age'));
