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
app.use(express.static('public'));
//abrindo evento de conexão
io.on('connect', (socket) => {

    socket.on('user', (data) => {
        socket.broadcast.emit('user-msg', data)
    })

    socket.on('logout', (data) => {
        io.emit('sair', data)
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