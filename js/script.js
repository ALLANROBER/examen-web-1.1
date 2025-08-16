$(document).ready(function() {
  // 1️⃣ Cargar datos de localStorage
  if(localStorage.getItem('nombre')) $('#nombre').text(localStorage.getItem('nombre'));
  if(localStorage.getItem('correo')) $('#correo').text(localStorage.getItem('correo'));
  if(localStorage.getItem('bio')) {
    if($('#bioDisplay').length === 0) $('<p id="bioDisplay"></p>').insertAfter('#avatar');
    $('#bioDisplay').text(localStorage.getItem('bio'));
  }
  if(localStorage.getItem('bgColor')) $('body').css('background-color', localStorage.getItem('bgColor'));
  
  // 2️⃣ Botón de alerta
  $('<button id="btnAlerta" class="btn btn-warning mb-2">Alerta Bienvenida</button>').insertBefore('#formPerfil');
  $('#btnAlerta').click(function() {
    alert('¡Bienvenido a tu perfil, Allan!');
  });

  // 3️⃣ Botón cambiar color de fondo
  $('<button id="btnColor" class="btn btn-secondary mb-2 me-2">Cambiar Fondo</button>').insertBefore('#formPerfil');
  $('#btnColor').click(function() {
    const color = prompt('Ingresa un color (nombre o #hex):', '#f8f9fa');
    if(color) {
      $('body').css('background-color', color);
      localStorage.setItem('bgColor', color);
    }
  });

  // 4️⃣ Botón cambiar contenido de <p>
  $('<button id="btnCambiarP" class="btn btn-info mb-2">Cambiar párrafo</button>').insertBefore('#formPerfil');
  $('#btnCambiarP').click(function() {
    $('#mensaje').text('¡Has cambiado el contenido del párrafo!');
  });

  // 5️⃣ Manejo del formulario
  $('#formPerfil').submit(function(e) {
    e.preventDefault();

    const nombre = $('#inputNombre').val().trim();
    const correo = $('#inputCorreo').val().trim();
    const bio = $('#inputBio').val().trim();

    // Validación
    if(!nombre || !correo || !bio) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    // Actualizar y guardar en localStorage
    $('#nombre').text(nombre);
    $('#correo').text(correo);
    if($('#bioDisplay').length === 0) $('<p id="bioDisplay"></p>').insertAfter('#avatar');
    $('#bioDisplay').text(bio);

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('correo', correo);
    localStorage.setItem('bio', bio);

    // Limpiar formulario
    $(this).trigger('reset');

    // Agregar dinámicamente a la lista
    if($('#listaDinamica').length === 0) $('<ul id="listaDinamica" class="mt-2"></ul>').insertAfter('#formPerfil');
    $('#listaDinamica').append(`<li>${nombre} - ${correo}</li>`);

    // Guardar lista en localStorage
    const items = $('#listaDinamica li').map(function(){ return $(this).text(); }).get();
    localStorage.setItem('lista', JSON.stringify(items));
  });

  // 6️⃣ Precargar lista al iniciar
  if(localStorage.getItem('lista')) {
    const lista = JSON.parse(localStorage.getItem('lista'));
    if($('#listaDinamica').length === 0) $('<ul id="listaDinamica" class="mt-2"></ul>').insertAfter('#formPerfil');
    lista.forEach(i => $('#listaDinamica').append(`<li>${i}</li>`));
  }
});
