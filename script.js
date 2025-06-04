document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuToggle.querySelector('i');

    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Add a small delay for the icon transition
        setTimeout(() => {
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        }, 50);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            menuIcon.classList.add('fa-bars');
            menuIcon.classList.remove('fa-times');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set initial states for sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        const content = section.querySelector('.content');
        const arrow = section.querySelector('.arrow');
        
        if (index === 0) {  // First section (Mans ceļš līdz LU)
            section.classList.add('active');
            setTimeout(() => {
                content.style.maxHeight = content.scrollHeight + "px";
            }, 10);
            arrow.textContent = '▼';
        } else {
            section.classList.remove('active');
            content.style.maxHeight = "0";
            arrow.textContent = '▲';
        }
    });

    // Add section toggle functionality
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const content = section.querySelector('.content');
        const arrow = section.querySelector('.arrow');

        header.addEventListener('click', () => {
            const isOpen = section.classList.contains('active');
            
            // Close all sections
            sections.forEach(s => {
                s.classList.remove('active');
                s.querySelector('.content').style.maxHeight = "0";
                s.querySelector('.arrow').textContent = '▲';
            });
            
            // If the clicked section was closed, open it
            if (!isOpen) {
                section.classList.add('active');
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + "px";
                }, 10);
                arrow.textContent = '▼';
            }
        });
    });
});

// Fullscreen image functionality
function openFullscreen(img) {
    const overlay = document.getElementById('fullscreen-overlay');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    fullscreenImg.src = img.src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Keyboard support for closing fullscreen
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
}); 