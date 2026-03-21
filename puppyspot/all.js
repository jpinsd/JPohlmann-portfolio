const breakpoint = 600;

/* get external templates and set up listeners */
const navMenu = "_nav.html";
const navMenuElement = document.getElementById('main-nav');
const footerMenu = "_footer.html";
const footerElement = document.getElementById('footer');

const setUpListeners = () => {
    const navContainer = document.querySelectorAll('.submenus')[0];
    const navMenuItems = document.querySelectorAll('.submenu-wrapper')[0];
    
    navContainer.addEventListener("mouseover", () => {
        navMenuItems.classList.add("active");
    });
    
    navMenuItems.addEventListener("mouseout", () => {
        navMenuItems.classList.remove("active");
    });
    
    document.querySelectorAll(".parallax-wrapped")[0].addEventListener("mousedown", () => {
        if(navMenuItems.classList.contains("active")) {
            navMenuItems.classList.remove("active");
        };
    });
}

const myAjax = (file, element, listeners = false) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) { 
            console.warn(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { 
            element.outerHTML = xhr.response;
            
            if(listeners) {
                listeners();
            }
        }
    }
    xhr.onerror = function() {
        console.warn("Request failed");
    };
}

const getFiles = () => {
    myAjax(navMenu, navMenuElement, setUpListeners);
    myAjax(footerMenu, footerElement);
}


/* change callout tabs when in/out of viewport view */

const allCalloutLabels = document.querySelectorAll("label.accordion-control");
const sections = document.querySelectorAll('div.accordion-content');
const scrollElement = document.querySelector("body");
const config = {
    root: null,
    threshold: .5
}

const changeSection = (item) => {
    allCalloutLabels.forEach(label => {
       label.classList.remove("active");
       
       if(label.getAttribute("for") === item) {
           label.classList.add("active");
       }
    });
}

const intersectionHandler = (entry) => {
    let num = entry.target.dataset.for;
//     console.log("i am active", num);
    changeSection(num);
}

sections.forEach(section => {
    try {
        let observer = new IntersectionObserver(function (entries, self) {
            entries.forEach(entry => {
//         console.log(entry);
                if (entry.isIntersecting) {
                    intersectionHandler(entry); 
                }    
            });
        }, config);
        observer.observe(section);  
    } catch (error) {
        console.log(error);
    }
});


/* scroll into view */

const scroller = (element) => {
    if(window.innerWidth >= breakpoint) {    
        try {
            element.scrollIntoView({
                behavior: "smooth"
            });
        } catch (error) {
//             console.log ("no scrolling");
        }      
    } 
}

const scrollButtonListener = () => {
    allCalloutLabels.forEach(label => {
       const forTarget = label.getAttribute("for");
       const target = document.getElementById(forTarget);
       
       label.addEventListener("mouseup", () => {
           scroller(target);
           changeSection(forTarget);
       });       
    });

}

/* do the stuff */
getFiles();
scrollButtonListener();


