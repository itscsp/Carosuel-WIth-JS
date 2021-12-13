// getting need elements
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);//to list all data into the array
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav')
const dots = Array.from(dotsNav.children);

//getting width of particuler slide
const slideWidth =  slides[0].getBoundingClientRect().width;
console.log(slideWidth)

//arronge the slides next to one and another
/*
 we can do like this dynamically also

slides[0].style.left = slideWidth* 0 + 'px';
slides[1].style.left = slideWidth * 1 + 'px';
slides[2].style.left = slideWidth*2 + 'px';
*/

// slides.forEach((slide,index) => {
//     slide.style.left = slideWidth * index + 'px';
// });

// we con do same thing in function also

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition);

//function make slide happened
const moveToSLide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' +  targetSlide.style.left + ')';

    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }else if(targetIndex === slides.length - 1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//when i click Left button, slide move to the left button
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;

    const currentDot = dotsNav.querySelector('.current-slide');
    const PrevDot = currentDot.previousElementSibling;

    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    updateDots(currentDot, PrevDot)

    moveToSLide(track, currentSlide, prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex)
})

//when i click RIght button, slide move to the Right Button
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    updateDots(currentDot, nextDot)
    moveToSLide(track, currentSlide, nextSlide)

    hideShowArrows(slides, prevButton, nextButton, nextIndex)

})

// When i click the nav indicater, move to respective side
dotsNav.addEventListener('click', e => {
    //what indicater was we clicked on
    const targetDot = e.target.closest('button');
    // var findParent = e.target.parentNode.parentNode.nextElementSibling;

    // console.log(findParent)

    if(!targetDot) return;//exit from function if he clicked other then button

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);

    const targetSlide = slides[targetIndex];
    updateDots(currentDot, targetDot)
    moveToSLide(track, currentSlide, targetSlide);

    hideShowArrows(slides, prevButton, nextButton, targetIndex)

})