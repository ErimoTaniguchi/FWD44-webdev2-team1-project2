const searchTerm = document.getElementById('site-search');
const searchSubmitElements = document.querySelectorAll('.search-submit, .search-button');

// Update placeholder based on viewport width (>= 1024px)
function updatePlaceholderForViewport(e) {
    if (!searchTerm) return;
    const isLarge = e.matches; // true when viewport width is >= 1024px
    searchTerm.placeholder = isLarge ? 'Search' : 'Search for...';
}

if (searchTerm) {
    const mq = window.matchMedia('(min-width: 1024px)');
    // set initial placeholder
    updatePlaceholderForViewport(mq);
    // listen for changes
    if (typeof mq.addEventListener === 'function') {
        mq.addEventListener('change', updatePlaceholderForViewport);
    } else if (typeof mq.addListener === 'function') {
        mq.addListener(updatePlaceholderForViewport);
    }
}

function setSubmitLabel(element, label) {
    if ('value' in element) {
        element.value = label;
    } else {
        element.textContent = label;
    }
}

function updateSubmit() {
    if (!searchTerm || !searchSubmitElements.length) {
        return;
    }

    const term = searchTerm.value.trim();
    searchSubmitElements.forEach((submit) => {
        if (!term) {
            setSubmitLabel(submit, '');
            submit.style.display = 'none';
            return;
        }

        setSubmitLabel(submit, `Search for "${term}"`);
        submit.style.display = '';
    });
}

function hideSubmit() {
    searchSubmitElements.forEach((submit) => {
        submit.style.display = 'none';
    });
}

updateSubmit();

if (searchTerm) {
    searchTerm.addEventListener('input', updateSubmit);
    searchTerm.addEventListener('focus', updateSubmit);
    searchTerm.addEventListener('blur', hideSubmit);
}
