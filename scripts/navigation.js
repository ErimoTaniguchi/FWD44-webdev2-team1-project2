// JavaScript based on 1000 - Web Development 1 - Review of Day 7

// Handles toggling the navigation menu for small screens and enables TAB key navigation support for dropdown menus.

const siteNavigation = document.querySelector('.site-navigation');
const button = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const closeButton = document.getElementById('mobile-menu-close');

const submenuOpen = document.getElementById('submenu-open');
const submenuClose = document.getElementById('submenu-close');
const submenuDesktop = document.getElementById('submenu-desktop');
const navSubmenu = document.getElementById('nav-submenu');
const menuListSection = document.querySelector('.menu-list-section');
const mobileHeader = document.querySelector('.mobile-header');
const iconAccount = document.getElementById('icon-account');
const mobileFooter = document.getElementById('mobile-footer');
const BREAKPOINT = 1024;

function closeMainMenu() {
    if (!siteNavigation || !button) return;
    siteNavigation.classList.remove('toggled');
}

if (button) {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        siteNavigation.classList.toggle('toggled');
    });
}

if (closeButton) {
    closeButton.addEventListener('click', function(event) {
        event.stopPropagation();
        closeMainMenu();
    });
}

function getSubmenuWrapper() {
    return submenuOpen?.closest('.submenu-toggle')
        || submenuOpen?.closest('.header-submenu')
        || submenuOpen?.parentElement;
}

function updateMobileSubmenuState(isOpen) {
    if (!submenuOpen) return;

    const wrapper = getSubmenuWrapper();
    if (wrapper) {
        wrapper.classList.toggle('toggled', isOpen);
    }

    const submenu = submenuOpen.closest('.header-submenu');
    if (submenu) {
        submenu.classList.toggle('focus', isOpen);
    }

    adjustMenuListForSubmenu(isOpen && window.innerWidth < BREAKPOINT);
}

function openSubmenu() {
    updateMobileSubmenuState(true);
}

function closeSubmenu() {
    updateMobileSubmenuState(false);
}

function adjustMenuListForSubmenu(isNavSubmenuVisible) {
    const wide = window.innerWidth >= BREAKPOINT;
    if (!menuListSection) return;

    const items = Array.from(menuListSection.querySelectorAll('li'));
    const lastFour = items.slice(-4);

    if (!wide && isNavSubmenuVisible) {
        if (submenuOpen) submenuOpen.style.display = 'none';
        lastFour.forEach(li => { li.style.display = 'none'; });
    } else {
        if (submenuOpen) submenuOpen.style.display = wide ? 'none' : '';
        lastFour.forEach(li => { li.style.display = ''; });
    }
}

if (submenuOpen) {
    submenuOpen.addEventListener('click', function(event) {
        event.stopPropagation();
        const wrapper = getSubmenuWrapper();
        const isOpen = wrapper?.classList.contains('toggled');
        isOpen ? closeSubmenu() : openSubmenu();
    });
}

if (submenuClose) {
    submenuClose.addEventListener('click', function(event) {
        event.stopPropagation();
        closeSubmenu();
    });
}

function isMobileSubmenuOpen() {
    const wrapper = getSubmenuWrapper();
    return !!wrapper?.classList.contains('toggled');
}

function updateSubmenuVisibility() {
    const wide = window.innerWidth >= BREAKPOINT;

    if (submenuDesktop) {
        submenuDesktop.style.display = wide ? '' : 'none';
    }

    if (submenuOpen) {
        submenuOpen.style.display = wide ? 'none' : '';
    }

    if (submenuClose) {
        submenuClose.style.display = wide ? 'none' : '';
    }

    if (button) {
        button.style.display = wide ? 'none' : '';
    }

    if (mobileHeader) {
        mobileHeader.style.display = wide ? 'none' : '';
    }

    if (iconAccount) {
        iconAccount.style.display = wide ? 'none' : '';
    }

    if (mobileFooter) {
        mobileFooter.style.display = wide ? 'none' : '';
    }

    if (navSubmenu && wide) {
        navSubmenu.style.display = 'none';
    } else if (navSubmenu && !wide) {
        navSubmenu.style.display = '';
    }

    if (wide) {
        closeSubmenu();
    }

    const submenuActive = !wide && isMobileSubmenuOpen();
    adjustMenuListForSubmenu(submenuActive);
}

updateSubmenuVisibility();
window.addEventListener('resize', updateSubmenuVisibility);

document.addEventListener('click', function(event) {
    const target = event.target;
    const isClickInside = siteNavigation && siteNavigation.contains(target);

    if (!isClickInside) {
        closeMainMenu();
        closeSubmenu();
    }
});

if (menu) {
    const links = menu.querySelectorAll('li a');
    for (const link of links) {
        link.addEventListener('focus', toggleFocus, true);
        link.addEventListener('blur', toggleFocus, true);
    }
}

function toggleFocus(event) {
    if (event.type === 'focus' || event.type === 'blur') {
        let self = this;
        while (self && !self.classList.contains('mobile-menu')) {
            if (self.tagName.toLowerCase() === 'li') {
                self.classList.toggle('focus');
            }
            self = self.parentNode;
        }
    }

    if (event.type === 'touchstart') {
        const menuItem = this.parentNode;
        event.preventDefault();
        for (const link of menuItem.parentNode.children) {
            if (menuItem !== link) {
                link.classList.remove('focus');
            }
        }
        menuItem.classList.toggle('focus');
    }
}