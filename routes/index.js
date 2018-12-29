var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');
let users = fs.readFileSync('users.json');
users = JSON.parse(users);


// fs.writeFileSync('users.json', JSON.stringify(users))


router.get('/api/users', function (req, res, next) {

  res.json(users)
})

router.get('/users', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});


router.get('/users/new', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'nuevo.html'))
});

router.get('/users/editar', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'editar.html'))
})

router.get('/ping', function (req, res, next) {
  res.json('pong')
})







router.delete('/api/users/:id', function (req, res) {
  let users = fs.readFileSync('users.json');
  users = JSON.parse(users);
  const id = req.params.id
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users.splice(i, 1)
    }
  }
  fs.writeFileSync('users.json', JSON.stringify(users))
  res.send(users)
});


router.get('/api/users/:id', function (req, res, next) {
  let users = fs.readFileSync('users.json');
  users = JSON.parse(users);
  const id = req.params.id;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      res.json(users[i])
    }
    fs.writeFileSync('users.json', JSON.stringify(users))
    res.json(users)
  }
})


router.post('/api/users', function (req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'nuevo.html'))
  let users = fs.readFileSync('users.json');
  users = JSON.parse(users);
  const user = req.body
  const nombre = user.nombre
  const apellido = user.apellido
  const telefono = user.telefono
  const email = user.email
  // const nombre = $('#nombre').val();
  // const apellido = $('#apellido').val();
  // const telefono = $('#telefono').val();
  // const email = $('#email').val();
  const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (nombre == null || nombre.length == 0) {
    return res.status(400).end("error")

  } else if (nombre.length > 30) {
    return res.status(402).end("error")

  } else if (!/^[a-zA-Z]*$/.test(nombre)) {
    return res.status(403).end("error")
    }

  if (apellido == null || apellido.length == 0) {
    return res.status(404).end("error")
  }
  
  if (apellido.length > 30) {
    return res.status(405).end("error")
  } 
  
  if (!/^[a-zA-Z]*$/.test(apellido)) {
    return res.status(406).end("error")
  }
  
  if (telefono == null || telefono == 0) {
    return res.status(407).end("error")
  } 
  
  if (email == null || email == 0) {
    return res.status(408).end("error")
  }

  if (!emailRegex.test(email)) {
    return res.status(409).end("error")
  }

  const lastId = users[users.length - 1].id
  user.id = lastId + 1
  console.log(user)
  users.push(user)

  fs.writeFileSync('users.json', JSON.stringify(users))
  res.json(users)


});


router.put('/api/users/:id', function (req, res, next) {
  // sacamos el id de los params
  let users = fs.readFileSync('users.json');
  users = JSON.parse(users);
  const id = req.params.id;
  const editUsuario = req.body;

  if (editUsuario.nombre.length === 0 || editUsuario.apellido.length === 0 || editUsuario.telefono.length === 0 || editUsuario.email.length === 0) {
    return res.status(400).end("error")
  }
  // buscar el usuario
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      // voy a ir pisando las propiedades una por una, voy a modificar de forma explicita 
      users[i].nombre = editUsuario.nombre;
      users[i].apellido = editUsuario.apellido;
      users[i].telefono = editUsuario.telefono;
      users[i].email = editUsuario.email;
      // ya esta guardado porque estoy pisando las propiedades 
    }
  }
  fs.writeFileSync('users.json', JSON.stringify(users))
  res.json(users)
})

router.get('/api/users', function (req, res, next) {
  // let users = fs.readFileSync('users.json');
  // users = JSON.parse(users);

  let buscar = req.query.search;

  if (buscar && buscar.length < 0) {
    let usuarioFiltrado = users.filter(function(usuario) {
 return usuario.nombre.toLowerCase().indexOf(buscar.toLowerCase()) >= 0 ||
      usuario.apellido.toLowerCase().indexOf(buscar.toLowerCase()) >= 0 ||
      usuario.telefono.indexOf(search) >= 0 ||
      usuario.email.toLowerCase().indexOf(search.toLowerCase()) >= 0;
    })
    
 res.json(usuarioFiltrado);
 return;
 }res.json(users)
});



module.exports = router;

