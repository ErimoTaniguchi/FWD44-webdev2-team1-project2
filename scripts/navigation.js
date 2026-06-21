// JavaScript based on 1000 - Web Development 1 - Review of Day 7

// Handles toggling the navigation menu for small screens and enables TAB key navigation support for dropdown menus.

// Define variables
const siteNavigation = document.getElementById('site-navigation');
const button = document.getElementById('menu-toggle');
const menu = document.getElementById('header-menu');
const closeButton = document.getElementById('mobile-menu-close');
const submenuToggle = document.querySelector('.submenu-toggle');

// Helper function to close main menu properly
function closeMainMenu() {
	siteNavigation.classList.remove('toggled');
	button.setAttribute('aria-expanded', false);
}

// Toggle main menu via hamburger icon
button.addEventListener('click', function(event) {
	event.stopPropagation(); // Keeps click from firing instantly
	const isExpanded = button.getAttribute('aria-expanded') === 'true';
	siteNavigation.classList.toggle('toggled');
	button.setAttribute('aria-expanded', !isExpanded);
});

// Close main menu using "Close" button
if (closeButton) {
	closeButton.addEventListener('click', function() {
		closeMainMenu();
	});
}

// Toggle submenu expansion state
if (submenuToggle) {
	submenuToggle.addEventListener('click', function(event) {
		event.stopPropagation();
		const isSubExpanded = submenuToggle.getAttribute('aria-expanded') === 'true';
		submenuToggle.setAttribute('aria-expanded', !isSubExpanded);

		// Toggle focus/open class on li.header-submenu for styling
		submenuToggle.closest('.header-submenu').classList.toggle('focus');
	});
}

// Close the nav menu if clicking outside of it
document.addEventListener('click', function(event) {
	if (!isClickInside) {
		closeMainMenu();
		if (submenuToggle) {
			submenuToggle.setAttribute('aria-expanded', 'false');
			submenuToggle.closest('.header-submenu').classList.remove('focus');
		}
	}
});

// Keyboard focus tracking
const links = menu.querySelectorAll('li a');
for (const link of links) {
	link.addEventListener('focus', toggleFocus, true);
	link.addEventListener('blur', toggleFocus, true);
}

function toggleFocus(event) {
	if (event.type === 'focus' || event.type === 'blur') {
		let self = this;

		// Move up nav tree to main container
		while (self && !self.classList.contains('header-menu')) {
			if ('li' === self.tagName.toLowerCase()) {
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