/*
Abfrageprogramm Adjektive
Autor: Justus Henneberg
*/
Faelle = new Array("Nominativ Singular", "Genitiv Singular", "Dativ Singular", "Akkusativ Singular", "Ablativ Singular", "Nominativ Plural", "Genitiv Plural", "Dativ Plural", "Akkusativ Plural", "Ablativ Plural");
Genera = new Array("m", "f", "n");
Arten = new Array("ppa", "ppp", "pfa");
Erfolg = "Das eingegebene Wort ist RICHTIG!\nSehr gut!";
Misserfolg = "Das eingegebene Wort ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Start () {
var chbox = new Array();
chbox[0] = document.getElementsByName("PartArt");
chbox[1] = document.getElementsByName("Gen");
ArtAbfragen = new Array(chbox[0][0].checked, chbox[0][1].checked, chbox[0][2].checked);
GenAbfragen = new Array(chbox[1][0].checked, chbox[1][1].checked, chbox[1][2].checked);
NeueAufgabe();
Punkte();
}
function Pruefen () {
if (Art == "ppa") {
var Anfang = Staemme[Woerter[WortIndex]][0];
} else {
var Anfang = Staemme[Woerter[WortIndex]][1];
}
var Endung = Endungen[Art][GenusIndex][FallIndex];
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
  document.Abfrage.Statusfeld.value = Misserfolg + Faelle[FallIndex] + " " + Genera[GenusIndex] + " des " + Art.toUpperCase() + "s von " + Woerter[WortIndex] + ": " + RichtigesWort;
  Falsch++;
  document.getElementById("falsch").innerHTML = Falsch;
  NeueAufgabe();
  break;
}
document.Abfrage.Eingabe.value = "";
}
function NeueArt () {
ArtIndex = Math.floor(Math.random() * 1000) % Arten.length;
if (ArtAbfragen[ArtIndex] == false)
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
WortIndex = Math.floor(Math.random() * 1000) % Woerter.length;
FallIndex = Math.floor(Math.random() * 1000) % Faelle.length;
document.getElementById("Fall").innerHTML = Faelle[FallIndex] + " " + Genera[GenusIndex];
document.getElementById("Part").innerHTML = Art.toUpperCase() + "s";
document.getElementById("Wort").innerHTML = Woerter[WortIndex];
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
function ArtAendern (e) {
var j = 0;
for (var i = 0; i < 3; i++) {
if (document.config.PartArt[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 3; i++)
  ArtAbfragen[i] = document.config.PartArt[i].checked;
NeueAufgabe();
} else {
document.config.PartArt[e].checked = true;
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
var Cookie = "0-0";
if (Cookies["Part"])
var Cookie = Cookies["Part"];
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
document.cookie = "Part=" + Richtig + "-" + Falsch + "; expires=" + Auszeit.toGMTString() + ";";
}
}

Staemme = new Array();
Staemme["vocare"] = new Array("vocant", "vocat");
Staemme["amare"] = new Array("amant", "amat");
Staemme["laudare"] = new Array("laudant", "laudat");
Staemme["superare"] = new Array("superant", "superat");
Staemme["accusare"] = new Array("accusant", "accusat");
Staemme["observare"] = new Array("observant", "observat");
Staemme["monere"] = new Array("monent", "monit");
Staemme["debere"] = new Array("debent", "debit");
Staemme["obtinere"] = new Array("obtinent", "obtent");
Staemme["persuadere"] = new Array("persuadent", "persuas");
Staemme["ridere"] = new Array("rident", "ris");
Staemme["venire"] = new Array("venient", "vent");
Staemme["audire"] = new Array("audient", "audit");
Staemme["scire"] = new Array("scient", "scit");
Staemme["nescire"] = new Array("nescient", "nescit");
Staemme["reperire"] = new Array("reperient", "repert");
Staemme["ducere"] = new Array("ducent", "duct");
Staemme["colere"] = new Array("colent", "cult");
Staemme["currere"] = new Array("current", "curs");
Staemme["cognoscere"] = new Array("cognoscent", "cognot");
Staemme["expellere"] = new Array("expellent", "expuls");
Staemme["facere"] = new Array("facient", "fact");
Staemme["capere"] = new Array("capient", "capt");
Staemme["adicere"] = new Array("adicient", "adiect");
Staemme["eicere"] = new Array("eicient", "eiect");
Staemme["perspicere"] = new Array("perspicient", "perspect");

Woerter = new Array("vocare", "laudare", "superare", "accusare", "observare", "monere", "debere", "obtinere", "persuadere", "ridere", "venire", "audire", "scire", "nescire", "reperire", "ducere", "colere", "currere", "cognoscere", "expellere", "facere", "capere", "adicere", "eicere", "perspicere");

Endungen = new Array();
Endungen["ppp"] = new Array();
Endungen["ppp"][0] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["ppp"][1] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["ppp"][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
Endungen["ppa"] = new Array();
Endungen["ppa"][0] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
Endungen["ppa"][1] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
Endungen["ppa"][2] = new Array("s", "is", "i", "s", "i", "ia", "ium", "ibus", "ia", "ibus");
Endungen["pfa"] = new Array();
Endungen["pfa"][0] = new Array("urus", "uri", "uro", "urum", "uro", "uri", "urorum", "uris", "uros", "uris");
Endungen["pfa"][1] = new Array("ura", "urae", "urae", "uram", "ura", "urae", "urarum", "uris", "uras", "uris");
Endungen["pfa"][2] = new Array("urum", "uri", "uro", "urum", "uro", "ura", "urorum", "uris", "ura", "uris");

