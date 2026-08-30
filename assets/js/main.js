// Main navigation functionality
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

    // Ajuste inicial del reporte de Power BI
    initPowerBIScaling();
});

// Escalado responsivo del reporte de Power BI embebido
// El reporte se dibuja a su tamaño REAL (REPORT_WIDTH x REPORT_HEIGHT)
// y luego se reduce con CSS transform:scale() según el ancho disponible del contenedor.
// Usamos ResizeObserver en vez de solo "load"/"resize" porque se dispara
// en cuanto el elemento tiene un tamaño real, sin depender del orden de carga
// de imágenes, fuentes u otros recursos que puedan cambiar el ancho de la card.
function initPowerBIScaling() {
    const REPORT_WIDTH = 1280;  // Ancho nativo del reporte de Power BI
    const REPORT_HEIGHT = 720;  // Alto nativo del reporte de Power BI (16:9)

    document.querySelectorAll('.powerbi-wrapper').forEach(wrapper => {
        const scaler = wrapper.querySelector('.powerbi-scaler');
        const iframe = wrapper.querySelector('iframe');
        if (!scaler || !iframe) return;

        // Fijamos el tamaño real del iframe y del contenedor escalador
        iframe.style.width = REPORT_WIDTH + 'px';
        iframe.style.height = REPORT_HEIGHT + 'px';
        scaler.style.width = REPORT_WIDTH + 'px';
        scaler.style.height = REPORT_HEIGHT + 'px';

        const applyScale = () => {
            const availableWidth = wrapper.clientWidth;
            if (!availableWidth) return; // evita scale(0) si aún no tiene ancho
            const scale = availableWidth / REPORT_WIDTH;
            scaler.style.transform = `scale(${scale})`;
        };

        // Cálculo inicial inmediato
        applyScale();

        // Recalcular cada vez que cambie el tamaño real del wrapper
        if (window.ResizeObserver) {
            new ResizeObserver(applyScale).observe(wrapper);
        } else {
            // Fallback para navegadores muy antiguos sin ResizeObserver
            window.addEventListener('resize', applyScale);
            window.addEventListener('load', applyScale);
        }
    });
}
