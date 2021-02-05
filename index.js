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
io.on('connection', (socket) => {
    console.log(`Socket conectado ${socket.id}`)
    socket.on('disconnect', () => {
        console.log("desconectado")
    })

    socket.on('msg', (data) => {
        io.emit('showmsg', data);
    })

    socket.on('mensagem', () => {
        io.emit('new-user')
    })

})

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/chat', (req, res) => {
    res.render('chat');
})

server.listen(process.env.PORT || 3000)