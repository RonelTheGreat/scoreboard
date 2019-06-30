const mongoose  = require('mongoose'),
      express   = require('express'),
      Sboard    = require('./models/scoreboard'),
      app       = express(),
      http      = require('http').Server(app),
      io        = require('socket.io')(http),
      PORT      = process.env.PORT || 3000;



app.use(express.static('public'));
app.set('view engine', 'ejs');


// MONGODB CONNECTION
const DB_URL = 'mongodb+srv://admin123:admin123@cluster0-brxlt.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(DB_URL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


app.get('/', (req, res) => {
    Sboard.find({}, (err, scoreboard) => {
        if (err) return console.log('Can\'t find instance of scoreboard ...');
        res.render('index', {scoreboard : scoreboard[0]}); 
    })
})

app.get('/simulate', (req, res) => {
    res.render('simulate');
})

io.on('connection', (socket) => {
    console.log('a client has connected');

    socket.on('fromController', (signal) => {

        io.sockets.emit('fromServer', signal);
    })
})


http.listen(PORT, console.log(`Server listening @ PORT: ${PORT}`));