let index = 0;
const slideWrappers = document.querySelectorAll('.swiper-slide-wrapper');
const totalSlides = slideWrappers.length;

function goToSlide(slideIndex) {
    slideWrappers.forEach((wrapper, i) => {
        if (i === slideIndex) {
            wrapper.classList.add('active');
            wrapper.classList.remove('previous', 'next');
            wrapper.style.transform = `translateY(0%) scale(1)`; // Active card in the center
        } else if (i === (slideIndex - 1 + totalSlides) % totalSlides) {
            wrapper.classList.add('previous');
            wrapper.classList.remove('active', 'next');
            wrapper.style.transform = `translateY(-100%) scale(0.8)`;
        } else if (i === (slideIndex + 1) % totalSlides) {
            wrapper.classList.add('next');
            wrapper.classList.remove('active', 'previous');
            wrapper.style.transform = `translateY(100%) scale(0.8)`; 
        } else {
            wrapper.classList.remove('active', 'previous', 'next');
            wrapper.style.transform = `translateY(0%) scale(0.8)`; 
        }
    });

    index = slideIndex;
}

// Mouse Wheel Scroll
let isScrolling = false;

document.querySelector('.swiper-container').addEventListener('wheel', (event) => {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
        // Scroll down: show the next slide
        swipeDown();
    } else {
        // Scroll up: show the previous slide
        swipeUp();
    }

    setTimeout(() => {
        isScrolling = false;
    }, 800); // Prevent multiple fast scrolls
});

// Swipe Up (previous slide)
function swipeUp() {
    const prevIndex = (index - 1 + totalSlides) % totalSlides;
    goToSlide(prevIndex);
}

// Swipe Down (next slide)
function swipeDown() {
    const nextIndex = (index + 1) % totalSlides;
    goToSlide(nextIndex);
}

// Show the first slide initially
goToSlide(index);

