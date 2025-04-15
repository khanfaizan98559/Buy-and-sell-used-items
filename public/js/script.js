//navbar links

let navbarLinks = document.querySelectorAll("nav-link-item:not(.navbar-sellBtn)");
let activeNavbarLink = document.querySelector("a.nav-link-item.active");

for(let navbarLink of navbarLinks) {
    navbarLink.addEventListener("click",()=>{
        activeNavbarLink.classList.remove("remove");
        navbarLink.classList.add("active");
        activeNavbarLink=navbarLink;
    })
}

//searchbar suggestions
let searchInput = document.querySelector("#searchInput");
let searchSuggestionsPopup = document.querySelector(".search-suggestions-popup");
let searchForm = document.querySelector("#searchForm"); // Assuming the search input is inside a form with this ID
console.log(searchInput)
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim(); // Get the input value
    if (query.length > 0) {
        fetch(`/search?q=${encodeURIComponent(query)}`) // Pass the query as a parameter
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch search suggestions");
                }
                return response.json();
            })
            .then(data => {
                const searchSuggestionsList = document.querySelector(".search-suggestions-list");
                searchSuggestionsList.innerHTML = ""; // Clear previous suggestions
                if (data.length === 0) {
                    const noResultsItem = document.createElement("li");
                    noResultsItem.textContent = "No results found";
                    noResultsItem.classList.add("no-results");
                    searchSuggestionsList.appendChild(noResultsItem);
                } else {
                    data.forEach(suggestion => {
                        const suggestionItem = document.createElement("li");
                        const suggestionLink = document.createElement("a");
                        suggestionItem.appendChild(suggestionLink)
                        suggestionLink.href = `/product/${suggestion._id}`;
                        suggestionLink.textContent = suggestion.details.title;
                        suggestionItem.classList.add("suggestion-item");
                        suggestionItem.addEventListener("click", () => {
                            searchInput.value = suggestion; // Set the clicked suggestion as input value
                            searchSuggestionsList.innerHTML = ""; // Clear suggestions
                            searchForm.submit(); // Submit the form
                        });
                        searchSuggestionsList.appendChild(suggestionItem);
                    });
                }
            })
            .catch(error => {
                console.error("Error fetching search suggestions:", error);
            });
    } else {
        const searchSuggestionsList = document.querySelector(".search-suggestions-list");
        searchSuggestionsList.innerHTML = ""; // Clear suggestions if input is empty
    }
});

// Submit the form when the user presses "Enter"
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior
        searchForm.submit(); // Submit the form
    }
});

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

