//conecta com o servidor

var socket = io('https://chatfriendscs.herokuapp.com');
socket.on('connect', () => {
    $('#msgs').append(`<div class="alert alert-success m-2 " role="alert">Um novo usuario entrou</div>`)
});
function sair() {
    var usernameField = document.getElementById('username')
    var username = usernameField.value;

    $('#msgs').append(`<div class="alert alert-danger m-2 " role="alert">${username} se desconectou</div>`)
}

//mostra a mensagem
socket.on('showmsg', (data) => {
    const usernameOn = $('#username').val()
    if (data.username === usernameOn) {
        $('#msgs').append(`<div class="alert alert-primary m-2  redondo" role="alert"><strong>${data.username}</strong> diz:${data.msg}</div>`)
    } else {
        $('#msgs').append(`<div class="alert alert-dark m-2  redondo" role="alert"><strong>${data.username}</strong> diz:${data.msg}</div>`)
    }
})

socket.on('new-user', () => {
    $('#msgs').append(`<div class="alert alert-success m-2  redondo" role="alert">Um novo usuario entrou</div>`)

})
//evento de captura
function enviar() {
    var msgField = document.getElementById('msg')
    var usernameField = document.getElementById('username')
    var msg = msgField.value;
    var username = usernameField.value;
    $('#msg').val(" ")
    socket.emit("msg", { username: username, msg: msg });
}