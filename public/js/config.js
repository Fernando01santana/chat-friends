//conecta com o servidor
var socket = io();
let params = (new URL(document.location)).searchParams;

socket.on('connect', (client) => {
    let user = params.get("username");
    $('#username').val(user)
    $('#username').attr("disabled", true);
    //$('#msgs').append(`<div class="alert alert-success m-2 " role="alert">Um novo usuario entrou</div>`)
});

function sair() {
    var usernameField = document.getElementById('username')
    var username = usernameField.value;
    socket.emit("logout", { username: username });
    window.location.href = "/";
    $('#msgs').append(`<div class="alert alert-danger m-2 " role="alert">${username} se desconectou</div>`)
}
socket.on('sair', (data) => {
    $('#msgs').append(`<div class="alert alert-danger m-2  redondo" role="alert"><strong>${data.username}</strong> saiu</div>`)
})
//mostra a mensagem
socket.on('showmsg', (data) => {
    const usernameOn = $('#username').val()
    if (data.username === usernameOn) {
        $('#msgs').append(`<div class="alert alert-primary m-2  redondo" role="alert"><strong>${data.username}</strong> diz:${data.msg}</div>`)
    } else {
        $('#msgs').append(`<div class="alert alert-dark m-2  redondo" role="alert"><strong>${data.username}</strong> diz:${data.msg}</div>`)
    }
})




//evento de captura
function enviar() {
    var msg = $('#msg').val()
    var username = $('#username').val()
    filterXSS(msg);
    $('#msg').val("")

    if (msg != '') {
        console.log(msg)
        const script = "<script>";
        const state = msg.indexOf(script)
        if (state === true) {
            sair()
        } else {
            socket.emit("msg", { username: username, msg: msg });
        }

    } else {
        console.log("vazio")
    }
}

var username = params.get("username");
console.log(username)
socket.emit('user', { username: username })
socket.on('user-msg', (data) => {
    console.log(data)
    $('#msgs').append(`<div class="alert alert-success m-2 " role="alert"><strong>${data.username}</strong> entrou</div>`)
})


function envmsg(event) {
    if (event.which == 13 || event.keyCode == 13) {
        //setTimeout(enviar, 1000);
        enviar()
        return false;
    }
    $('#username').attr("disabled", true);
    return true;
};

var messageBody = document.querySelector('#msgs');
messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;