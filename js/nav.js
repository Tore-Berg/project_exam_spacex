//Navigation

const toggleNav = () => {
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
  
    menuBtn.addEventListener("click", () => {
      //Toggle navigation
  
      nav.classList.toggle("nav-active");
  
      //Animation for links
  
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 2 + 0.2}s`;
        }
      });
      //Burger animation
      menuBtn.classList.toggle("toggle");
    });
  };
  
  toggleNav();



const navBackground = document.querySelector(".nav-background");



function highlightNavigation() {
  const scrolledY = window.scrollY;
  

  if(scrolledY > 10) {
    navBackground.style.display ="block";
  }else {
    navBackground.style.display="none";
  }
}

highlightNavigation()

window.onscroll = highlightNavigation;