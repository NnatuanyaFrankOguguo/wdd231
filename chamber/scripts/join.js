const menu = document.querySelector('#mobile_menu');
const menuLink = document.querySelector('.navbar_menu');

menu.addEventListener('click', function() { 
    menu.classList.toggle('is-active');
    menuLink.classList.toggle('active');
})

// Fetching the data JSON for the modal logic..

const fetchModalData = async (level) => {
    try {
        
        const response = await fetch('data/membership_level.json') 
        const data = await response.json();
        const membershipData = data.membership_level
        const particularMembership = membershipData[level]
        document.getElementById('modal-title').textContent = particularMembership.title;

        const benefitsList = document.getElementById('modal-benefits');
        benefitsList.innerHTML = ''; // Clear previous benefits

        particularMembership.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            benefitsList.appendChild(li);
        });
        
        openModal('dynamic-modal');

        //change the background color of the modal dynamically
        const parentModal = document.querySelector('.modal-content')
        switch(level){
            case 'gold':
                parentModal.style.backgroundColor = '#ffcc00';
                break;
            case'silver':
                parentModal.style.backgroundColor = '#cccccc';
                break;
            case 'bronze':
                parentModal.style.backgroundColor = '#996633';
                break;
            default:
                parentModal.style.backgroundColor = '#ffffff'; // Default color for other levels
        }



    } catch (error) {
        console.error('Error fetching modal data:', error);
        
    }
   
}

const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';

     // Close the modal when clicking outside the modal content
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

const closeModal = (modalId) => {
    document.getElementById(modalId).style.display = 'none';
}


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