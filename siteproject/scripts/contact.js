import { responsiveNavbar } from "./navbar.js";
import { getCurrentYear } from "./navbar.js";

// Initialize responsiveNavbar 
responsiveNavbar()
document.querySelector("#year").textContent = getCurrentYear();