// JavaScript based on 1000 - Web Development 1 - Review of Day 7

// Handles toggling the navigation menu for small screens and enables TAB key navigation support for dropdown menus.

const siteNavigation = document.querySelector('.site-navigation');
const button = document.getElementById('menu-toggle');
const menu = document.getElementById('mobile-menu');
const closeButton = document.getElementById('mobile-menu-close');


const submenuToggles = document.querySelectorAll('.submenu-toggle');
const submenuClose = document.getElementById('submenu-close');

function closeMainMenu() {
    if (!siteNavigation || !button) return;
    siteNavigation.classList.remove('toggled');
    closeSubmenu();
}

if (button) {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
        const isOpen = siteNavigation.classList.toggle('toggled');
        if (isOpen) {
            // ensure submenus start closed whenever the main menu opens
            closeSubmenu();
        }
    });
}

if (closeButton) {
    closeButton.addEventListener('click', function(event) {
        event.stopPropagation();
        closeMainMenu();
    });
}

function getSubmenuWrapper(toggleEl) {
    return toggleEl?.closest('.header-submenu') || toggleEl?.parentElement;
}

function updateMobileSubmenuState(toggleEl, isOpen) {
    if (!toggleEl) return;
    const wrapper = getSubmenuWrapper(toggleEl);

    // Apply `toggled` to the `.submenu-toggle` itself to match SCSS
    toggleEl.classList.toggle('toggled', isOpen);

    // Add a focus state to the wrapper and submenu for accessibility
    if (wrapper) {
        wrapper.classList.toggle('focus', isOpen);
    }

    const submenu = wrapper?.querySelector('.mobile-submenu');
    if (submenu) {
        submenu.classList.toggle('focus', isOpen);
    }
}

function openSubmenu(toggleEl) {
    updateMobileSubmenuState(toggleEl, true);
}

function closeSubmenu() {
    // close all submenus: remove toggled from toggles and focus from wrappers/submenus
    document.querySelectorAll('.submenu-toggle').forEach(el => el.classList.remove('toggled'));
    document.querySelectorAll('.header-submenu').forEach(el => el.classList.remove('focus'));
    document.querySelectorAll('.mobile-submenu').forEach(el => el.classList.remove('focus'));
}

if (submenuToggles.length) {
    submenuToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(event) {
            event.stopPropagation();
            const isOpen = toggle.classList.contains('toggled');
            isOpen ? closeSubmenu() : openSubmenu(toggle);
        });
        toggle.addEventListener('mouseenter', function(event){
            event.stopPropagation();
            toggle.classList.contains('toggled');
            openSubmenu(toggle);
        })
        // toggle.addEventListener('mouseleave', function(event) {
        //     event.stopPropagation();
        //     closeSubmenu();
        // });
    });
}

if (submenuClose) {
    submenuClose.addEventListener('click', function(event) {
        event.stopPropagation();
        closeSubmenu();
    });

}

function isMobileSubmenuOpen() {
    return !!document.querySelector('.submenu-toggle.toggled');
}

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