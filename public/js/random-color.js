
const colorInput = document.querySelector(".color-input");

var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

colorInput.value = randomColor;
