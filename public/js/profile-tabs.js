const editTabButton = document.querySelector('#edit-tab');
const favoritesTabButton = document.querySelector('#favorites-tab');
const previewTabButton = document.querySelector('#preview-tab');
const favoritesTabContent = document.querySelector('#favorites-tab-content');
const editTabContent = document.querySelector('#edit-tab-content');
const previewTabContent = document.querySelector('#preview-tab-content');


console.log(previewTabContent);

editTabButton.addEventListener('click', function() {
    console.log('clicked');
    editTabContent.style.cssText = "display: block;";
    previewTabContent.style.cssText = "display: none;";
    favoritesTabContent.style.cssText = "display: none;";
    this.classList.add("current-tab");
    previewTabButton.classList.remove("current-tab");
    favoritesTabButton.classList.remove("current-tab");
})

favoritesTabButton.addEventListener('click', function() {
    console.log('clicked');
    favoritesTabContent.style.cssText = "display: block;";
    previewTabContent.style.cssText = "display: none;";
    editTabContent.style.cssText = "display: none;";
    this.classList.add("current-tab");
    previewTabButton.classList.remove("current-tab");
    editTabButton.classList.remove("current-tab");
})

previewTabButton.addEventListener('click', function() {
    console.log('clicked');
    editTabContent.style.cssText = "display: none;";
    favoritesTabContent.style.cssText = "display: none;";
    previewTabContent.style.cssText = "display: block;";
    this.classList.add("current-tab");
    editTabButton.classList.remove("current-tab");
    favoritesTabButton.classList.remove("current-tab");
})