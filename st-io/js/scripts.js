const breakpoint = 750;
const body = document.body;
let wHeight = window.innerHeight;
let wWidth = window.innerWidth;
let isMobile = (wHeight <= breakpoint || wWidth <= breakpoint) ? true : false;
// let isMobile = wHeight <= breakpoint ? true : false;
// let isMobile = (wHeight <= breakpoint || window.matchMedia("(orientation: landscape)")) ? true : false;

let carouselTimer;
const carousel = document.querySelectorAll(".carousel li");
const counters = document.querySelectorAll(".counters span");
const platformMatters = document.getElementById("platformMatters");
let carouselIdx = carousel.length - 1;

const splash = document.getElementById("splash");
const siteHeader = document.querySelector(".siteHeader h2");
const gablePlate = document.getElementById("gableplate");
const infographicImg = document.getElementById("infographic");
const infographic = splash.querySelector(".infographic");
const infographicWrapper = splash.querySelector(".infographic-wrapper");
const infoCards = document.querySelectorAll(".infoCards");

let infoRect, leftEnd, leftStart, movePct, opacityPct, scalePct;
let backgroundAmt = 55, background_l = 45, backgroundPct;

const cards = document.querySelector( ".cards" );
const cardList = document.querySelectorAll( ".card" );
const cardDetails = document.querySelectorAll( ".details" );
let scaleTimer;

const thumbnailList = document.querySelectorAll(".thumbnail");
const unifiedCards = document.querySelector(".unifiedCards");

// const popup = document.getElementById( "popup" );

const closeButtons = document.querySelectorAll(".closeButton");

const arrowLeft = document.getElementById( "arrowLeft" );
const arrowRight = document.getElementById( "arrowRight" );

const infoLeft = document.getElementById( "infoLeft" );
const infoRight = document.getElementById( "infoRight" );

const observed = document.querySelectorAll(".-observed");

const hero = document.getElementById("hero");



/*

 _______ _______  ______  _____  _     _ _______ _______
 |       |_____| |_____/ |     | |     | |______ |______ |
 |_____  |     | |    \_ |_____| |_____| ______| |______ |_____

*/

function carouselInterval() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(doCarousel, 8000);
}

function doCarousel() {
  if(carouselIdx !== (carousel.length - 1)) {
    carousel[carouselIdx].classList.remove("-current");
    carousel[carouselIdx].classList.add("-completed");
    carousel[carouselIdx + 1].classList.add("-current");

    counters[carouselIdx].classList.remove("-current");
    counters[carouselIdx + 1].classList.add("-current");

    carouselIdx++;
  } else {
    for(let i = 0; i < carousel.length; i++) {
      carousel[i].classList.remove("-current", "-completed");
      counters[i].classList.remove("-current");
    }
    carousel[0].classList.add("-current");
    counters[0].classList.add("-current");

    carouselIdx = 0;
  }
}

function startCarousel() {
  doCarousel();

  //add data-idx
  for(let i = 0; i < carousel.length; i++) {
    counters[i].dataset.idx = i;
  }

  //pause
  platformMatters.addEventListener("mouseenter", function(event) {
    clearInterval(carouselTimer);
    counters.forEach(counter => {
      counter.dataset.animating = "paused";
    })
  });

  //resume
  platformMatters.addEventListener ("mouseleave", function(event) {
    carouselInterval();
    counters.forEach(counter => {
      counter.dataset.animating = "running";
    })
  })

  //advance
  counters.forEach(counter => {
    counter.addEventListener("click", function(event){
      clearInterval(carouselTimer);
      const $this = this;
      const goto = parseInt(counter.dataset.idx);

      carousel.forEach((item,idx) => {

        if(idx < goto) {
          carousel[idx].classList.remove("-current");
          carousel[idx].classList.add("-completed");
          counters[idx].classList.remove("-current");
        } else if(idx > goto) {
          carousel[idx].classList.remove("-current", "-completed");
          counters[idx].classList.remove("-current");
        } else {
          carousel[idx].classList.add("-current");
          counters[idx].classList.add("-current");
        }
      })

      carouselInterval();
    })
  })

  carouselInterval();
}


/*
 _    _ _____ ______  _______  _____
  \  /    |   |     \ |______ |     |
   \/   __|__ |_____/ |______ |_____|

*/

function videoBox() {
  const videoButton = document.querySelectorAll(".videoOpener");
  const video = document.getElementById("videoBox");
  const closeButton = video.querySelector(".closeButton");

  closeButton.addEventListener("click", function(el){
    video.close();
  })

  video.addEventListener("click", function(el){
    if(el.target === video) {
      video.close();
    }
  })

  videoButton.forEach(button => {
    button.addEventListener("click", function() {
      video.showModal();
    }, true)
  })

}


/*
 _____ __   _ _______  _____  _______ _______  ______ ______  _______
   |   | \  | |______ |     | |       |_____| |_____/ |     \ |______
 __|__ |  \_| |       |_____| |_____  |     | |    \_ |_____/ ______|


*/

function infoCardSetup() {
  infoCards.forEach(card => {
    card.classList.remove("-current", "-next", "-offscreen");
  })

  infoCards.forEach( (card, idx) => {
    if(idx === 0) {
      card.classList.add("-current")
    } else if (idx === 1) {
      card.classList.add("-next")
    } else {
      card.classList.add("-offscreen")
    }
  })

  infoLeft.classList.add( "-disabled" )
}

function moveRight() {
  const count = infoCards.length;
  let current;

  infoCards.forEach((card, idx) => {
    if(card.classList.contains("-current")) {
      current = idx;
    }
  })

  if(current === (count - 1)) {
      infoCardSetup();
  } else {
    infoCards.forEach((card, idx) => {
      if(idx < current) {
        //do nothing for now
      } else if (idx === current) {
        card.classList.remove("-current");
        card.classList.add("-done");
        infoLeft.classList.remove( "-disabled" );

        if(infoCards[idx + 1]) {
          infoCards[idx + 1].classList.remove("-next");
          infoCards[idx + 1].classList.add("-current");
          if(current === (count - 2)) {
            infoRight.classList.add("-disabled");
          }
        }
        if(infoCards[idx + 2]) {
          infoCards[idx + 2].classList.remove("-offscreen");
          infoCards[idx + 2].classList.add("-next");
        }
      }
    })
  }
}

function moveLeft() {
  const count = infoCards.length;
  let current;

  infoCards.forEach((card, idx) => {
    if(card.classList.contains("-current")) {
      current = idx;
    }
  })

  if(current === 0) {
      infoCardSetup();
  } else {
    if(current === 1) {
      infoLeft.classList.add("-disabled");
    }

    infoCards.forEach((card, idx) => {
      if(idx === (current - 1)) {
        card.classList.remove("-done");
        card.classList.add("-current");
      } else if (idx === current) {
        card.classList.remove("-current");
        card.classList.add("-next");
      } else if (idx > current) {
        card.classList.remove("-next");
        card.classList.add("-offscreen");
      }
    })

    infoRight.classList.remove("-disabled");
  }
}

const slideInfoCards = ( el ) => {
  if ( !el.classList.contains( "-disabled" ) ) {
    if ( el.id === "infoRight" ) {
      moveRight();
    } else {
      moveLeft();
    }
  }
}

function infoArrows() {
  infoLeft.addEventListener( "click", function ( el ) { slideInfoCards( this ) } );
  infoRight.addEventListener( "click", function ( el ) { slideInfoCards( this ) } );
  infoCardSetup();
}




/*
 _______ _______  ______ ______  _______
 |       |_____| |_____/ |     \ |______
 |_____  |     | |    \_ |_____/ ______|

*/

const slideCards = ( el ) => {
  const cardWidth = cardList[0].getBoundingClientRect().width + 16;
  let slidenum = cards.dataset.slidenum;
  let translate;

  if(el.classList.contains("-disabled")) {
    return;
  }

  if(el.id === "arrowRight") {
    arrowLeft.classList.remove("-disabled");
    slidenum++;

    if(slidenum == "2") {
      arrowRight.classList.add("-disabled");
    }
  } else {
    if(slidenum == "1") {
      arrowLeft.classList.add("-disabled");
    }

    slidenum--;
    arrowRight.classList.remove("-disabled");
  }

  switch(slidenum) {
    case 0:
      translate = 0;
      break;

    case 1:
      translate = cardWidth * 2;
      break;

    case 2:
      translate = cardWidth * 3.25;
      break;

    default:
      translate = 0;
  }

  cards.dataset.slidenum = slidenum;
  cards.style.translate = "-" + translate + "px";
}

function cardArrows() {
  arrowLeft.addEventListener( "click", function ( el ) { slideCards( this ) } );
  arrowRight.addEventListener( "click", function ( el ) { slideCards( this ) } );
  cards.dataset.slidenum="0";
}

function showCardDialog() {
  cardList.forEach(card => {
    const detail = card.querySelector(".details");
    const closeButton = card.querySelector(".closeButton");

    closeButton.addEventListener("click", function(el){
      detail.close();
    })

    detail.addEventListener("click", function(el){
      if(el.target === detail) {
        detail.close();
      }
    })

    card.addEventListener("click", function(el) {
      detail.showModal();
    }, true)
  })
}

function unifiedCardList() {
  thumbnailList.forEach( thumb => {
    thumb.addEventListener("click", function(el) {
      const theText = this.querySelector(".text").innerHTML;
      thumbnailList.forEach(t => {
        t.classList.remove("-active");
      })
      this.classList.add("-active");
      unifiedCards.querySelector(".displayText").innerHTML = theText;
    });
  });
}

/*
  _____  ______  _______ _______  ______ _    _ _______  ______ _______
 |     | |_____] |______ |______ |_____/  \  /  |______ |_____/ |______
 |_____| |_____] ______| |______ |    \_   \/   |______ |    \_ ______|

*/

// console.log(observed);

function observerActions(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // intersectionHandler(entry);
      // console.log(entry.target);

      if(entry.target.dataset.fx == "sizeup") {
        entry.target.classList.add("-sized");
      // } else if(entry.target.dataset.fx == "slideup") {
      //   entry.target.classList.add("-slideup");
      }

    } else {
      if(entry.target.dataset.fx == "sizeup") {
        entry.target.classList.remove("-sized");
      // } else if(entry.target.dataset.fx == "slideup") {
      //   entry.target.classList.remove("-slideup");
      }

    }
  });


}

let observeCallback = (entries, self) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      intersectionHandler(entry);
    }
  });
}
const observeOptions = {
  root: null,
  rootMargin: '0px',
  threshold: .5
}

// const observer = new IntersectionObserver(observerActions, observeOptions)
const observer = new IntersectionObserver(observerActions,{rootMargin: "-30%"});


observed.forEach(object => {
  observer.observe(object);
})

/*
 _______ _______  ______  _____                _____ __   _  ______
 |______ |       |_____/ |     | |      |        |   | \  | |  ____
 ______| |_____  |    \_ |_____| |_____ |_____ __|__ |  \_| |_____|

*/



function getPercents() {

  backgroundPct = 55 / (wHeight * .5);
  infoRect = infographic.getBoundingClientRect();
  leftEnd = (wWidth * .5) - (infoRect.width * .5);
  leftStart = infoRect.x;
  animationAmount = (leftStart - leftEnd);

  movePct = smallNum(animationAmount / wHeight);
  opacityPct = 1 / animationAmount;
  scalePct = .15 / animationAmount;
}

function infoCardOpacity(opacityAmount) {
  infoCards.forEach( card => {
    card.style.opacity = opacityAmount;
  })
}

const scrollPositions = () => {

    const offset = window.pageYOffset;
    const infographicRect = parseInt(infoRect.bottom);
    const headerRect = parseInt(siteHeader.getBoundingClientRect().bottom);
    const moveAmount = (infographicRect - headerRect) * movePct;
    const opacityAmount = moveAmount * opacityPct;

    // document.querySelector(".siteHeader h1").removeAttribute("style");
    // document.querySelector(".siteHeader h2").removeAttribute("style");

  if(!isMobile) {
    if(headerRect < infographicRect) {
      splash.dataset.done="false";

      /* move left and opacity */
      if(moveAmount < animationAmount) {
        infographicWrapper.style.translate = (moveAmount * -1) + "px";
        infographicWrapper.style.scale = 1.4 + (moveAmount * scalePct);
        infographicImg.style.opacity = opacityAmount;
        gablePlate.style.opacity = 1 - opacityAmount;
        infoCardOpacity(opacityAmount);
      } else {
        splash.dataset.done="true";
        infographicImg.style.opacity = 1;
        gablePlate.style.opacity = 0;
        infoCardOpacity(1);
      }

      /* background color */
      if( headerRect > 0) {
        background_l = 100 - (headerRect * backgroundPct);
        if(background_l < 45) background_l = 45;
      }
      else if(headerRect < 0) {
        background_l = 100;
      }
      body.style.setProperty("--l", background_l + "%");

    } else {
      /* set everything to original values */
        splash.dataset.done="false";
        infographicImg.style.opacity = 0;
        gablePlate.style.opacity = 1;
        infoCardOpacity(0);
        body.style.setProperty("--l", "45%");
    }
  // } else {
    /* reset any possible half transitions */
    // body.style.setProperty("--l", "100%");
    // infographicImg.style.opacity = 0;
    // gablePlate.style.opacity = 0;
    // infoCardOpacity(1);
    // infographicWrapper.removeAttribute("style");
    // console.log(window.pageYOffset)

    // document.querySelector(".siteHeader h1").setAttribute("style", "animation-timeline:none");
    // document.querySelector(".siteHeader h2").setAttribute("style", "animation-timeline:none");
  }  // mobile

}



const scrollers = () => {
  getPercents();

  window.addEventListener('touchmove', () => {
    scrollPositions(); // make different, reduced for touch
    removePopup();
  })

  window.addEventListener('scroll', () => {
    scrollPositions();
    removePopup();
  })
}

const calcWidths = () => {
    wHeight = window.innerHeight;
    wWidth = window.innerWidth;
    isMobile = (wHeight <= breakpoint || wWidth <= breakpoint) ? true : false;
}

/* window resize listener */
const windowListener = () => {
  window.addEventListener('resize', () => {
    calcWidths();
    getPercents();
    scrollPositions();
  })
}

/*
 _____ __   _ _______  _____
   |   | \  | |______ |     |
 __|__ |  \_| |       |_____|

  _____   _____   _____  _     _  _____  _______
 |_____] |     | |_____] |     | |_____] |______
 |       |_____| |       |_____| |       ______|

*/

function removePopup() {
  if(document.getElementById("popup")) {
    document.getElementById("popup").remove();
  }
}

function infoPopups() {
  infoCards.forEach(card => {
    card.addEventListener("mouseenter", function(event) {
      const contents = this.querySelector(".about").innerHTML;
      const iconLocation = this.querySelector(".icon").getBoundingClientRect();
      const cardIcon = card.dataset.card;
      let locX, locY;

      const popup = document.createElement('div');
      popup.id="popup";
      popup.innerHTML = contents;

      if(splash.dataset.done === "true") {
        body.append(popup);
        let popupRect = popup.getBoundingClientRect();

        if(cardIcon === "retention" || cardIcon === "efficiency") {
          locX = iconLocation.right - 12;
          locY = iconLocation.top + (iconLocation.height / 2) - popupRect.height;
        } else if (cardIcon === "scaleability") {
          locX = iconLocation.right - (iconLocation.width / 2) - (popupRect.width / 2);
          locY = iconLocation.bottom - 12;
        } else if (cardIcon === "ecosystem") {
          locX = iconLocation.left + 12 - popupRect.width;
          locY = iconLocation.top + 12;
        } else if (cardIcon === "monetization") {
          locX = iconLocation.left + 12 - popupRect.width;
          locY = iconLocation.top + (iconLocation.height / 2) - popupRect.height;
        }

        popup.style.left = locX + "px";
        popup.style.top = locY + "px";

      }

      // const clickX = event.clientX + 12 + "px";
      // const clickY = event.clientY + 12 + "px";
      // popup.style.left=clickX;
      // popup.style.top=clickY;

    });
    card.addEventListener("mouseleave", function(event){
      removePopup();
    });
  })
}



/*
 _     _ _______ _____        _____ _______ _____ _______ _______
 |     |    |      |   |        |      |      |   |______ |______
 |_____|    |    __|__ |_____ __|__    |    __|__ |______ ______|

*/

function doYear() {
  const year = document.getElementById("year");
  year.innerHTML = new Date().getFullYear();
}

function smallNum(num) {
  return Math.trunc(num * 10000) / 10000;
}

function randomHero() {
  const num = Math.floor(Math.random() * 2) + 1;
  if(num === 1) {
    hero.dataset.var="b";
  } else {
    hero.dataset.var="a";
  }

}


/*
 _____ __   _ _____ _______
   |   | \  |   |      |
 __|__ |  \_| __|__    |

*/

function init() {
  scrollers();
  windowListener();
  infoPopups();
  infoArrows();

  cardArrows();
  unifiedCardList();
  showCardDialog();

  startCarousel()
  videoBox();
  doYear();

  randomHero();
}


init();
