const menu = document.querySelector('#mobile_menu');
const menuLink = document.querySelector('.navbar_menu');

menu.addEventListener('click', function() { 
    menu.classList.toggle('is-active');
    menuLink.classList.toggle('active');
})

//LOCAL STORAGE FOR VISITOR MESSAGE

const visitorMessage = document.getElementById('visitor-messages');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now(); 

if (!lastVisit) {
    visitorMessage.textContent = "Welcome! let us Know if You have any Question.";
} else {
    const timeDifference = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (timeDifference < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!.";
    } else if(timeDifference === 1) {
        visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitorMessage.textContent = `You last visited ${timeDifference} days ago.`;
    }
}

localStorage.setItem('lastVisit', now);

// LAZY LOADING FOR IMAGES
const images = document.querySelectorAll(`img[loading="lazy"]`)
const lazyLoad = () => {
    images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src; // Replace placeholder with the actual image
            img.onload = () => img.removeAttribute('data-src'); // Clean up
        }
    })
}

// Trigger lazy loading when the user scrolls
document.addEventListener('scroll', lazyLoad, {once: true});






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