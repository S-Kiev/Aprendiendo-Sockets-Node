
const socket = io();

const nombreUsuario = document.getElementById('usuario');
const escribirMensaje = document.getElementById('escribir_mensaje');
const todosMensajes = document.getElementById('todos-mensajes');
const nuevoUsuario = document.getElementById('nuevoUsuario');
const escribiendo = document.getElementById('escribiendo');

escribirMensaje.addEventListener('keyup', (e)=>{
    if (e.code == 'Enter') {
        if (nombreUsuario.value != '' && escribirMensaje.value != '') {
            socket.emit('mensaje', {
                nombreUsuario: nombreUsuario.value,
                mensaje: escribirMensaje.value.slice(0, -1),
            })
            escribirMensaje.value = '';
        } else {
            console.log('Ingrese la informacion completa a los campos')
        }
    }
});

escribirMensaje.addEventListener('keydown', (e)=>{
    if (nombreUsuario.value != '') {
        socket.emit('escribiendo', nombreUsuario.value)
    } 
});

socket.on('escribiendo', (nombreUsuario)=>{
    escribiendo.innerHTML = nombreUsuario + ' está escribiendo...';
    setTimeout(()=>{
        escribiendo.innerHTML = '';
    }, 3000)
})

socket.on('mensajes', (mensajes)=>{
    var contenido = '';
    for (let i = 0; i < mensajes.length; i++) {
        contenido += `
        <div class='mensaje'>
            ${mensajes[i].nombreUsuario}:
            ${mensajes[i].mensaje}
        </div>
        <br>
        `
    }
    todosMensajes.innerHTML = contenido;
    todosMensajes.scrollTop = todosMensajes.scrollHeight;
})

socket.on('nuevoUsuario', (mensaje) => {
    nuevoUsuario.innerHTML =mensaje;
    setTimeout(()=>{
        nuevoUsuario.innerHTML = '';
    }, 3000)
  });
  
