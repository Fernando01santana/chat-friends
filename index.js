var express = require('express')
var app = express();
var http = require('http').createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "https://chatfriendscs.herokuapp.com",
        methods: ["GET", "POST"]
    }
});


//abrindo evento de conexão
io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log("desconectado")
    })

    socket.on('msg', (data) => {
        io.emit('showmsg', data);
    })

})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/chat', (req, res) => {
    res.render('chat');
})

http.listen(process.env.PORT || 3000, () => {
    console.log("SERVER ON")
})