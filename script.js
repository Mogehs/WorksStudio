let loading = () => {
  var tl = gsap.timeline();

  tl.to("#yellow1", {
    top: "-100%",
    delay: 0.4,
    duration: 0.2,
    ease: "expo.out",
  });

  tl.from("#black2", {
    top: "100%",
    delay: 0.5,
    duration: 0.2,
    ease: "expo.out",
  });
  tl.from("#yellow2 ", {
    top: "100%",
    delay: 0,
    duration: 0.7,
    ease: "expo.out",
  });
  tl.to("#loader1", {
    opacity: "0",
  });
  tl.to("#loader1", {
    display: "none",
  });
  tl.to("#yellow2", {
    display: "none",
  });
  tl.to("#yellow2", {
    opacity: "0",
  });
};
loading();

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
let rotated = true;
const materialLinks = document.querySelectorAll(".materials .links a");
const cross = document.querySelector(".nav .materials .cross");
const mediaQuery = window.matchMedia("(max-width: 600px)");
const menue = document.querySelector(".nav .menu");

materialLinks.forEach((link, index) => {
  if (index == 0) {
    link.style.position = "abosulute";
    link.style.right = "26.7%";
  } else if (index == 1) {
    link.style.position = "abosulute";
    link.style.right = "16.5%";
  } else {
    link.style.position = "abosulute";
    link.style.right = "8%";
  }
});

const bigScreen = () => {
  cross.addEventListener("click", () => {
    if (rotated) {
      cross.style.transform = "rotate(135deg)";
      cross.style.transition = "all ease-in-out 0.9s";
      materialLinks.forEach((link, index) => {
        if (index == 0) {
          link.style.position = "absolute";
          link.style.right = "11%";
          link.style.transition = "all 0.9s ease";
        } else if (index == 1) {
          link.style.position = "absolute";
          link.style.right = "14.5%";
          link.style.opacity = "0";
          link.style.transition = "all 0.9s ease,opacity 0.1s ease-in";
        } else {
          link.style.position = "absolute";
          link.style.right = "6%";
          link.style.opacity = "0";
          link.style.transition = "all 0.9s ease,opacity 0.1s ease-in";
        }
      });
      rotated = false;
    } else {
      cross.style.transition = "all ease-in-out 0.9s";
      cross.style.transform = "rotate(0deg)";
      materialLinks.forEach((link, index) => {
        if (index == 0) {
          link.style.position = "absolute";
          link.style.right = "26.7%";
          link.style.transition = "all 0.9s ease";
        } else if (index == 1) {
          link.style.position = "abosulute";
          link.style.right = "16.5%";
          link.style.opacity = "1";
          link.style.transition = "all 0.9s ease,opacity 0.2s ease-in";
        } else {
          link.style.position = "abosulute";
          link.style.right = "8%";
          link.style.opacity = "1";
          link.style.transition = "all 0.9s ease,opacity 0.2s ease-in";
        }
      });
      rotated = true;
    }
  });
};

const smallScreen = () => {
  cross.addEventListener("click", () => {
    menue.style.display = "inline";
    if (rotated) {
      cross.style.transform = "rotate(135deg)";
      cross.style.transition = "all ease-in-out 0.9s";
      menue.style.left = "64%";
      cross.style.zIndex = "7";
      rotated = false;
    } else {
      cross.style.transform = "rotate(0deg)";
      cross.style.transition = "all ease-in-out 0.9s";
      menue.style.left = "150%";
      rotated = true;
      menue.style.display = "none";
    }
  });
};

mediaQuery.addEventListener("change", handleMediaQueryChange);

function handleMediaQueryChange(event) {
  if (event.matches) {
    smallScreen();
  } else {
    bigScreen();
  }
}
handleMediaQueryChange(mediaQuery);

const targetSection1 = document.getElementById("page2");
const nav = document.querySelector(".nav");
let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        nav.style.filter = "invert(100%)";
      } else {
        nav.style.filter = "invert(0%)";
      }
    });
  },
  {
    root: null,
    rootMargin: "0px 0px -100% 0px",
    threshold: 0,
  }
);

const lowerarrow = document.querySelector(".back-top");
lowerarrow.addEventListener("click", () => {
  scroll.scrollTo("top");
});

const targetSection = document.getElementById("page2");
const upperarrow = document.querySelector("#page1 .down-to img");
upperarrow.addEventListener("click", () => {
  scroll.scrollTo(targetSection);
});

const targetSection2 = document.getElementById("page3");
const upperarrow2 = document.querySelector("#page2 .down-to img");
upperarrow2.addEventListener("click", () => {
  scroll.scrollTo(targetSection2);
});

observer.observe(targetSection1);

let autoChange;
let elementIndex = 0;

let elems = document.querySelectorAll(".elem");
let page2 = document.querySelector("#page2");

let showMovingElement = (index) => {
  elems.forEach((ele, i) => {
    const movingElement = ele.querySelector(".moving");
    if (i === index) {
      movingElement.style.transform = "scaleY(1)";
      let bgimg = ele.getAttribute("data-image");
      page2.style.backgroundImage = `url(${bgimg})`;
      ele.style.color = "black";
      ele.style.fontStyle = "italic";
    } else {
      movingElement.style.transform = "scaleY(0)";
      ele.style.color = "white";
      ele.style.fontStyle = "normal";
    }
  });
};

let startAutoChange = () => {
  autoChange = setInterval(() => {
    showMovingElement(elementIndex);
    elementIndex = (elementIndex + 1) % elems.length;
  }, 1500);
};

elems.forEach((ele, index) => {
  ele.addEventListener("mouseenter", () => {
    clearInterval(autoChange);
    showMovingElement(index);
  });

  ele.addEventListener("mouseleave", () => {
    startAutoChange();
  });
});

window.onload = startAutoChange();
