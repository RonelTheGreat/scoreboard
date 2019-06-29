const express = require('express'),
      app     = express(),
      http    = require('http').Server(app),
      io      = require('socket.io')(http),
      PORT    = process.env.PORT || 3000;


app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
})

io.on('connection', (socket) => {
    console.log('a client has connected');

    socket.on('fromController', (signal) => {

        io.sockets.emit('fromServer', signal);
    })
})


http.listen(PORT, console.log(`Server listening @ PORT: ${PORT}`));