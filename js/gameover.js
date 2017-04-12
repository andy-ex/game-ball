function setWinner() {
    var winner = getQueryVariable('winner');
    if (document.getElementById('winner') && winner) {
        document.getElementById('winner').innerHTML = `${winner.toUpperCase()} PLAYER WIN`;
    }
}

setWinner();

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == 32) {
        window.location.href = "game.html";
        document.onkeydown = undefined;
    }
    return true;
}
document.getElementById('restart').onclick = function (e) {
    window.location.href = "game.html";
    document.onkeydown = undefined;
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}



