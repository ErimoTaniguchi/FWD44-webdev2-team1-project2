// Data / State
let currentIndex = 1;
const totalSlides = 2;
let touchStartX = 0;
let touchEndX = 0;

// DOM Elements
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
const currentDisplay = document.querySelector('.slider-navigation__current');
const sliderContainer = document.querySelector('.grid-container');

// Functions / Logic
function getScrollAmount(){
    const item = sliderContainer.querySelector('.grid-container-item');
    const gap = parseInt(getComputedStyle(sliderContainer).gap) ;
    return item.offsetWidth + gap;
};

function updateSlides(){
    currentDisplay.textContent = currentIndex;
    sliderPrev.disabled = (currentIndex === 1);
    sliderNext.disabled = (currentIndex === totalSlides);

    sliderContainer.scrollTo({
        left: (currentIndex - 1) * getScrollAmount(),
        behavior: 'smooth'
    });
};

function handleSwipe(){
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 50) {
        if (diff > 50) {
            currentIndex = Math.max(1, currentIndex - 1);
        } else if (diff < -50) {
            currentIndex = Math.min(totalSlides, currentIndex + 1);
        }
        updateSlides();
    } else {
        updateSlides();
    }
};


// Event Listeners
sliderPrev.addEventListener('click',()=>{
    if (currentIndex > 1) {
        currentIndex --;
        updateSlides();
    }
});

sliderNext.addEventListener('click',()=>{
    if (currentIndex < totalSlides) {
        currentIndex ++;
        updateSlides();
    }
});

sliderContainer.addEventListener('touchstart', (e)=>{
    touchStartX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchend', (e)=>{
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});



