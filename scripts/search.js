const searchTerm = document.getElementById('site-search');
const searchSubmit = document.getElementById('search-submit');

function updateSubmit() {
    if (!searchTerm || !searchSubmit) {
        return;
    }

    const term = searchTerm.value.trim();
    if (!term) {
        searchSubmit.value = '';
        searchSubmit.style.display = 'none';
        return;
    }

    searchSubmit.value = `Search for "${term}"`;
    searchSubmit.style.display = '';
}

function hideSubmit() {
    if (searchSubmit) {
        searchSubmit.style.display = 'none';
    }
}

updateSubmit();

if (searchTerm) {
    searchTerm.addEventListener('input', updateSubmit);
    searchTerm.addEventListener('focus', updateSubmit);
    searchTerm.addEventListener('blur', hideSubmit);
}

if (searchSubmit) {
    searchSubmit.addEventListener('blur', hideSubmit);
}
