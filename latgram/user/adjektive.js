/*
Abfrageprogramm Adjektive
Autor: Justus Henneberg
*/
Faelle = new Array("Nominativ Singular", "Genitiv Singular", "Dativ Singular", "Akkusativ Singular", "Ablativ Singular", "Nominativ Plural", "Genitiv Plural", "Dativ Plural", "Akkusativ Plural", "Ablativ Plural");
Genera = new Array("m", "f", "n");
Steigerungen = new Array("Positiv", "Komparativ", "Superlativ");
Arten = new Array("ao", "k1", "k2");
Erfolg = "Das eingegebene Wort ist RICHTIG!\nSehr gut!";
Misserfolg = "Das eingegebene Wort ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Start () {
var chbox = new Array();
chbox[0] = document.getElementsByName("Stg");
chbox[1] = document.getElementsByName("DeklArt");
chbox[2] = document.getElementsByName("Gen");
SteigerungAbfragen = new Array(chbox[0][0].checked, chbox[0][1].checked, chbox[0][2].checked);
ArtAbfragen = new Array(chbox[1][0].checked, chbox[1][1].checked);
GenAbfragen = new Array(chbox[2][0].checked, chbox[2][1].checked, chbox[2][2].checked);
NeueAufgabe();
Punkte();
}
function Pruefen () {
var Wort = Anfaenge[Art][0][AnfangIndex] + Endungen[Art][0][0][0];
var Anfang = Anfaenge[Art][SteigerungIndex][AnfangIndex];
var Endung = Endungen[Art][GenusIndex][SteigerungIndex][FallIndex];
var RichtigesWort = Anfang + Endung;
RichtigesWort = RichtigesWort.replace(/nts/g, "ns");
var EingegebenesWort = document.Abfrage.Eingabe.value;
switch (EingegebenesWort) {
case "":
  document.Abfrage.Statusfeld.value = Leer;
  break;
case RichtigesWort:
  document.Abfrage.Statusfeld.value = Erfolg;
  Richtig++;
  document.getElementById("richtig").innerHTML = Richtig;
  NeueAufgabe();
  break;
default:
  document.Abfrage.Statusfeld.value = Misserfolg + Faelle[FallIndex] + " " + Steigerungen[SteigerungIndex] + " " + Genera[GenusIndex] + " von " + Wort.replace(/nts/g, "ns") + ": " + RichtigesWort;
  Falsch++;
  document.getElementById("falsch").innerHTML = Falsch;
  NeueAufgabe();
  break;
}
document.Abfrage.Eingabe.value = "";
}
function NeueSteigerung () {
SteigerungIndex = Math.floor(Math.random() * 1000) % Steigerungen.length;
if (SteigerungAbfragen[SteigerungIndex] == false)
  NeueSteigerung();
}
function NeueArt () {
ArtIndex = Math.floor(Math.random() * 1000) % Arten.length;
if (Arten[ArtIndex] == "ao")
  var Gruppe = 0;
else
  var Gruppe = 1;
if (ArtAbfragen[Gruppe] == false)
  NeueArt();
}
function NeuesGenus () {
GenusIndex = Math.floor(Math.random() * 1000) % Genera.length;
if (GenAbfragen[GenusIndex] == false)
  NeuesGenus();
}
function NeueAufgabe () {
NeueArt();
Art = Arten[ArtIndex];
NeuesGenus();
AnfangIndex = Math.floor(Math.random() * 1000) % Anfaenge[Art][0].length;
NeueSteigerung();
FallIndex = Math.floor(Math.random() * 1000) % Faelle.length;
var Wort = Anfaenge[Art][0][AnfangIndex] + Endungen[Art][0][0][0];
document.getElementById("Form").innerHTML = Faelle[FallIndex] + " " + Steigerungen[SteigerungIndex] + " " + Genera[GenusIndex];
document.getElementById("Wort").innerHTML = Wort.replace(/nts/g, "ns");
}
function GenusAendern (e) {
var j = 0;
for (var i = 0; i < 3; i++) {
if (document.config.Gen[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 3; i++)
  GenAbfragen[i] = document.config.Gen[i].checked;
  NeueAufgabe();
} else {
  document.config.Gen[e].checked = true;
}
}
function SteigerungAendern (e) {
var j = 0;
for (var i = 0; i < 3; i++) {
if (document.config.Stg[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 3; i++)
  SteigerungAbfragen[i] = document.config.Stg[i].checked;
NeueAufgabe();
} else {
document.config.Stg[e].checked = true;
}
}
function ArtAendern (e) {
var j = 0;
for (var i = 0; i < 2; i++) {
if (document.config.DeklArt[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 2; i++)
  ArtAbfragen[i] = document.config.DeklArt[i].checked;
NeueAufgabe();
} else {
document.config.DeklArt[e].checked = true;
}
}
function KeinStatus () {
document.Abfrage.Statusfeld.value = "";
}
function Punkte () {
if (document.cookie) {
var Cookiestring = document.cookie.split("; ");
Cookies = new Array();
for (var i = 0; i < Cookiestring.length; i++) {
var NameWert = Cookiestring[i].split("=");
Cookies[NameWert[0]] = NameWert[1];
}
var Cookie = Cookies["Adjek"];
Punkte = Cookie.split("-");
Richtig = Punkte[0];
document.getElementById("richtig").innerHTML = Richtig;
Falsch = Punkte[1];
document.getElementById("falsch").innerHTML = Falsch;
}
}
function Speichern () {
var Verfall = 1000 * 60 * 60 * 24 * 30;
var jetzt = new Date();
if (document.save.elements[0].checked == true) {
var Auszeit = new Date(jetzt.getTime() + Verfall);
document.cookie = "Adjek=" + Richtig + "-" + Falsch + "; expires=" + Auszeit.toGMTString() + ";";
}
}

Anfaenge = new Array();
Anfaenge["ao"] = new Array();
Anfaenge["ao"][0] = new Array("magn", "parv", "bon", "mal", "rar", "superb", "mir", "praeclar");
Anfaenge["ao"][1] = new Array("mai", "min", "meli", "pei", "rari", "superbi", "miri", "praeclari");
Anfaenge["ao"][2] = new Array("maxim", "minim", "optim", "pessim", "rarissim", "superbissim", "mirrim", "praeclarissim");
Anfaenge["k1"] = new Array();
Anfaenge["k1"][0] = new Array("vehement", "libent", "diligent", "frequent");
Anfaenge["k1"][1] = new Array("vehementi", "libenti", "diligenti", "frequenti");
Anfaenge["k1"][2] = new Array("vehementissim", "libentissim", "diligentissim", "frequentissim");
Anfaenge["k2"] = new Array();
Anfaenge["k2"][0] = new Array("fort", "turp", "nobil", "tal", "trist", "lev");
Anfaenge["k2"][1] = new Array("forti", "turpi", "nobili", "tali", "tristi", "levi");
Anfaenge["k2"][2] = new Array("fortissm", "turpissim", "nobilissim", "talissim", "tristissim", "levissim");

Endungen = new Array();
Endungen["ao"] = new Array();
Endungen["ao"][0] = new Array();
Endungen["ao"][0][0] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["ao"][0][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
Endungen["ao"][0][2] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["ao"][1] = new Array();
Endungen["ao"][1][0] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["ao"][1][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
Endungen["ao"][1][2] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["ao"][2] = new Array();
Endungen["ao"][2][0] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
Endungen["ao"][2][1] = new Array("us", "oris", "ori", "us", "ore", "ora", "orum", "oribus", "ora", "oribus");
Endungen["ao"][2][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
Endungen["k1"] = new Array();
Endungen["k1"][0] = new Array();
Endungen["k1"][0][0] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
Endungen["k1"][0][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
Endungen["k1"][0][2] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["k1"][1] = new Array();
Endungen["k1"][1][0] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
Endungen["k1"][1][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
Endungen["k1"][1][2] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["k1"][2] = new Array();
Endungen["k1"][2][0] = new Array("s", "is", "i", "s", "i", "ia", "ium", "ibus", "ia", "ibus");
Endungen["k1"][2][1] = new Array("us", "oris", "ori", "us", "ore", "ora", "orum", "oribus", "ora", "oribus");
Endungen["k1"][2][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
Endungen["k2"] = new Array();
Endungen["k2"][0] = new Array();
Endungen["k2"][0][0] = new Array("is", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
Endungen["k2"][0][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
Endungen["k2"][0][2] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["k2"][1] = new Array();
Endungen["k2"][1][0] = new Array("is", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
Endungen["k2"][1][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
Endungen["k2"][1][2] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["k2"][2] = new Array();
Endungen["k2"][2][0] = new Array("e", "is", "i", "e", "i", "ia", "ium", "ibus", "ia", "ibus");
Endungen["k2"][2][1] = new Array("us", "oris", "ori", "us", "ore", "ora", "orum", "oribus", "ora", "oribus");
Endungen["k2"][2][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
