

export const responsiveNavbar = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const menuList = document.querySelector('ul')
    menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('hide-mobile-menu');
});
}
