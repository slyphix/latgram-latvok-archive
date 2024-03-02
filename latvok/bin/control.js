
selected = new Array();
selectedid = 0;
flagid = 0;
askforms = false;
formok = false;
transok = false;
resout = false;
wort = "";

function load () {
    gen();
}

function loadfile () {
    var requester = new XMLHttpRequest();
    requester.onreadystatechange=function() {
        if (requester.readyState === 4 && requester.status === 200) {
            var lines = requester.responseText.split("\n");
            parse(requester.responseText);
        }
    };
    requester.open("GET", "lib/" + document.getElementById("fileselect").value, true);
    requester.send();
}

function parse (file) {
    var lines = file.split("\n");
    var validflags = new Array("o", "s", "a", "v");
    var validadj = new Array("ao", "k1", "k2");
    var validkonj = new Array("a", "e", "i", "k", "ki");
    var validdek = new Array("a", "e", "o", "on", "u", "k", "ki", "kn", "kin");
    try {
        for (var i = 0; i < lines.length; i++) {
            var cols = lines[i].split(";");
            cols[0] = cols[0].replace(/ /g, "");
            cols[1] = cols[1].replace(/ /g, "");
            var flag = cols[0].substr(0, 1).toLowerCase();
            if (validflags.indexOf(flag) !== -1)
                throw "Ungültiges Flag!";
            
            var stammformen = cols[1].split(",");
            var konjdek = substring(1, cols[0].length);
            var next = vocarray[validflags.indexOf(flag)].length;
            switch (flag) {
                case "o":
                    vocarray[0][next][0] = cols[1];
                    vocarray[0][next][1] = cols[2];
                    break;
                case "s":
                    if (validdek.indexOf(konjdek) !== -1)
                        throw "Ungültige Deklination!";
                    if (stammformen.length !== 2)
                        throw "Fehler bei der Stammformenerkennung!";
                    vocarray[1][next][0] = stammformen[0];
                    vocarray[1][next][1] = cols[2];
                    vocarray[1][next][2] = new Array(konjdek, stammformen[1]);
                    break;
                case "a":
                    if (validadj.indexOf(konjdek) !== -1)
                        throw "Ungültige Adjektivdeklinationsklasse!";
                    if (stammformen.length !== 4)
                        throw "Fehler bei der Stammformenerkennung!";
                    vocarray[2][next][0] = stammformen[0];
                    vocarray[2][next][1] = cols[2];
                    vocarray[2][next][2] = new Array(konjdek, stammformen[1], stammformen[2], stammformen[3]);
                    break;
                case "v":
                    if (validkonj.indexOf(konjdek) !== -1)
                        throw "Ungültige Konjugation!";
                    if (stammformen.length !== 4)
                        throw "Fehler bei der Stammformenerkennung!";
                    vocarray[3][next][0] = stammformen[0];
                    vocarray[3][next][1] = cols[2];
                    vocarray[3][next][2] = new Array(konjdek, stammformen[1], stammformen[2], stammformen[3]);
                    break;
            }
        }
        document.getElementById("selmsg").innerHTML = "Erfolgreich gewählt!";
        document.getElementById("selmsg").style.color = "#4f4";
    } catch (e) {
        document.getElementById("selmsg").innerHTML = e + " (Zeile " + (i+1) + ")";
        document.getElementById("selmsg").style.color = "#f44";
    }
}

function upload () {
    var client = new XMLHttpRequest();
    var file = document.getElementById("uploadselect");
     
    var formData = new FormData();
    formData.append("upload", file.files[0]);

    client.open("post", "lib/", true);
    client.setRequestHeader("Content-Type", "multipart/form-data");
    client.send(formData);
}

function gen () {
    askforms = document.getElementById("formen").checked;
    document.getElementById("form").style.display = (askforms) ? "inline" : "none";
    flagid = Math.floor(Math.random() * 4);
    var pool = vocarray[flagid].slice(0);
    for (var i = 0; i < 5; i++) {
        var rdmid = Math.floor(Math.random() * 1000) % pool.length;
        selected[i] = pool[rdmid];
        pool.splice(rdmid, 1);
    }
    selectedid = Math.floor(Math.random() * 5);
    wort = selected[selectedid][0];
    
    sub("gen");
    ver("gen");
    adj("gen");
        
    document.getElementById("wort").innerHTML = wort;
    for (var i = 0; i < 5; i++) {
        document.getElementById("trans").getElementsByTagName("label")[i].innerHTML = selected[i][1];
    }
    for (var i = 0; i < document.getElementById("interface").getElementsByTagName("input").length; i++) {
        document.getElementById("interface").getElementsByTagName("input")[i].checked = false;
    }
    userconfig((askforms) ? flagid : 0);
}

function check() {
    document.getElementById("confirmbut").innerHTML = (resout) ? "Best&auml;tigen" : "Weiter";
    document.getElementById("overlay").style.left = (resout) ? "-100%" : 0;
    resout = !resout;
    if (resout) {
        // übersetzung
        document.getElementById("showforms").style.visibility = (!askforms || flagid === 0) ? "hidden" : "visible";
        document.getElementsByClassName("res")[0].getElementsByTagName("b")[0].innerHTML = selected[selectedid][0];
        document.getElementsByClassName("res")[0].getElementsByTagName("b")[1].innerHTML = selected[selectedid][1];
        document.getElementsByClassName("res")[1].getElementsByTagName("b")[0].innerHTML = wort;
        
        sub("check");
        ver("check");
        adj("check");
        
        // übersetzung richtig
        var transok = false;
            if (document.getElementsByName("trans")[selectedid].checked)
                transok = true;
        
        if (transok) {
            document.getElementById("transrf").innerHTML = "richtig";
            document.getElementById("transrf").className = "richtig";
        } else {
            document.getElementById("transrf").innerHTML = "falsch";
            document.getElementById("transrf").className = "falsch";            
        }
        // form richtig
        if (formok) {
            document.getElementById("formrf").innerHTML = "richtig";
            document.getElementById("formrf").className = "richtig";
        } else {
            document.getElementById("formrf").innerHTML = "falsch";
            document.getElementById("formrf").className = "falsch";            
        }
    } else {
        gen();
    }
}

function sub (ac) {
    if (!(askforms && flagid === 1))
        return;
    if (ac === "gen") {
        kasus = Math.floor(Math.random() * 5);
        numerus =  Math.floor(Math.random() * 2);
        if (numerus === 0 && (kasus === 0 || (kasus === 3 && selected[selectedid][2][2])))
            return;
        
        var dekl = selected[selectedid][2][0];
        wort = selected[selectedid][2][1] + subend[dekl][numerus][kasus];
    } else {
        document.getElementById("potforms").innerHTML = "";
        var dekl = selected[selectedid][2][0];
        var testwort;
        var gefunden = false;
        
        formok = false;
        for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 5; j++) {
            testwort = (i === 0 && (j === 0 || (j === 3 && (selected[selectedid][2][0] === "kn" || selected[selectedid][2][0] === "kin")))) ? selected[selectedid][0] : (selected[selectedid][2][1] + subend[dekl][i][j]);

            if (testwort === wort) {
                if (document.getElementsByName("num")[i].checked && document.getElementsByName("kasus")[j].checked) {
                    formok = true;
                    gefunden = true;
                }
                document.getElementById("potforms").innerHTML +=
                        "<li" + ((gefunden) ? (" class=\"richtig\"") : "") + ">"
                        + kasusliste[j] + " " + numerusliste[i] + "</li>";
                gefunden = false;
            }
        }
        }
    }
}
function adj (ac) {
    if (!(askforms && flagid === 2))
        return;
    if (ac === "gen") {
        kasus = Math.floor(Math.random() * 5);
        numerus =  Math.floor(Math.random() * 2);
        genus =  Math.floor(Math.random() * 3);
        steigerung =  Math.floor(Math.random() * 3);

        var dekl = selected[selectedid][2][0];
        wort = selected[selectedid][2][steigerung + 1] + adjend[dekl][genus][steigerung][numerus][kasus];
        if (steigerung === 0)
            wort.replace(/nts/g, "ns");
    } else {
        document.getElementById("potforms").innerHTML = "";
        var dekl = selected[selectedid][2][0];
        var testwort;
        var gefunden = false;
        
        formok = false;
        for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 2; k++) {
        for (var l = 0; l < 5; l++) {
            testwort = (selected[selectedid][2][j + 1] + adjend[dekl][i][j][k][l]);
            if (j === 0)
                testwort.replace(/nts/g, "ns");
            
            if (testwort === wort) {
                if (document.getElementsByName("gen")[i].checked && document.getElementsByName("steigerung")[j].checked
                        && document.getElementsByName("num")[k].checked && document.getElementsByName("kasus")[l].checked) {
                    formok = true;
                    gefunden = true;
                }
                document.getElementById("potforms").innerHTML +=
                        "<li" + ((gefunden) ? (" class=\"richtig\"") : "") + ">"
                        + kasusliste[l] + " " + numerusliste[k] + " " + genusliste[i] + " " + steigerungliste[j] + "</li>";
                gefunden = false;
            }
        }
        }
        }
        }
    }
}
function ver (ac) {
    if (!(askforms && flagid === 3))
        return;
    if (ac === "gen") {
        person = Math.floor(Math.random() * 3);
        numerus = Math.floor(Math.random() * 2);
        tempus = Math.floor(Math.random() * 5);
        gv = Math.floor(Math.random() * 2);
        modus = (tempus !== 0) ? Math.floor(Math.random() * 2) : 0;
        
        var konj = selected[selectedid][2][0];
        wort = selected[selectedid][2][giveform(tempus, gv)] + verbend[konj][modus][gv][tempus][numerus][person];
    } else {
        document.getElementById("potforms").innerHTML = "";
        var konj = selected[selectedid][2][0];
        var testwort;
        var gefunden = false;
        
        formok = false;
        for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
        for (var k = 0; k < 5; k++) {
        for (var l = 0; l < 2; l++) {
        for (var m = 0; m < 3; m++) {
            if (!(i === 1 && k === 0))
                testwort = (selected[selectedid][2][giveform(k, j)] + verbend[konj][i][j][k][l][m]);
            else
                textwort = "";

            if (testwort === wort) {
                if (document.getElementsByName("modus")[i].checked && document.getElementsByName("gv")[j].checked
                        && document.getElementsByName("zeit")[k].checked && document.getElementsByName("num")[l].checked
                        && document.getElementsByName("pers")[m].checked) {
                    gefunden = true;
                    formok = true;
                }
                document.getElementById("potforms").innerHTML +=
                        "<li" + ((gefunden) ? (" class=\"richtig\"") : "")
                        + ">" + personliste[m] + " " + numerusliste[l] + " "
                        + modusliste[i] + " " + zeitliste[k] + " " + gvliste[j] + "</li>";

                gefunden = false;
            }
        }
        }
        }
        }
        }
    }
}
function giveform (tempus, gv) {
    if (tempus >= 3) {
        if (gv === 1)
            return 3;
        return 2;
    }
    return 1;
}

function userconfig (id) {
    // 0 nichts - 1 substantive - 2 adjektive - 3 verben
    document.getElementById("modus").style.display = (id === 3) ? "table-cell" : "none";
    document.getElementById("tempus").style.display = (id === 3) ? "table-cell" : "none";
    document.getElementById("kasus").style.display = (id === 1 || id === 2) ? "table-cell" : "none";
    document.getElementById("numerus").style.display = (id !== 0) ? "table-cell" : "none";
    document.getElementById("gv").style.display = (id === 3) ? "table-cell" : "none";
    document.getElementById("person").style.display = (id === 3) ? "table-cell" : "none";
    document.getElementById("genus").style.display = (id === 2) ? "table-cell" : "none";
    document.getElementById("steigerung").style.display = (id === 2) ? "table-cell" : "none";
}