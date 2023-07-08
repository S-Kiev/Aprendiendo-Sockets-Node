module.exports = (io) => {
    var mensajes = [];
    io.on('connection', (socket)=>{
        console.log('Un usuario se ha conectado');
        io.emit('mensajes', mensajes);
        socket.broadcast.emit('nuevoUsuario', 'Se ha conectado un nuevo usuario');

        socket.on('escribiendo', (nombreUsuario)=>{
            socket.broadcast.emit('escribiendo', nombreUsuario)
        })
        socket.on('mensaje', (data)=>{
            mensajes.push(data)
            io.emit('mensajes', mensajes);
        })
        socket.on('disconnect', ()=>{
            console.log('El usuario se ha desconectado');
        })
    })
}