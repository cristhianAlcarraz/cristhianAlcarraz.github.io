// Main navigation and UI functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu li a');

    // Alternar menú al hacer clic en la hamburguesa
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar el menú automáticamente al hacer clic en un enlace (útil para móviles)
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Escalar automáticamente el iframe de Power BI
    initPowerBIScaling();
});

// Calcula dinámicamente el factor de escala según el ancho real de la tarjeta
function initPowerBIScaling() {
    const NATIVE_WIDTH = 1280; // Ancho base estándar del lienzo de Power BI

    function scaleFrames() {
        document.querySelectorAll('.powerbi-wrapper').forEach(wrapper => {
            const iframe = wrapper.querySelector('iframe');
            if (!iframe) return;

            const containerWidth = wrapper.getBoundingClientRect().width;
            if (containerWidth > 0) {
                const scaleRatio = containerWidth / NATIVE_WIDTH;
                iframe.style.transform = `scale(${scaleRatio})`;
            }
        });
    }

    // Ejecución inicial y en eventos de redimensionamiento
    scaleFrames();
    window.addEventListener('resize', scaleFrames);
    window.addEventListener('load', scaleFrames);

    // Detección de cambios de layout
    if (window.ResizeObserver) {
        document.querySelectorAll('.powerbi-wrapper').forEach(wrapper => {
            new ResizeObserver(() => scaleFrames()).observe(wrapper);
        });
    }
}
