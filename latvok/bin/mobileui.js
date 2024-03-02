
function MUIManager () {
    UIManager.call(this);
    
    this.toggleoverlay = function (on) {
        document.getElementById("confirmbuttext").innerHTML = (on) ? "Weiter" : "Best&auml;tigen";
        document.getElementById("overlay").className = (on) ? "active" : "";
        document.getElementById("fade").style.opacity = (on) ? 1 : 0;
    };
    this.getSelectedId = function (name) {
        return document.getElementsByName(name)[0].selectedIndex - 1 || 0;
    };
    this.setAuswahl = function (array) {
        var option;
        document.getElementById("wortauswahl").innerHTML = "";
        option = document.createElement("option");
        option.innerHTML = "-";
        document.getElementById("wortauswahl").appendChild(option);
        for (var i = 0; i < array.length; i++) {
            option = document.createElement("option");
            option.innerHTML = array[i].bed;
            document.getElementById("wortauswahl").appendChild(option);
        }
    };
    this.uncheckAll = function () {
        var auswahl = document.getElementsByClassName("auswahl");
        for (var i = 0; i < auswahl.length; i++)
            auswahl[i].selectedIndex = 0;
    };
    this.setUserconfig = function (id) {
        // 0 nichts - 1 substantive - 2 adjektive - 3 verben
        document.getElementById("modus").style.display = (id === 3) ? "" : "none";
        document.getElementById("tempus").style.display = (id === 3) ? "" : "none";
        document.getElementById("kasus").style.display = (id === 1 || id === 2) ? "" : "none";
        document.getElementById("numerus").style.display = (id !== 0) ? "" : "none";
        document.getElementById("gv").style.display = (id === 3) ? "" : "none";
        document.getElementById("person").style.display = (id === 3) ? "" : "none";
        document.getElementById("genus").style.display = (id === 2) ? "" : "none";
        document.getElementById("steigerung").style.display = (id === 2) ? "" : "none";
    };
}
systemDefaultUIManager = MUIManager;
