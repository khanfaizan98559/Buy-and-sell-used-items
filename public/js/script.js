//navbar links

let navbarLinks = document.querySelectorAll("nav-link-item:not(.navbar-sellBtn)");
let activeNavbarLink = document.querySelector("a.nav-link-item.active");

for(let navbarLink of navbarLinks) {
    navbarLink.addEventListener("click", function() {
        if(activeNavbarLink) {
            activeNavbarLink.classList.remove("active");
        }
        navbarLink.classList.add("active");
        activeNavbarLink = navbarLink;
    });
}

//searchbar suggestions
let searchInput = document.querySelector("#searchInput");
let searchSuggestionsPopup = document.querySelector(".search-suggestions-popup");

searchInput.addEventListener("input",()=>{
    if(searchInput.value.trim().length > 0) {
        searchSuggestionsPopup.classList.add("active");
    } else {
        searchSuggestionsPopup.classList.remove("active");
    }
})

searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim().length > 0) {
      searchSuggestionsPopup.classList.add("active");
    }
});

//login and signup popup

let loginBtns = document.getElementsByClassName("loginBtn");
let signupBtns = document.getElementsByClassName("signupBtn");
let loginPopup = document.querySelector(".login-popup");
let signupPopup = document.querySelector(".signup-popup");

for(let loginBtn of loginBtns) {
    loginBtn.addEventListener("click", function() {
        signupPopup = document.querySelector(".signup-popup");
        if(signupPopup.classList.contains("active")) {
            signupPopup.classList.remove("active");
        }
        loginPopup.classList.toggle("active");
        loginBtns = document.getElementsByClassName("loginBtn");
        signupBtns = document.getElementsByClassName("signupBtn");
    });
}

for(let signupBtn of signupBtns) {
    signupBtn.addEventListener("click", function() {
        loginPopup = document.querySelector(".login-popup");
        if(loginPopup.classList.contains("active") ) {
            loginPopup.classList.remove("active");
        }
        signupPopup.classList.toggle("active");
        loginBtns = document.getElementsByClassName("loginBtn");
        signupBtns = document.getElementsByClassName("signupBtn");
    });
}

document.addEventListener("click", function (event) {
    const loginPopup = document.querySelector(".login-popup");
    const signupPopup = document.querySelector(".signup-popup");

    if (loginPopup.classList.contains("active") && !loginPopup.contains(event.target) && !event.target.classList.contains("loginBtn")) {
        loginPopup.classList.remove("active");
    }

    if (signupPopup.classList.contains("active") && !signupPopup.contains(event.target) && !event.target.classList.contains("signupBtn")) {
        signupPopup.classList.remove("active");
    }

    if (
      !searchSuggestionsPopup.contains(event.target) &&
      event.target !== searchInput
    ) {
      searchSuggestionsPopup.classList.remove("active");
    }

});

//scrollable content
const scrollerLeft = document.querySelectorAll(".scroller-left");
const scrollerRight = document.querySelectorAll(".scroller-right");
const scrollableContent = document.querySelectorAll(".scrollable-content");
console.dir(scrollableContent)

// Scroll left
for(let scroller of scrollerLeft) {
    scroller.addEventListener("click", () => {
        let el = scroller.nextElementSibling;
        el.scrollBy({
            left: -200, // Adjust scroll distance
            behavior: "smooth",
        });
    });
}

// Scroll right
for(let scroller of scrollerRight) {
    scroller.addEventListener("click", () => {
        let el = scroller.previousElementSibling;
        el.scrollBy({
        left: 200, // Adjust scroll distance
        behavior: "smooth",
    });
    });
}

// Disable scrollers when at the edges
for(let el of scrollableContent) {

    el.addEventListener("scroll", () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
        console.log(maxScrollLeft)
      if (el.previousElementSibling && el.scrollLeft <= 0) {
        console.dir(el.previousElementSibling.classList);
        el.previousElementSibling.classList.add("disabled");
      } else if (el.previousElementSibling) {
        el.previousElementSibling.classList.remove("disabled");
      }
    
      if (el.nextElementSibling && el.scrollLeft >= maxScrollLeft) {
        console.dir(el.nextElementSibling);
        el.nextElementSibling.classList.add("disabled");
      } else if (el.nextElementSibling) {
        el.nextElementSibling.classList.remove("disabled");
      }
    });
    
    el.dispatchEvent(new Event("scroll"));
}

