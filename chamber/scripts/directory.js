const menu = document.querySelector('#mobile_menu');
const menuLink = document.querySelector('.navbar_menu');

menu.addEventListener('click', function() { 
    menu.classList.toggle('is-active');
    menuLink.classList.toggle('active');
})

// FETCHING THE DATAJSON DIRECTORIES..
const companyContainer = document.querySelector('#cards');
const filePath = 'data/members.json';
let companyData = [];

const getCompanyData = async () => {
    const response = await fetch(filePath);
    const data = await response.json();
    companyData = data.members;
    renderCompanyData(); // Render all initially
}

getCompanyData();

const renderCompanyData = (display = "grid") => {
    companyContainer.innerHTML = ''; // Clear existing content

    // Apply different styles based on the view
    if (display === "list") {
        companyContainer.classList.add('list-view'); // Add list view styles
        companyContainer.classList.remove('grid-view'); // Remove grid view styles
    } else {
        companyContainer.classList.add('grid-view'); // Add grid view styles
        companyContainer.classList.remove('list-view'); // Remove list view styles
    }

    // Render company data
    companyData.forEach(company => {

        const companyCard = document.createElement('div');
        companyCard.classList.add('cards-content');

        if (display === "list") {
            companyCard.style.display = 'flex'; // Set display to flex for list view
            companyCard.style.flexDirection = 'row'; // Align items in a row
            companyCard.style.alignItems = 'center'; // Center items vertically

            const companyName = document.createElement('p');
            companyName.textContent = company.name;

            const companyAddress = document.createElement('p');
            companyAddress.textContent = company.address;

            const companyPhone = document.createElement('p');
            companyPhone.textContent = company.phone;

            const companyLink = document.createElement('a');
            companyLink.href = company.website;
            companyLink.textContent = 'Visit Website';

            companyCard.appendChild(companyName);
            companyCard.appendChild(companyAddress);
            companyCard.appendChild(companyPhone);
            companyCard.appendChild(companyLink);
        } else if (display === "grid") {
            companyCard.style.boxShadow = 'rgba(13, 12, 12, 0.35) 0px 5px 15px;'; // Set display to block for grid 
            

            const companyImage = document.createElement('img');
            companyImage.src = company.image;
            companyImage.alt = 'company image';

            // const companyName = document.createElement('p');
            // companyName.textContent = company.name;

            const companyAddress = document.createElement('p');
            companyAddress.textContent = company.address;

            const companyPhone = document.createElement('p');
            companyPhone.textContent = company.phone;

            const companyLink = document.createElement('a');
            companyLink.href = company.website;
            companyLink.textContent = 'Visit Website';

            companyCard.appendChild(companyImage);
            companyCard.appendChild(companyAddress);
            companyCard.appendChild(companyPhone);
            companyCard.appendChild(companyLink);
        }

        companyContainer.appendChild(companyCard);
    


    });
};


document.querySelector("#list").addEventListener("click", () => renderCompanyData("list"));

document.querySelector("#grid").addEventListener("click", () => renderCompanyData("grid"));


















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
// setInterval(updateDateTime, 1000);

// Initial call to display the current date and time immediately
updateDateTime();