// Crear más hojas animadas dinámicamente
function createFloatingLeaves() {
    const container = document.querySelector('.floating-leaves');
    if (!container) return;
    
    // Crear 8 hojas adicionales con delays aleatorios entre 1.5 y 4 segundos
    for (let i = 4; i <= 11; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf leaf-extra';
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.width = (70 + Math.random() * 40) + 'px';
        leaf.style.height = leaf.style.width;
        leaf.style.animationDelay = (1.5 + Math.random() * 2.5) + 's';
        leaf.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(leaf);
    }
}

// CSS para las hojas extra
const style = document.createElement('style');
style.textContent = `
    .leaf-extra {
        position: absolute;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path d="M50,0 Q70,20 75,40 Q78,60 70,80 Q60,100 50,110 Q40,100 30,80 Q22,60 25,40 Q30,20 50,0 Z M50,50 Q55,60 50,70 Q45,60 50,50 Z" fill="%234ade80" stroke="%2316a34a" stroke-width="1"/></svg>');
        background-size: contain;
        background-repeat: no-repeat;
        opacity: 0;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        z-index: 1;
        pointer-events: none;
        animation: fallLeafExtra 20s linear infinite;
    }
    
    @keyframes fallLeafExtra {
        0% {
            top: -120px;
            opacity: 0;
            transform: rotateZ(0deg) translateX(0);
        }
        5% {
            opacity: 0.7;
        }
        50% {
            opacity: 0.7;
            transform: rotateZ(180deg) translateX(80px);
        }
        95% {
            opacity: 0.7;
        }
        100% {
            top: 100vh;
            opacity: 0;
            transform: rotateZ(360deg) translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// Llamar la función cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createFloatingLeaves);
} else {
    createFloatingLeaves();
}

// Smooth scrolling and navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Floating navigation
const navDots = document.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('.section, .hero');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[index].classList.add('active');
        }
    });
}

// Navigation click handlers
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Hide scroll indicator after first scroll
let hasScrolled = false;
window.addEventListener('scroll', () => {
    if (!hasScrolled) {
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) indicator.style.opacity = '0';
        hasScrolled = true;
    }
    updateActiveNav();
});

// Card hover effects
document.querySelectorAll('.culture-card, .tiktok-card, .social-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
});

// Initialize
updateActiveNav();