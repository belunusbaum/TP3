$.ajax('http://localhost:3000/api/users')
    .done(function (data) {
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            $('#tabla').append(`
            <tr data-id=${data[i].id}>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].telefono}</td>
                <td>${data[i].email}</td>
                <td>
                    <a href="/users/editar?id=${data[i].id}">
                        <i class="fas fa-edit"></i>
                    </a>
                </td>
                    <td>
                    <button type="button" onclick="eliminar(${data[i].id})" class="btn" id="borrar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
               
            </tr>(
            `)
        }
    });


function eliminar(id) {

    $.ajax('http://localhost:3000/api/users/' + id, {

        method: 'DELETE',
        success: function () {
            $('#data-id' + id).remove();
            $('#modalELiminar').removeClass("ocultar")
        }
    })
}

$('#btnBusqueda').on('click', function () {
    const inputBusqueda = $('#inputBusqueda').val();
    $.ajax('http://localhost:3000/api/users?search=' + inputBusqueda)
        .done(function (data) {
            console.log(data);
            $('.infoUsuario').remove();
            for (let i = 0; i < data.length; i++) {
                $('table').append(`
            <tr >
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].telefono}</td>
                <td>${data[i].email}</td>
                <td>
                    <a href="/users/editar?id=${data[i].id}">
                        <i class="fas fa-edit"></i>
                    </a>
                </td>
                    <td>
                    <button type="button" onclick="eliminar(${data[i].id})" class="btn" id="borrar">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
                
            </tr>(
            `)
            }
        })
})