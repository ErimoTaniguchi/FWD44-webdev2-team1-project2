// Data / State
let currentIndex = 1;
const totalSlides = 2;
let touchStartX = 0;
let touchEndX = 0;
let tempIndex = 1;

// DOM Elements

//featured collection carousel
const featured = {
    sliderPrev: document.getElementById('slider-prev'),
    sliderNext: document.getElementById('slider-next'),
    currentDisplay: document.querySelector('.slider-navigation-current'),
    sliderContainer: document.querySelector('.grid-container'),
    currentIndex: 1
}

//goals carousel
const goal = {
    sliderPrev: document.getElementById('goal-slider-prev'),
    sliderNext: document.getElementById('goal-slider-next'),
    currentDisplay: document.querySelector('.goal-slider-navigation-current'),
    sliderContainer: document.querySelector('.goals'),
    currentIndex: 1
}


// Functions / Logic
function getScrollAmount(carouselName){
    var item = featured.sliderContainer.querySelector('.grid-container-item');
    var gap = parseInt(getComputedStyle(featured.sliderContainer).gap) || 0;
    if(carouselName =='goal'){
        item = goal.sliderContainer.querySelector('figure');
        gap = parseInt(getComputedStyle(featured.sliderContainer).gap) || 0;
    }
    else if(carouselName == 'featured'){
        item = featured.sliderContainer.querySelector('.grid-container-item');
        gap = parseInt(getComputedStyle(featured.sliderContainer).gap) || 0;
    }

    return item.offsetWidth + gap;
};

function updateSlides(carouselName){
    if(carouselName == 'goal'){
        goal.currentDisplay.textContent = goal.currentIndex;
        goal.sliderPrev.disabled = (goal.currentIndex === 1);
        goal.sliderNext.disabled = (goal.currentIndex === totalSlides);

        goal.sliderContainer.scrollTo({
            left: (goal.currentIndex - 1) * getScrollAmount(carouselName),
            behavior: 'smooth'
        });
    }

    else if(carouselName =='featured'){
        featured.currentDisplay.textContent = featured.currentIndex;
        featured.sliderPrev.disabled = (featured.currentIndex === 1);
        featured.sliderNext.disabled = (featured.currentIndex === totalSlides);

        featured.sliderContainer.scrollTo({
            left: (featured.currentIndex - 1) * getScrollAmount(carouselName),
            behavior: 'smooth'
        });
    }

};

function handleSwipe(carouselName){
    const diff = touchEndX - touchStartX;
    if(carouselName == 'goal'){
        if (Math.abs(diff) > 50) {
            if (diff > 50) {
                goal.currentIndex = Math.max(1, goal.currentIndex - 1);
            } else if (diff < -50) {
                goal.currentIndex = Math.min(totalSlides, goal.currentIndex + 1);
            }
            updateSlides(carouselName);
        } else {
            updateSlides(carouselName);
        }
    }

    else if(carouselName == 'featured'){
         if (Math.abs(diff) > 50) {
            if (diff > 50) {
                featured.currentIndex = Math.max(1, featured.currentIndex - 1);
            } else if (diff < -50) {
                featured.currentIndex = Math.min(totalSlides, featured.currentIndex + 1);
            }
            updateSlides(carouselName);
        } else {
            updateSlides(carouselName);
        }       
    }


};



// Event Listeners
const sliderPrevArray = [featured.sliderPrev, goal.sliderPrev];
const sliderNextArray = [featured.sliderNext, goal.sliderNext];
const sliderContainerArray = [featured.sliderContainer, goal.sliderContainer];

sliderPrevArray.forEach(slider => {
    slider.addEventListener('click',()=>{
        if(slider.className.includes('goal')){
            if(goal.currentIndex > 1){
                goal.currentIndex --;
                updateSlides('goal');
            }
        }
        else{
            if(featured.currentIndex > 1){
                featured.currentIndex --;
                updateSlides('featured');
            }
        }
    });
});

sliderNextArray.forEach(slider => {
    slider.addEventListener('click',()=>{
        if(slider.className.includes('goal')){
            if (goal.currentIndex < totalSlides){
                goal.currentIndex ++;
                updateSlides('goal');
            }
        }
        else{
            if (featured.currentIndex < totalSlides){
                featured.currentIndex ++;
                updateSlides('featured');
            }
        }
    });
});

sliderContainerArray.forEach(slider => {
    slider.addEventListener('touchstart', (e)=>{
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e)=>{
        touchEndX = e.changedTouches[0].clientX;
        if(slider.className.includes('goal')){
            handleSwipe('goal');
        }
        else{
            handleSwipe('featured');
        }
    });
});








