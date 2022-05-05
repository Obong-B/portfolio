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
    const link = event.target.dataset.link;
    if(link == null){
        return;
    }
    scrollIntoView(link)
});

// Handle click on "contact me" Button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener('click', (event) => {
    scrollIntoView('#contact');
});

//Make hoem slowly fade to transparent as the window scroll down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    home.style.opacity = 1- window.scrollY / homeHeight;
});

// Show "Arrow up" Button when scrolling down
const arrowUp = document.querySelector('.arrow__up');
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    }
    else{
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click', () => {
    scrollIntoView("#home");
});



function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}