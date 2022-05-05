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
const navbarMenuItems = document.querySelectorAll(".navbar__menu__item");

navbarMenu.addEventListener('click', (event) => {
    const link = event.target.dataset.link;
    if(link == null){
        return;
    }

    scrollIntoView(link);

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

// project filltering and animation
const workBtnContaier = document.querySelector('.work__categories');
const projectContaier = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContaier.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    //Remove selection from the previous item and select the new one 
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');
    
    projectContaier.classList.add('anim-out');

    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }
            else{
                project.classList.add('invisible');
            }
        })
        projectContaier.classList.remove('anim-out');
    }, 300);
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}