/* VerdeVida Market — interacciones del sitio */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Menú responsive ---------- */
  var botonMenu = document.querySelector('.boton-menu');
  var navPrincipal = document.querySelector('.nav-principal');

  if (botonMenu && navPrincipal) {
    botonMenu.addEventListener('click', function () {
      navPrincipal.classList.toggle('abierto');
      var expandido = navPrincipal.classList.contains('abierto');
      botonMenu.setAttribute('aria-expanded', expandido);
    });
  }

  /* ---------- Enlace activo según la página actual ---------- */
  var enlaces = document.querySelectorAll('.nav-principal__lista a');
  var pagina = window.location.pathname.split('/').pop() || 'index.html';

  enlaces.forEach(function (enlace) {
    var href = enlace.getAttribute('href');
    if (href === pagina) {
      enlace.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Validación del formulario de contacto ---------- */
  var formulario = document.getElementById('formulario-contacto');
  if (!formulario) return;

  var mensajeEnvio = document.getElementById('mensaje-envio');

  function mostrarError(campo, texto) {
    var errorEl = document.getElementById(campo.id + '-error');
    if (errorEl) errorEl.textContent = texto;
  }

  function validarCampo(campo) {
    var valor = campo.value.trim();

    if (campo.hasAttribute('required') && valor === '') {
      mostrarError(campo, 'Este campo es obligatorio.');
      return false;
    }

    if (campo.type === 'email' && valor !== '') {
      var patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patronCorreo.test(valor)) {
        mostrarError(campo, 'Ingresa un correo electrónico válido.');
        return false;
      }
    }

    mostrarError(campo, '');
    return true;
  }

  var camposFormulario = formulario.querySelectorAll('input, textarea, select');

  camposFormulario.forEach(function (campo) {
    campo.addEventListener('blur', function () { validarCampo(campo); });
  });

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    var formularioValido = true;

    camposFormulario.forEach(function (campo) {
      if (!validarCampo(campo)) formularioValido = false;
    });

    if (formularioValido) {
      mensajeEnvio.textContent = '¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos pronto.';
      mensajeEnvio.classList.add('visible');
      formulario.reset();
    } else {
      mensajeEnvio.classList.remove('visible');
    }
  });

});
