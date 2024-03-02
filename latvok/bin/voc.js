
window.onload = function () {
    document.getElementById("confirm").addEventListener("click", confirmupload, false);
    document.getElementById("confirmbut").addEventListener("click", buttonclick, false);
    document.getElementById("formen").addEventListener("change", function () {getUIManager().showInfoF(true);}, false);
    document.getElementById("wichtung").addEventListener("change", function () {getUIManager().showInfoW(true);}, false);
    document.getElementById("file").addEventListener("change", filechange, false);
    gen();
};


function confirmupload () {
    var ui = getUIManager();
    fileupload = ui.getFiles();
    if (fileupload.files.length === 0) { ui.setFileFeedback("Keine Dateien übermittelt", "-", "-"); return; };
    dummyarray = new Array();
    filesloaded = new Array();
    readfile = 0;
    parse();
}

function filechange () {
    var ui = getUIManager();
    ui.setFileSelectFeedback();
}

function parsefile (filecontent) {
    var ui = getUIManager();
    var validtypes = /b|w|s|a|v/;
    var validrules = {
        a: /ao|k1|k2|k3|!/,
        v: /a|e\b|i\b|ki?|ire|esse|ferre|!/,
        s: /a|e|o|u|k|!/
    };
    var validspecials = {
        a: /p|k/,
        v: /d|a|p|x/,
        s: /i|n|s|p/
    };
    
    if (filecontent === "lvfr_error") { ui.setFileFeedback("Fehler beim Lesen der Datei", filename, "-"); return; }
    if (filecontent === "") { ui.setFileFeedback("Leere Datei", filename, "-"); return; }
    
    var str; // alle ascii < 32 raus
    for (var i = 0; i < 32; i++) {
        str = String.fromCharCode(i);
        if (str !== "\n")
            filecontent = filecontent.replace(str, "");
    }
    
    var lines = filecontent.split("\n");
    
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].search(/[A-Za-z0-9]/) !== -1 && lines[i].substring(0, 1) !== "#") {
            
            if (!lines[i].match(/^[^\|]+?\|[^\|]+?\|[^\|]+?$/gi)) { ui.setFileFeedback("Syntaxfehler", filename, i+1); return; };
            if (lines[i].match(/\|/g).length !== 2) { ui.setFileFeedback("Strukturfehler", filename, i+1); return; };
            var line = lines[i].split("|");
            
            var flags = line[0].toLowerCase().replace(/\s+/g, '');
            
                flags = flags.split("/");
                var type = flags[0];
                if (type.length === 0) { ui.setFileFeedback("Keine Wortart übermittelt", filename, i+1); return; };
                if (type.replace(validtypes, "").length > 0) { ui.setFileFeedback("Ungültiges Flag", filename, i+1); return; };
          
            var forms = line[1];
            
                if (forms.replace(/\s+/g, '').length === 0) { ui.setFileFeedback("Keine Formen übermittelt", filename, i+1); return; };
                if (type !== "b" && type !== "w")
                    forms = forms.replace(/\s+/g, '');
                forms = forms.split(",");
                var base = forms[0];

            var trans = line[2];

            var doppelt = false;
            for (var j = 0; j < dummyarray.length; j++)
                if (dummyarray[j].inf === base) {
                    doppelt = true;
                    break;
                }

            if (!doppelt) {
                if (type !== "b" && type !== "w") {
                    var rule = flags[1];
                    if (rule.length === 0) { ui.setFileFeedback("Keine Bildungsregel übermittelt", filename, i+1); return; };
                    if (rule.replace(validrules[type], "").length > 0) { ui.setFileFeedback("Ungültige Bildungsregel", filename, i+1); return; };

                    var specials = flags[2] || "";
                    var pattern = validspecials[type];
                    for (var j = 0; j < specials.length; j++) {
                        if (specials.charAt(j).search(pattern) === -1) { ui.setFileFeedback("Ungültiges Zusatzzeichen", filename, i+1); return; };
                    }
                    forms.shift();
                } else if (type === "b") {
                    dummyarray.push(new Wort(base, trans));
                } else {
                    dummyarray.push(new Wendung(base, trans));
                }

                switch (type) {
                    case "s":
                        var pl = specials.search(/p/) !== -1;
                        var sg = specials.search(/s/) !== -1;
                        var genpli = specials.search(/i/) !== -1;
                        if (pl && sg) { ui.setFileFeedback("Konflikt 'Nur Singular' - 'Nur Plural'", filename, i+1); return; };
                        
                        if (rule !== "!") {
                            var remarr = (pl) ? (genpli) ? [3] : endrmspl[rule] : endrms[rule];
                            forms = endremover(forms, remarr, 1);
                        }
                        dummyarray.push(new Substantiv(base, trans, rule, forms, specials));
                        break;
                    case "a":
                        if (rule !== "!")
                            forms = endremover(forms, endrma[rule], 3);
                        dummyarray.push(new Adjektiv(base, trans, rule, forms, specials));
                        break;
                    case "v":
                        var dep = specials.search(/d/) !== -1;
                        var nurakt = specials.search(/a/) !== -1;
                        var pf = specials.search(/p/) !== -1;
                        var ps = specials.search(/x/) !== -1;
                        if (dep && nurakt) { ui.setFileFeedback("Konflikt 'Deponens' - 'Nur Aktiv'", filename, i+1); return; };
                        if (ps && pf) { ui.setFileFeedback("Konflikt 'Kein Perfekt' - 'Nur Perfekt'", filename, i+1); return; };
                        if (dep && rule === "esse") { ui.setFileFeedback("'esse' ist kein Deponens", filename, i+1); return; };
                        if (dep && rule === "ire") { ui.setFileFeedback("'ire' ist kein Deponens", filename, i+1); return; };
                        
                        if (rule !== "!") {
                            var remarr = (dep) ? (rule === "ki") ? [3, 5] : [2, 5] : (pf) ? [1, 2] : endrmv[rule];
                            forms = endremover(forms, remarr, (dep || pf) ? 2 : 3);
                        }
                        dummyarray.push(new Verb(base, trans, rule, forms, specials));
                        break;
                    default:
                        break;
                }
            }
        }
    }
    
    filesloaded.push(filename);
    readfile++;
    parse();
}

function endremover (formarray, rmarray, iterations) {
    var rarray = new Array();
    for (var i = 0; i < Math.min(formarray.length, iterations); i++) {
        rarray.push(formarray[i].substring(0, formarray[i].length - rmarray[i]));
    }
    return rarray;
}

function parse () {
    var ui = getUIManager();
        
    if (readfile < fileupload.files.length) {
        var file = fileupload.files[readfile];
        filename = file.name;
        
        if (filename.search(/\.csv$/g) === -1) { ui.setFileFeedback("Keine csv-Datei", filename, "-"); return; }

        if (window.FileReader && window.File && window.FileList && window.Blob) {
            var reader = new FileReader();
            reader.onloadend = function (r) {
                parsefile(r.target.result);
            };
            try {
                reader.readAsBinaryString(file);
            } catch (e) {
                reader.onloadend = function (r) {
                    var binaryString = '', bytes = new Uint8Array(r.target.result), length = bytes.length;
                    for (var i = 0; i < length; i++) {
                      binaryString += String.fromCharCode(bytes[i]);
                    }
                    parsefile(binaryString);
                    //parsefile(String.fromCharCode.apply(null, new Uint8Array(r.target.result)));
                };
                reader.readAsArrayBuffer(file);
            }
        } else {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                    parsefile(xmlhttp.responseText);
                }
            };
            var formData = new FormData();
            formData.append("file", file);
            
            xmlhttp.open("POST", "bin/latvokfilereader.php", true);
            xmlhttp.send(formData);
        }
    } else {
        if (dummyarray.length < 1) { ui.setFileFeedback("0 Wörter gelesen", "-", "-"); return; }
        vocarray = new Array();
        vocarray = dummyarray.slice();
        vocarrayrated = null;
        ui.setPositiveFileFeedback(dummyarray.length);
        ui.setFileList(filesloaded, fileupload.files.length);
        ui.resetFiles();
        gen();
    }
}

vocarrayrated = null;

function gen () {
    
    var ui = getUIManager();

    ratewords = ui.getRateCheckbox();
    if (ratewords) {
        if (!vocarrayrated) {
            vocarrayrated = new Array();
            for (var i = 0; i < vocarray.length; i++) {
                var ratedwort = {};
                ratedwort.wort = vocarray[i];
                ratedwort.wert = 2;
                vocarrayrated[i] = ratedwort;
            }
        }
               
        var gesamtwert = 0;
        for (i = 0; i < vocarrayrated.length; i++)
            gesamtwert += vocarrayrated[i].wert;
        
        var p = Math.random();
        var id = -1, wert = 0;
        do {
            id++;
            wert += vocarrayrated[id].wert;
        } while (id < vocarrayrated.length && wert/gesamtwert < p);

        var wort = vocarrayrated[id].wort;

        var sameconfig = new Array();
        for (var i = 0; i < vocarrayrated.length; i++)
            if(vocarrayrated[i].wort.constructor === wort.constructor && i !== id)
                sameconfig.push(vocarrayrated[i].wort);

        wortid = id;
        
    } else {
        var id = Math.floor(Math.random() * vocarray.length);
        var wort = vocarray[id];
        var sameconfig = new Array();
        for (var i = 0; i < vocarray.length; i++) {
            if(vocarray[i].constructor === wort.constructor && i !== id)
                sameconfig.push(vocarray[i]);
        }
    }
    
    var rnd, len = sameconfig.length;
    var splits, splitc, sfs, sfc;
    var reduchecked = [];
    var checklist = [wort];
    var accept;
    
    for (var i = 0; i < len; i++) {
        rnd = Math.floor(Math.random() * sameconfig.length);
        accept = true;
        
        for (var j = 0; j < checklist.length; j++) {
            splits = sameconfig[rnd].bed.split(/[^a-z0-9äöüß]+/i);
            splitc = checklist[j].bed.split(/[^a-z0-9äöüß]+/i);
            
            for (var k = 0; k < splits.length; k++)
                for (var l = 0; l < splitc.length; l++)
                    if (splits[k] === splitc[l]) {
                        splits.splice(k, 1);
                        splitc.splice(l, 1);
                    }
            if (!(splits.length > 0 && splitc.length > 0))
                accept = false;
                        
            if (wort.configuration !== 0) {
                sfs = sameconfig[rnd].sf;
                sfc = checklist[j].sf;
                
                if (wort.constructor !== Substantiv) {
                    for (var n = 0; n < Math.min(sfc.length, sfs.length); n++)
                        if (sfs[n] === sfc[n])
                            accept = false;
                } else {
                    if (sfs === sfc)
                        accept = false;
                }
            }
        }
        if (accept) {
            reduchecked.push(sameconfig[rnd]);
            checklist.push(sameconfig[rnd]);
        }
        sameconfig.splice(rnd, 1);
    }
    
    sameconfig = reduchecked;
    // preselect - ^ hier ist die redundanzprüfung (ähnliche bedeutung)
    
    var rnd;
    var preselected = new Array();
    var len = (sameconfig.length > 4) ? 4 : sameconfig.length;
    for (var i = 0; i < len; i++) {
        rnd = Math.floor(Math.random() * sameconfig.length);
        preselected.push(sameconfig[rnd]);
        sameconfig.splice(rnd, 1);
    }

    selectedid = Math.floor(Math.random() * (preselected.length + 1));
    preselected.splice(selectedid, 0, wort);
    selected = preselected;
        
    askforms = ui.getFormCheckbox() && wort.configuration !== 0;
    
    var form = (askforms) ? wort.gen() : wort.inf;
    
    ui.showInfo(false);
    ui.setWort(form);
    ui.uncheckAll();
    ui.toggleforms(askforms);
    ui.setAuswahl(selected);
    ui.setUserconfig((askforms) ? wort.configuration : 0);
}

function chk () {
    var ui = getUIManager();
    
    var input = ui.getSelectedIdAsObject(new FormIdList());
    
    var transok = (ui.getSelectedId("trans") === selectedid);
    if (askforms)
        var formok = selected[selectedid].chk(input);
    
    if (ratewords) {
        var v = vocarrayrated[wortid].wert;
        if (v > 1 && v < 8)
            v *= (transok) ? 2 : 0.5;
        vocarrayrated[wortid].wert = v;
    }
    
    if (askforms)
        ui.setFormWertung(selected[selectedid]);
    ui.setWertung(selected[selectedid]);
    ui.setCorrect(transok);
    ui.setFormCorrect(formok);
    ui.toggleoverlayforms(askforms && selected[selectedid].configuration !== 0);
}

showres = false;
function buttonclick () {
    showres = !showres;

    var ui = getUIManager();
    ui.toggleoverlay(showres);
    
    if (showres) chk(); else gen();
}

function Wort (inf, bed) {
    
    this.inf = inf;
    this.bed = bed;
    this.wort = inf;
    this.configuration = 0;
    
    this.gen = function () {
        return this.wort;
    };
    
    this.chk = function () {
        return true;
    };
}

function Wendung (inf, bed) {
    Wort.call(this, inf, bed);
}

function Substantiv (inf, bed, regel, sf, special) {

    Wort.call(this, inf, bed);
    this.configuration = (regel === "!") ? 0 : 1;
    this.regel = regel;
    this.genus = null;
    if(sf instanceof Array) {
        this.sf = sf[0];
        this.genus = sf[1];
    } else {
        this.sf = sf;
    }
    
    special = special || "";
    this.n = special.search(/n/) !== -1;
    this.i = special.search(/i/) !== -1;
    this.s = special.search(/s/) !== -1;
    this.p = special.search(/p/) !== -1;
    
    this.form = function (kasus, numerus) {
        if (this.regel === "!")
            return "-";
        var form;
        if (numerus === 0 && kasus === 0) {
            form = this.inf;
        } else if (this.n && (kasus === 0 || kasus === 3)) {
            if (numerus === 1) {
                //form = this.sf + ((this.regel === "i") ? "ia" : "a");
                form = this.sf + "a";
            } else {
                form = this.inf;
            }
        } else if (numerus === 1 && kasus === 1 && this.regel === "k" && this.i) {
        /*} else if (numerus === 1 && kasus === 1 && ((this.regel === "k" && this.i) || (this.regel === "i"))) {*/
            form = this.sf + "ium";
        } else {
            form = this.sf + subend[this.regel][numerus][kasus];
        }
        return form;
    };
    
    this.gen = function () {
        this.numerus = (this.p) ? 1 : (this.s) ? 0 : Math.floor(Math.random() * 2);
        this.kasus = Math.floor(Math.random() * 5);

        this.wort = this.form(this.kasus, this.numerus);

        return this.wort;
    };
    
    this.chk = function (input) {
        var testwort;
        var formok = false;
        
        this.formsarray = new Array();
        var index = 0;
        var start = (this.p) ? 1 : 0;
        var stop = (this.s) ? 1 : 2;
        for (var i = start; i < stop; i++) {
        for (var j = 0; j < 5; j++) {
            testwort = this.form(j, i);
            if (testwort === this.wort) {
                var isuserinput = (input.num === i && input.kasus === j);
                this.formsarray[index] = {};
                this.formsarray[index].text = kasusliste[j] + " " + numerusliste[i];
                this.formsarray[index].found = isuserinput;
                index++;
                if (isuserinput)
                    formok = true;
            }
        }
        }
        return formok;
    };
}

function Adjektiv (inf, bed, regel, sf, special) {

    Wort.call(this, inf, bed);
    this.configuration = (regel === "!") ? 0 : 2;
    this.regel = regel;
    this.sf = sf;
        
    special = special || "";
    this.nurpos = special.search(/p/) !== -1;
    this.k = special.search(/k/) !== -1;
        
    this.form = function (kasus, numerus, genus, steigerung) {
        if (this.regel === "!")
            return "-";
        var form;        
        if (steigerung === 0) {
            if ((genus === 0 && numerus === 0 && kasus === 0) || (this.regel === "k1" && numerus === 0 && (kasus === 0 || (kasus === 3 && genus === 2))))
                form = this.inf;
            else if (this.regel === "k1" && this.k && adjk1e[genus][numerus][kasus])
                form = this.sf[steigerung] + adjk1e[genus][numerus][kasus];
            else
                form = this.sf[steigerung] + adjendpos[this.regel][genus][numerus][kasus];
        } else {
            form = this.sf[steigerung] + adjend[steigerung][genus][numerus][kasus];
        }
        return form;
    };
        
    this.gen = function () {
        this.numerus = Math.floor(Math.random() * 2);
        this.kasus = Math.floor(Math.random() * 5);
        this.genus = Math.floor(Math.random() * 3);
        this.steigerung = (this.nurpos) ? 0 : Math.floor(Math.random() * 3);

        this.wort = this.form(this.kasus, this.numerus, this.genus, this.steigerung);
        
        return this.wort;
    };
    
    this.chk = function (input) {
        var testwort;
        var formok = false;
        
        this.formsarray = new Array();
        var index = 0;
        for (var j = 0; j < 3; j++) {
        for (var k = 0; k < 2; k++) {
        for (var l = 0; l < 5; l++) {
        for (var i = 0; i < 3; i++) {
            testwort = this.form(l, k, i, j);
            if (testwort === this.wort) {
                var isuserinput = (input.num === k && input.kasus === l && input.steigerung === j && input.gen === i);
                this.formsarray[index] = {};
                this.formsarray[index].text = kasusliste[l] + " " + numerusliste[k] + " " + steigerungliste[j] + " " + genusliste[i];
                this.formsarray[index].found = isuserinput;
                index++;
                if (isuserinput)
                    formok = true;
            }
        }
        }
        }
        }
        return formok;
    };
}

function Verb (inf, bed, konj, sf, special) {

    Wort.call(this, inf, bed);
    this.configuration = (konj === "!") ? 0 : 3;
    this.konj = konj;
    
    special = special || "";
    this.nurpf = special.search(/p/) !== -1;
    this.notpf = special.search(/x/) !== -1;
    this.dep = special.search(/d/) !== -1;
    this.nurakt = special.search(/a/) !== -1 || konj === "ire" || konj === "esse";
    
    if (this.dep) {
        this.sf = new Array(sf[0], null, sf[1]);
    } else if (this.nurpf) {
        this.sf = new Array(null, sf[0], sf[1]);
    } else {
        this.sf = sf;
    }
    
    this.form = function (modus, gv, tempus, numerus, person) {
        if (this.konj === "!")
            return "-";
        var form;
        if (modus === 1 && tempus === 0) {
            form = "";
        } else {
            form = this.getSf(gv, tempus) + ((tempus >= 3) ? verbendpf[modus][gv][tempus][numerus][person] : verbend[konj][modus][gv][tempus][numerus][person]);
        }
        return form;
    };
    
    this.gen = function () {
        this.person = Math.floor(Math.random() * 3);
        this.numerus = Math.floor(Math.random() * 2);
        this.tempus = (this.notpf) ? Math.floor(Math.random() * 3) : (this.nurpf) ? (Math.floor(Math.random() * 2) + 3) : Math.floor(Math.random() * 5);
        this.gv = (this.dep) ? 1 : (this.nurakt) ? 0 : Math.floor(Math.random() * 2);
        this.modus = (this.tempus !== 0) ? Math.floor(Math.random() * 2) : 0;
                
        this.wort = this.form(this.modus, this.gv, this.tempus, this.numerus, this.person);

        return this.wort;
    };
    
    this.getSf = function (gv, temp) {
        return (temp >= 3) ? ((gv === 0) ? this.sf[1] : this.sf[2]) : this.sf[0];
    };
    
    this.chk = function (input) {
        var testwort;
        var formok = false;
        
        this.formsarray = new Array();
        var index = 0;
        var startgv = (this.dep) ? 1 : 0;
        var stopgv = (this.nurakt) ? 1 : 2;
        var startt = (this.nurpf) ? 3 : 0;
        var stopt = (this.notpf) ? 3 : 5;
        for (var i = 0; i < 2; i++) {
        for (var j = startgv; j < stopgv; j++) {
        for (var k = startt; k < stopt; k++) {
        for (var l = 0; l < 2; l++) {
        for (var m = 0; m < 3; m++) {
            testwort = this.form(i, j, k, l, m);
            if (testwort === this.wort) {
                var isuserinput = (input.pers === m && input.num === l && input.modus === i && input.zeit === k && input.gv === j);
                this.formsarray[index] = {};
                this.formsarray[index].text = personliste[m] + " " + numerusliste[l] + " " + modusliste[i] + " " +
                                                 zeitliste[k] + " " + gvliste[j] + (this.dep ? " (Deponens)" : "");
                this.formsarray[index].found = isuserinput;
                index++;
                if (isuserinput)
                    formok = true;
            }
        }
        }
        }
        }
        }
        return formok;
    };
}

function getUIManager () {
    return new systemDefaultUIManager();
}

function FormIdList () {
    this.kasus = "";
    this.num = "";
    this.gen = "";
    this.steigerung = "";
    this.pers = "";
    this.zeit = "";
    this.modus = "";
    this.gv = "";
}

function UIManager () {
    
    this.getFormCheckbox = function () {
        return document.getElementById("formen").checked;
    };
    this.getRateCheckbox = function () {
        return document.getElementById("wichtung").checked;
    };
    this.showInfo = function (bool) {
        this.showInfoF(bool);
        this.showInfoW(bool);
    };
    this.showInfoF = function (bool) {
        document.getElementById("infof").style.visibility = (bool) ? "visible" : "hidden";
    };
    this.showInfoW = function (bool) {
        document.getElementById("infow").style.visibility = (bool) ? "visible" : "hidden";
    };
    this.escape = function (string) {
        return string.replace(/ä/g, "&auml;").replace(/ö/g, "&ouml;").replace(/ü/g, "&uuml;").replace(/ß/g, "&szlig;");
    };
    this.getFiles = function () {
        return document.getElementById("file");
    };
    this.resetFiles = function () {
        document.getElementById("file").value = "";
    };
    this.toggleoverlay = function (on) {
        document.getElementById("confirmbuttext").innerHTML = (on) ? "Weiter" : "Best&auml;tigen";
        /*document.getElementById("overlay").style.left = (on) ? "0" : "-120%";*/
        document.getElementById("overlay").className = (on) ? "active" : "";
        document.getElementById("fade").style.opacity = (on) ? 1 : 0;
    };
    this.toggleforms = function (on) {
        document.getElementById("form").style.display = (on) ? "inline" : "none";
    };
    this.toggleoverlayforms = function (on) {
        document.getElementById("showforms").style.visibility = (on) ? "visible" : "hidden";
    };
    this.getSelectedId = function (name) {
        for (var i = 0; i < document.getElementsByName(name).length; i++)
            if (document.getElementsByName(name)[i].checked)
                return i;
        return false;
    };
    this.getSelectedIdAsObject = function (obj) {
        for (var prop in obj)
            obj[prop] = this.getSelectedId(prop);
        return obj;
    };
    this.shorten = function (str) {
        var len = str.length;
        if (len > 21)
            str = str.substring(0, 10) + "..." + str.substring(len-8, len);
        return str;
    };
    this.setFileFeedback = function (msg, file, line) {
        document.getElementById("filefeed").style.color = "#f66";
        document.getElementById("errline").innerHTML = this.escape(msg);
        document.getElementById("locationline").innerHTML = "Datei: " + this.shorten(file) + ", Zeile: " + line;
    };
    this.setPositiveFileFeedback = function (num) {
        document.getElementById("filefeed").style.color = "#4f4";
        document.getElementById("errline").innerHTML = "Dateien geladen";
        document.getElementById("locationline").innerHTML = (num) ? (num + " Wörter insgesamt") : "";
    };
    this.setFileSelectFeedback = function () {
        document.getElementById("filefeed").style.color = "#fa4";
        document.getElementById("errline").innerHTML = "Dateieingabe mit Klick";
        document.getElementById("locationline").innerHTML = "auf '&#10003;' bestätigen";
    };
    this.setFileList = function (filelist, num) {
        document.getElementById("selectedfiles").innerHTML = "";
        document.getElementById("selectedfiles").innerHTML += "<option>" + num + " Dateien insgesamt</option>";
        for (var i = 0; i < filelist.length; i++) {
            document.getElementById("selectedfiles").innerHTML += 
                    "<option>  " + filelist[i] + "</option>";
        }
    };
    this.setCorrect = function (ok) {
        document.getElementById("transrf").innerHTML = (ok) ? "richtig" : "falsch";
        document.getElementById("transrf").className = (ok) ? "richtig" : "falsch";
    };
    this.setFormCorrect = function (ok) {
        document.getElementById("formrf").innerHTML = (ok) ? "richtig" : "falsch";
        document.getElementById("formrf").className = (ok) ? "richtig" : "falsch";
    };
    this.setWort = function (wort) {
        document.getElementById("wort").innerHTML = wort;
    };
    this.setAuswahl = function (array) {
        for (var i = 0; i < 5; i++) {
            if (array[i]) {
                document.getElementById("trans").getElementsByTagName("label")[i].innerHTML = this.escape(array[i].bed);
                document.getElementById("trans").getElementsByTagName("label")[i].style.display = "inline-block";                
            } else {
                document.getElementById("trans").getElementsByTagName("label")[i].style.display = "none";                
            }
        }
    };
    this.setWertung = function (wort) {
        document.getElementById("resinf").innerHTML = this.escape(wort.inf);
        if (wort instanceof Substantiv && wort.genus)
            document.getElementById("resinf").innerHTML += " (" + wort.genus + ")";
        document.getElementById("resbed").innerHTML = this.escape(wort.bed);
    };
    this.setFormWertung = function (wort) {
        document.getElementById("potforms").innerHTML = "";
        for (var i = 0; i < wort.formsarray.length; i++) {
            document.getElementById("potforms").innerHTML +=
                    "<li" + ((wort.formsarray[i].found) ? (" class=\"richtig\"") : "") + ">" + this.escape(wort.formsarray[i].text) + "</li>";
        }
        document.getElementById("reswort").innerHTML = this.escape(wort.wort);
    };
    this.uncheckAll = function () {
        for (var i = 0; i < document.getElementById("interface").getElementsByTagName("input").length; i++)
            document.getElementById("interface").getElementsByTagName("input")[i].checked = false;
    };
    this.setUserconfig = function (id) {
        // 0 nichts - 1 substantive - 2 adjektive - 3 verben
        document.getElementById("modus").style.display = (id === 3) ? "table-cell" : "none";
        document.getElementById("tempus").style.display = (id === 3) ? "table-cell" : "none";
        document.getElementById("kasus").style.display = (id === 1 || id === 2) ? "table-cell" : "none";
        document.getElementById("numerus").style.display = (id !== 0) ? "table-cell" : "none";
        document.getElementById("gv").style.display = (id === 3) ? "table-cell" : "none";
        document.getElementById("person").style.display = (id === 3) ? "table-cell" : "none";
        document.getElementById("genus").style.display = (id === 2) ? "table-cell" : "none";
        document.getElementById("steigerung").style.display = (id === 2) ? "table-cell" : "none";
    };
}
systemDefaultUIManager = UIManager;
