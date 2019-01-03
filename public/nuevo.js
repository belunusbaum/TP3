$('#nuevo').on('click', function () {

  const nombre = $('#nombre').val();
  const apellido = $('#apellido').val();
  const telefono = $('#telefono').val();
  const email = $('#email').val();
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (nombre == null || nombre.length == 0) {
    $('#nombreOblig').removeClass("ocultar")
    setTimeout(function () {
      $('#nombreOblig').addClass("ocultar");
    }, 2000)

  } else if (nombre.length > 30) {
    $('#nombreCarac').removeClass("ocultar");
    setTimeout(function () {
      $('#nombreOblig').addClass("ocultar");
    }, 2000)

  } else if (!/^[a-zA-Z]*$/.test(nombre)) {
    $('#nombreEsp').removeClass("ocultar");
    setTimeout(function () {
      $('#nombreEsp').addClass("ocultar");
    }, 2000)
    return false
  }

  if (apellido == null || apellido.length == 0) {
    $('#apellidoOblig').removeClass("ocultar")
    setTimeout(function () {
      $('#apellidoOblig').addClass("ocultar");
    }, 2000)
  }

  if (apellido.length > 30) {
    $('#apellidoCarac').removeClass("ocultar")
    setTimeout(function () {
      $('#apellidoCarac').addClass("ocultar");
    }, 2000)
  }

  if (!/^[a-zA-Z]*$/.test(apellido)) {
    $('#apellidoEsp').removeClass("ocultar");
    setTimeout(function () {
      $('#apellidoEsp').addClass("ocultar");
    }, 2000)
    return false;
  }

  if (telefono == null || telefono == 0) {
    $('#numeroOblig').removeClass('ocultar');
    setTimeout(function () {
      $('#numeroOblig').addClass("ocultar");
    }, 2000)
  }

  if (email == null || email == 0) {
    $('#mailOblig').removeClass("ocultar");
    setTimeout(function () {
      $('#mailOblig').addClass("ocultar");
    }, 2000)
  }

  if (!emailRegex.test(email)) {
    $('#mailCarac').removeClass("ocultar");
    setTimeout(function () {
      $('#mailCarac').addClass("ocultar");
    }, 2000)
    return false;
  }


  let nuevoUsuario = {
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    email: email,
  }
  console.log(nuevoUsuario)



  $.ajax('http://localhost:3000/api/users', {
    method: 'POST',
    data: nuevoUsuario,
    success: function () {
      location.href = "/users"
    }
  })
});


