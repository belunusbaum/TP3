$('#nuevo').on('click', function () {

  const nombre = $('#nombre').val();
  const apellido = $('#apellido').val();
  const telefono = $('#telefono').val();
  const email = $('#email').val();
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (nombre == null || nombre.length == 0) {
    $('#nombreOblig').removeClass("ocultar")
  } else if (nombre.length > 30) {
    $('#nombreCarac').removeClass("ocultar");
  } else if (!/^\s+$/.test(nombre)) {

    $('#nombreEsp').removeClass("ocultar");

    return false
  }

  if (apellido == null || apellido.length == 0) {
    $('#apellidoOblig').removeClass("ocultar")
  } else if (apellido.length > 30) {
    $('#apellidoCarac').removeClass("ocultar")
  } else if (!/^\s+$/.test(apellido)) {
    console.log("hola")
    $('#apellidoEsp').removeClass("ocultar");
    return false;
  }
  if (telefono == null || telefono == 0) {
    return false;
  }
  if (emailRegex.test(email)) {
    console.log("sabri")
  } else {
    return false
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


