let slides = document.querySelectorAll('.slider__img');
let leftArrow = document.querySelector('.arrow__left');
let rightArrow = document.querySelector('.arrow__right');

leftArrow.addEventListener('click', ()=> {sliderFunction(true)})
rightArrow.addEventListener('click', ()=> {sliderFunction(false)})

sliderFunction()

function sliderFunction(param) {
    for (let i = 0; i < slides.length; i++) {
        let element = slides[i];
        let position = element.getAttribute('slider-position')
        if(param) {
            if(position == 0) {
                position = slides.length - 1
            } else {
                position--
            }
        } else {
            if(position == slides.length - 1) {
                position = 0
            } else {
                
                position++
            }
        }
        if(position == 0) {
            element.style.opacity = '1'
        } else {
            element.style.opacity = '0'
        }
        element.setAttribute('slider-position', position)
    }
}