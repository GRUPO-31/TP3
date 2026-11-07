/**
 * Interacciones simples y accesibles — TP3 AutoMail AI (Grupo 31 · IFTS 29)
 * Resaltado visual de caminos SÍ/NO, navegación activa e impresión limpia.
 */

(() => {
  'use strict';

  // 1. Selector visual de caminos (Ver todo / Caso SÍ / Caso NO)
  document.querySelectorAll('.sim-buttons[data-target]').forEach((grupo) => {
    const idFlujo = grupo.getAttribute('data-target');
    const diagrama = document.getElementById(idFlujo);
    const botones = Array.from(grupo.querySelectorAll('.sim-btn'));

    if (!diagrama || botones.length === 0) return;

    const cambiarModo = (elegido) => {
      const modo = elegido.getAttribute('data-mode') || 'all';
      diagrama.setAttribute('data-mode', modo);

      botones.forEach((b) => {
        const activo = b === elegido;
        b.classList.toggle('active', activo);
        b.setAttribute('aria-pressed', activo ? 'true' : 'false');
      });
    };

    botones.forEach((btn, idx) => {
      btn.addEventListener('click', () => cambiarModo(btn));

      // Navegación con flechas izquierda/derecha del teclado
      btn.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const salto = e.key === 'ArrowRight' ? 1 : -1;
        const prox = (idx + salto + botones.length) % botones.length;
        botones[prox].focus();
        cambiarModo(botones[prox]);
      });
    });
  });

  // 2. Indicador de sección activa en la barra superior
  const navItems = Array.from(document.querySelectorAll('.quick-nav .nav-item'));
  const secciones = navItems
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && secciones.length > 0) {
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          const id = `#${entrada.target.id}`;
          navItems.forEach((a) => {
            a.classList.toggle('active', a.getAttribute('href') === id);
          });
        });
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.05 }
    );

    secciones.forEach((s) => obs.observe(s));
  }

  // 3. Abrir desplegables automáticamente al imprimir a PDF
  const desplegables = Array.from(document.querySelectorAll('details.more-details'));
  let previos = null;

  window.addEventListener('beforeprint', () => {
    previos = desplegables.map((d) => d.open);
    desplegables.forEach((d) => {
      d.open = true;
    });
  });

  window.addEventListener('afterprint', () => {
    if (!previos) return;
    desplegables.forEach((d, i) => {
      d.open = previos[i];
    });
    previos = null;
  });
})();
