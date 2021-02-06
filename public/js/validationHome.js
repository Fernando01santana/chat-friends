
$('#msg').hide()
function up() {
    let username = $('#username').val()
    const script = "script";
    const state = username.indexOf(script)
    console.log(state)
    if (state === 1 || username === '') {
        window.location.href = "/";
        $('#msg').show()
    } else {
        $('#env').submit()
    }
}
