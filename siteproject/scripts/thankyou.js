import { responsiveNavbar } from "./navbar.js";
import { getCurrentYear } from "./navbar.js";

// Initialize responsiveNavbar 
responsiveNavbar()
document.querySelector("#year").textContent = getCurrentYear();


// QUERY PARAMS EXTRACTION FROM THE URL

const  getQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlParams.entries());
}

const displayUserDetails = () => {
    const userDetails = getQueryParams();
    const { firstname, lastname, address, email, phone, date, description, options, timestamps } = userDetails;
    document.getElementById('firstname').textContent = firstname;
    document.getElementById('lastname').textContent = lastname;
    document.getElementById('address').textContent = address;
    document.getElementById('email').textContent = email;
    document.getElementById('phone').textContent = phone;
    document.getElementById('date').textContent = date;
    document.getElementById('description').textContent = description;
    document.getElementById('service').textContent = options;

    const dateTime = document.getElementById("timestamps");
    const currentDate = new Date();
    dateTime.textContent = currentDate.toLocaleString();

   
    
}

displayUserDetails(); // Call the function to display user details when the page loads
