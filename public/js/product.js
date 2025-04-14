let mainImage = document.querySelector('.main-image img');
let thumbnails = document.querySelectorAll('.sidebar-thumbnails img');
console.log(mainImage.src);
for(let thumbnail of thumbnails) {
    thumbnail.addEventListener('click', function() {
        mainImage.src = this.src;
        mainImage.alt = this.alt;
    });
}