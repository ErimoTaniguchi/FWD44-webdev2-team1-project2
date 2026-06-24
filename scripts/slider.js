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

function updateSlides(){
    currentDisplay.textContent = currentIndex;
    sliderPrev.disabled = (currentIndex === 1);
    sliderNext.disabled = (currentIndex === totalSlides);
};

function handleSwipe(){
    const diff = touchEndX - touchStartX;
    if (diff > 50) {
        if (currentIndex > 1){
            currentIndex --;
        }
    }else if(diff < -50){
        if (currentIndex < totalSlides){
            currentIndex ++;
        }
    }
    updateSlides();
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



