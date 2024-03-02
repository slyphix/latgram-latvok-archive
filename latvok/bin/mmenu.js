
var prevonload = window.onload;
window.onload = function () {
    if (prevonload) {
        prevonload();
    }
    document.getElementById("trigger").addEventListener("click", togglemenu, false);
    //document.getElementById("content").addEventListener("click", menuoff);
    document.getElementById("file").addEventListener("change", update, false);
    document.getElementById("pointer").addEventListener("click", fireclick, false);
    document.body.addEventListener("touchmove", deny, false);
    document.getElementById("content").addEventListener("touchstart", tstart, false);
    document.getElementById("content").addEventListener("touchmove", tmove, false);
    document.getElementById("content").addEventListener("touchend", tend, false);
    document.getElementById("overlay").addEventListener("touchstart", tstart, false);
    document.getElementById("overlay").addEventListener("touchmove", tmove, false);
    document.getElementById("overlay").addEventListener("touchend", tend, false);
};

touchevent = null;
function tstart (ev) {
    var menu = document.getElementById("menu");
    if (menu.className === "open") {
        touchevent = null;
        setmenustate(false);
    } else {
        var t = ev.touches[0];
        touchevent = {};
        touchevent.sx  = t.screenX;
        touchevent.sy  = t.screenY;
    }
}
function tmove (ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (touchevent) {
        var t = ev.touches[0];
        touchevent.ex  = t.screenX;
        touchevent.ey  = t.screenY;
    }
}
function tend () {
    if (touchevent) {
        var dx = touchevent.ex - touchevent.sx;
        var dy = touchevent.ey - touchevent.sy;
        if (dx > 60 && dy < 80 && dy > -80)
            setmenustate(true);
    }
}

function deny (event) {
    event.preventDefault();
    event.stopPropagation();
}

function fireclick () {
    document.getElementById("file").click();
}

function update () {
    document.getElementById("filenum").innerHTML = document.getElementById("file").files.length;
}

function togglemenu () {
    var menu = document.getElementById("menu");
    setmenustate(!(menu.className === "open"));
}

function setmenustate (on) {
    var menu = document.getElementById("menu");
    var menupush = document.getElementById("menupush");
    var trigger = document.getElementById("trigger");
    var button = document.getElementById("confirmbut");
    var cn = on ? "open" : "left";
    menu.className = cn;
    menupush.className = cn;
    trigger.className = cn;
    button.className = cn;
}

function menuoff () {
    var menu = document.getElementById("menu");
    if (menu.className === "open")
        setmenustate(false);
}
