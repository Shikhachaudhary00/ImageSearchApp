var icon = document.getElementById("icon");
icon.onclick = function () {
    document.body.classList.toggle("dark-theme");
    icon.src = document.body.classList.contains("dark-theme") ? "moon.png" : "user-interface.png";
};

// Navbar hide/show on scroll
let lastScrollTop = 0;
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        navbar.style.top = "-100px";
    } else {
        navbar.style.top = "0";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Unsplash API Access Key
const acesskey = '9FiFG_tw84Xs-CsnZxTdixrgnVpCzB4fBPkAnHGrldc';
let page = 1;
let searchQuery = '';  // Store the current search query

// Fetch images from Unsplash
const fetchImages = async (query, pageNo) => {
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=30&page=${pageNo}&client_id=${acesskey}`;
    const response = await fetch(url);
    const data = await response.json();

    // Check if there are results
    if (data.results.length > 0) {
        data.results.forEach(photo => {
            const imageElement = document.createElement('div');
            imageElement.classList.add('imgDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" />`;

            // Creating overlay
            const overlyElement = document.createElement('div');
            overlyElement.classList.add('overlay');
            
            // Create overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;
            overlyElement.appendChild(overlayText);
            imageElement.appendChild(overlyElement);
            imagesConatianer.appendChild(imageElement);
        });
    } else {
        // If no more images are found, show a message only if it's the first page
        if (pageNo === 1) {
            imagesConatianer.innerHTML = `<h2>No Images to Show</h2>`;
        } else {
            // Do not reset images, just inform user that no more images are available
            alert("No more images available.");
        }
    }
};

// Search form functionality
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search_input');
const imagesConatianer = document.querySelector('.img-container');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();

    if (inputText !== '') {
        searchQuery = inputText;  // Store the search query
        page = 1;  // Reset the page number
        imagesConatianer.innerHTML = '';  // Clear previous results
        fetchImages(searchQuery, page);  // Fetch the first page of images
        searchInput.value = '';  // Clear the search input
    } else {
        imagesConatianer.innerHTML = `<h2>Please enter a search query.</h2>`;
    }
});

// Load more functionality
const loadButton = document.querySelector('.load');
loadButton.addEventListener('click', () => {
    if (searchQuery !== '') {
        page++;  // Increment the page number
        fetchImages(searchQuery, page);  // Fetch the next page of images
    }
});
