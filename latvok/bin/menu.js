
var prevonload = window.onload;
window.onload = function () {
    if (prevonload) {
        prevonload();
    }
    document.getElementById("logo").addEventListener("click", openmenu);
    document.getElementById("pageconfig").addEventListener("mouseover", function () { cursoronelement = true; });
    document.getElementById("pageconfig").addEventListener("mouseout", function () { cursoronelement = false; });
    document.body.addEventListener("click", closemenu);
};

function openmenu () {
    document.getElementById("menu").style.display = "block";
    menuopen = true;
}

cursoronelement = false;
menuopen = false;
function closemenu () {
    if (!cursoronelement && menuopen) {
        document.getElementById("menu").style.display = "none";
        menuopen = false;
    }
}
