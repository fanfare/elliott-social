const filterButtons = document.querySelectorAll('.filter');
const people = document.querySelectorAll('.person');

// this could be maybe obfuscated with https://obfuscator.io if you'd like
var egg = []
var eggon = false
var boxon = false
function easter(e) {
  try {
    var index = Array.from(e.parentNode.children).indexOf(e)
    egg.push(index)
    egg = egg.slice(-6)
    var eastereggs = egg.join("").toString()
    if (eastereggs === "010201") {
      if (eggon) {
        return
      }
      eggon = true
      document.querySelectorAll("nav a.box.small")[0].href = "#"
      document.querySelectorAll("nav a.box.small")[0].style.backgroundColor="green"
      document.querySelectorAll("nav a.box.small")[0].addEventListener("click", () => {
        if (boxon) {
          return
        }
        boxon = true
        filterButtons.forEach((filter) => {
          filter.style.cssText = "border: none"
        })
        people.forEach((person) => {
          person.style.display = "inline-block"
        })
        var head = document.getElementsByTagName('head')[0]
        var js = document.createElement("script")
        head.appendChild(js)
        js.onload = () => {
          window.phase()
        }
        js.src = "/js/crayon.min.js"
      })
    }
  }
  catch(e) {
  }
}

function filterShape(clickedElement) {
    easter(clickedElement)
    filterButtons.forEach((filter) => {
        filter.style.cssText = "border: 1px solid transparent"
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
document.querySelector('.island').addEventListener('click', function() {filterShape(this);})
