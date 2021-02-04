//conecta com o servidor
var socket = io('https://chatfriendscs.herokuapp.com');

function sair() {
    var usernameField = document.getElementById('username')
    var username = usernameField.value;

    var chat = document.getElementById('msgs');
    var b = document.createElement('b');
    b.innerHTML = username + " saiu"
    chat.append(b)


    socket.on('disconnect', () => {


    })
}


//mostra a mensagem
socket.on('showmsg', (data) => {
    var chat = document.getElementById('msgs');
    var p = document.createElement('p');
    p.innerHTML = data.username + " diz :" + data.msg
    chat.append(p)

})
//evento de captura
function enviar() {
    var msgField = document.getElementById('msg')
    var usernameField = document.getElementById('username')
    var msg = msgField.value;
    var username = usernameField.value;
    socket.emit("msg", { username: username, msg: msg });
}