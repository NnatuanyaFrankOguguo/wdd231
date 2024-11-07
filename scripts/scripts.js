
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
}

function filterCourses(category) {
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
        if (category === 'all' || course.classList.contains(category)) {
            course.style.display = 'inline-block';
        } else {
            course.style.display = 'none';
        }
    });
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
    document.getElementById('dateTimeDisplay').textContent = getCurrentDateTime();
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to display the current date and time immediately
updateDateTime();

