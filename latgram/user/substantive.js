/*
Abfrageprogramm Substantive
Autor: Justus Henneberg
*/
Faelle = new Array("Nominativ Singular", "Genitiv Singular", "Dativ Singular", "Akkusativ Singular", "Ablativ Singular", "Nominativ Plural", "Genitiv Plural", "Dativ Plural", "Akkusativ Plural", "Ablativ Plural");
Deklinationen = new Array("a", "e", "om", "on", "u");
Erfolg = "Das eingegebene Wort ist RICHTIG!\nSehr gut!";
Misserfolg = "Das eingegebene Wort ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Start () {
var chbox = document.getElementsByName("Dekl");
Abfragen = new Array(chbox[0].checked, chbox[1].checked, chbox[2].checked, chbox[3].checked, chbox[4].checked);
NeueAufgabe();
Punkte();
}
function Pruefen () {
var Anfang = Anfaenge[Deklination][AnfangIndex];
var Endung = Endungen[Deklination][FallIndex];
var RichtigesWort = Anfang + Endung;
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
  document.Abfrage.Statusfeld.value = Misserfolg + Faelle[FallIndex] + " von " + Anfaenge[Deklination][AnfangIndex] + Endungen[Deklination][0] + ": " + RichtigesWort + "\n(" + Deklinationsbeschreibungen[Deklination] + ")";
  Falsch++;
  document.getElementById("falsch").innerHTML = Falsch;
  NeueAufgabe();
  break;
}
document.Abfrage.Eingabe.value = "";
}
function NeueDekl () {
DeklinationIndex = Math.floor(Math.random() * 1000) % Deklinationen.length;
if (Abfragen[DeklinationIndex] == false)
  NeueDekl();
}
function NeueAufgabe () {
NeueDekl();
Deklination = Deklinationen[DeklinationIndex];
AnfangIndex = Math.floor(Math.random() * 1000) % Anfaenge[Deklination].length;
FallIndex = Math.floor(Math.random() * 1000) % Faelle.length;
document.getElementById("Fall").innerHTML = Faelle[FallIndex];
document.getElementById("Wort").innerHTML = Anfaenge[Deklination][AnfangIndex] + Endungen[Deklination][0];
}
function DeklAendern (e) {
var j = 0;
for (var i = 0; i < 5; i++) {
if (document.config.Dekl[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 5; i++)
  Abfragen[i] = document.config.Dekl[i].checked;
  NeueAufgabe();
} else {
  document.config.Dekl[e].checked = true;
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
var Cookie = Cookies["Subst"];
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
document.cookie = "Subst=" + Richtig + "-" + Falsch + "; expires=" + Auszeit.toGMTString() + ";";
}
}

Deklinationsbeschreibungen = new Array();
Deklinationsbeschreibungen["a"] = "a - Deklination";
Deklinationsbeschreibungen["e"] = "e - Deklination";
Deklinationsbeschreibungen["om"] = "o - Deklination m";
Deklinationsbeschreibungen["on"] = "o - Deklination n";
Deklinationsbeschreibungen["u"] = "u - Deklination";

Anfaenge = new Array();
Anfaenge["a"] = new Array("serv", "victori", "curi", "turb", "port", "amic", "besti", "amiciti", "licenti");
Anfaenge["e"] = new Array("fid", "r", "sp", "di", "aci");
Anfaenge["om"] = new Array("amic", "nunti", "serv", "lud", "equ", "fili", "ocul", "libert", "vic", "ann");
Anfaenge["on"]= new Array("for", "ferr", "sign", "aedifici", "vin", "pericul", "consili", "bell", "iudici");
Anfaenge["u"] = new Array("dom", "advent", "met", "senat", "magistrat", "luct", "exercit", "us", "man", "vers");

Endungen = new Array();
Endungen["a"] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["e"] = new Array("es", "ei", "ei", "em", "e", "es", "erum", "ebus", "es", "ebus");
Endungen["om"] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["on"] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
Endungen["u"] = new Array("us", "us", "ui", "um", "u", "us", "uum", "ibus", "us", "ibus");
