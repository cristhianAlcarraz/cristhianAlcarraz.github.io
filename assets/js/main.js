document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Menú Móvil
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu li a');
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Inicializar el escalado de Power BI
    initPowerBIScaling();
});

// Función centralizada y calculada para ajustar el zoom de Power BI
function initPowerBIScaling() {
    const scalers = document.querySelectorAll('.powerbi-scaler');
    if (scalers.length === 0) return;

    // Ancho y alto REALES del lienzo del reporte en Power BI.
    // Deben coincidir con el tamaño de página configurado en
    // Power BI Desktop (Visualizaciones > Formato de página > Tamaño de página)
    // y con los valores usados en .powerbi-scaler dentro de style.css.
    const CANVAS_WIDTH = 1720;
    const CANVAS_HEIGHT = 1080;

    function applyScale() {
        scalers.forEach(scaler => {
            const wrapper = scaler.parentElement;
            const wrapperWidth = wrapper.getBoundingClientRect().width;

            if (wrapperWidth > 0) {
                const scaleRatio = wrapperWidth / CANVAS_WIDTH;
                scaler.style.transform = `scale(${scaleRatio})`;
            }
        });
    }

    // Aplicar escala inicialmente
    applyScale();

    // Recalcular cuando todo haya terminado de cargar (fuentes, imágenes, etc.),
    // ya que estos pueden cambiar el ancho del contenedor después del DOMContentLoaded
    window.addEventListener('load', applyScale);

    // Re-calcular escala cuando la ventana cambie de tamaño
    window.addEventListener('resize', applyScale);

    // Re-calcular si el layout cambia dinámicamente
    if (window.ResizeObserver) {
        scalers.forEach(scaler => {
            new ResizeObserver(applyScale).observe(scaler.parentElement);
        });
    }
}
