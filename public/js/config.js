//conecta com o servidor
var socket = io();
let params = (new URL(document.location)).searchParams;

function playMusic() {
    const music = document.querySelector('audio')
    music.play()
} function pegarDataAtual() {
    var dataAtual = new Date();
    var dia = (dataAtual.getDate() < 10 ? '0' : '') + dataAtual.getDate();
    var mes = ((dataAtual.getMonth() + 1) < 10 ? '0' : '') + (dataAtual.getMonth() + 1);
    var ano = dataAtual.getFullYear();
    var hora = (dataAtual.getHours() < 10 ? '0' : '') + dataAtual.getHours();
    var minuto = (dataAtual.getMinutes() < 10 ? '0' : '') + dataAtual.getMinutes();
    var segundo = (dataAtual.getSeconds() < 10 ? '0' : '') + dataAtual.getSeconds();

    var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
    return dataFormatada;
}

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
    var date = new Date()
    console.log(date)
    if (data.username === usernameOn) {

        $('#msgs').append(`<div class="alert alert-primary m-2  redondo" id="mensagem" role="alert" onclick="callUser(${data})">${pegarDataAtual()} <strong>${data.username}: </strong>${data.msg}</div>`)
    } else {
        playMusic()
        $('#msgs').append(`<div class="alert alert-dark m-2  redondo" id="mensagem" role="alert" onclick="callUser(${data})">${pegarDataAtual()} <strong>${data.username} :</strong>${data.msg}</div>`)
    }
})
function callUser(data) {
    console.log(`${data.username}`)
    // $('#mensagem').click(() => {
    //     console.log("clicou")
    //     $('#msgs').append(`<div class="alert alert-dark m-2  redondo " role="alert"><strong>${data.username}</strong> funfou</div>`)
    // })
}



//evento de captura
function enviar() {
    var msg = $('#msg').val()
    var username = $('#username').val()
    filterXSS(msg);
    $('#msg').val("")

    if (msg != '') {
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

socket.emit('user', { username: username })
socket.on('user-msg', (data) => {
    $('#msgs').append(`<div class="alert alert-success m-2 " role="alert"><strong>${data.username}</strong> entrou</div>`)
})


function envmsg(event) {
    if (event.which == 13 || event.keyCode == 13) {

        enviar()
        return false;
    }
    $('#username').attr("disabled", true);
    return true;
};



function verificaName() {
    console.log("entrou aqui")
    let valueInput = $('#username').val();
    console.log(valueInput)
    if (valueInput === '') {
        window.location.href = "/";
    }
}
setTimeout(verificaName, 1000);

