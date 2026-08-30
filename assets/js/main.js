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
    resizePowerBIReports();
});

// Escalado responsivo del reporte de Power BI embebido
// El reporte se dibuja a su tamaño REAL (REPORT_WIDTH x REPORT_HEIGHT)
// y luego se reduce con CSS transform:scale() según el ancho disponible del contenedor.
function resizePowerBIReports() {
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

        // Calculamos el factor de escala según el ancho disponible del wrapper
        const scale = wrapper.clientWidth / REPORT_WIDTH;
        scaler.style.transform = `scale(${scale})`;
    });
}

// Recalcular al cambiar el tamaño de la ventana (ej. rotar el celular, redimensionar)
window.addEventListener('resize', resizePowerBIReports);

// Recalcular también al terminar de cargar todo (por si las fuentes/imágenes
// cambian el ancho final de las cards antes de que el iframe esté listo)
window.addEventListener('load', resizePowerBIReports);
