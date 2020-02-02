const filterButtons = document.querySelectorAll('.filter');
const people = document.querySelectorAll('.person');

function filterShape(clickedElement) {
    filterButtons.forEach((filter) => {
        filter.style.cssText = "border: 1px solid #c5c5c5;"
    })
    clickedElement.style.cssText = "border: 1px solid #000;"
    var shape = clickedElement.className.replace('filter ', '').toString();
    people.forEach((person) => {
        if (person.classList.contains('shape-' + shape)) {
            person.style.display = "inline-block";
        } else {
            person.style.display = "none";
        }
    })

}

document.querySelector('.flower').addEventListener('click', function() {filterShape(this);})
document.querySelector('.heart').addEventListener('click', function() {filterShape(this);})
document.querySelector('.leaf').addEventListener('click', function() {filterShape(this);})
document.querySelector('.mushroom').addEventListener('click', function() {filterShape(this);})
document.querySelector('.pebble').addEventListener('click', function() {filterShape(this);})
document.querySelector('.star').addEventListener('click', function() {filterShape(this);})
