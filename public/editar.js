const urlParams = new URLSearchParams(window.location.search)
const user = urlParams.get('id');
console.log(user)
$.ajax('http://localhost:3000/api/users/' + user)
    .done(function (data) {
        // data es el json del usuario
        console.log(data)
        $('#nombre').val(data.nombre);
        $('#apellido').val(data.apellido);
        $('#telefono').val(data.telefono);
        $('#email').val(data.email);


        $('#editar').on('click', function () {
            $.ajax('http://localhost:3000/api/users/' + user, {
                method: "PUT",
                data: {
                    nombre: $('#nombre').val(),
                    apellido: $('#apellido').val(),
                    telefono: $('#telefono').val(),
                    email: $('#email').val()
                },
                success: function () {
                    location.href = "/users"
                }
            })
        })

    })
