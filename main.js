'user strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the nabvar menu
const navbarMenu = document.querySelector(".navbar__memu");
const navbarMenuItems = document.querySelectorAll(".navbar__menu__item");

navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = event.target.dataset.link;
    if (link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItme(target);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");

navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');

});


// Handle click on "contact me" Button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener('click', (event) => {
    scrollIntoView('#contact');
});

//Make hoem slowly fade to transparent as the window scroll down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "Arrow up" Button when scrolling down
const arrowUp = document.querySelector('.arrow__up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
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
    if (filter == null) {
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
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        })
        projectContaier.classList.remove('anim-out');
    }, 300);
});


// 1. ?????? ?????? ???????????? ?????????????????? ????????? ??????.
// 2. IntersectionObserver??? ???????????? ?????? ???????????? ????????????.
// 3. ???????????? ????????? ???????????? ?????? ???????????? ????????? ?????????.

const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];

const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link = "${id}"]`));

let selectedNavIndex = 0;
let seletedNavItem = navItems[0];

function selectNavItme(selected) {
    seletedNavItem.classList.remove('active');
    seletedNavItem = selected;
    seletedNavItem.classList.add('active');
}


function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({
        behavior: "smooth"
    });
    selectNavItme(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }

        }
    })
}
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', () => {
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItme(navItems[selectedNavIndex]);
});