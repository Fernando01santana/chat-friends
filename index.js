var express = require('express')
const app = express();
const server = require('http').createServer(app);
var cors = require('cors')
app.use(cors())
const io = require('socket.io')(server, {
    cors: {
        origins: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
var usuarios = 0;
//abrindo evento de conexão
io.on('connection', (socket) => {
    usuarios++;
    console.log("Usuarios conectados ate o momento: " + usuarios)
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

server.listen(process.env.PORT || 3000, () => {
    console.log("SERVER ON")
})