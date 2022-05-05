'user strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight =navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the nabvar menu
const navbarMenu = document.querySelector(".navbar__memu");

navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = event.target.dataset.link;

    if(link == null){
        return;
    }
    console.log(link);
    const scrollTo = document.querySelector(link);
    console.log(scrollTo);
    scrollTo.scrollIntoView({behavior: "smooth"});
    

});