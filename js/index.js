document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == 32) {
        window.location.href = "game.html";
        document.onkeydown = undefined;
    }
    return true;
}
document.getElementById('start').onclick = function (e) {
    window.location.href = "game.html";
    document.onkeydown = undefined;
}