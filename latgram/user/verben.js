/*
Abfrageprogramm Verben
Autor: Justus Henneberg
*/
Formen = new Array("1. Person Singular", "2. Person Singular", "3. Person Singular", "1. Person Plural", "2. Person Plural", "3. Person Plural");
Zeiten = new Array("Futur", "Pr�sens", "Imperfekt", "Perfekt", "Plusquamperfekt");
Konjugationen = new Array("a", "e", "i", "k", "ki");
Genera = new Array("Aktiv", "Passiv");
Modi = new Array("Indikativ", "Konjunktiv");
Erfolg = "Das eingegebene Wort ist RICHTIG!\nSehr gut!";
Misserfolg = "Das eingegebene Wort ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Start () {
var chbox = new Array();
chbox[0] = document.getElementsByName("Modus");
chbox[1] = document.getElementsByName("Zeit");
chbox[2] = document.getElementsByName("Gen");
chbox[3] = document.getElementsByName("Kon");
ModAbfragen = new Array(chbox[0][0].checked, chbox[0][1].checked);
ZeitAbfragen = new Array(chbox[1][0].checked, chbox[1][1].checked, chbox[1][2].checked, chbox[1][3].checked, chbox[1][4].checked);
GenAbfragen = new Array(chbox[2][0].checked, chbox[2][1].checked);
KonAbfragen = new Array(chbox[3][0].checked, chbox[3][1].checked, chbox[3][2].checked, chbox[3][3].checked, chbox[3][4].checked);
NeueAufgabe();
Punkte();
}
function Pruefen () {
if (ZeitIndex == 3 || ZeitIndex == 4) {
  if (GenusIndex == 0) {
    var Anfang = Staemme[Woerter[Konjugation][WortIndex]][1];
  } else {
    var Anfang = Staemme[Woerter[Konjugation][WortIndex]][2];
  }
} else {
  var Anfang = Staemme[Woerter[Konjugation][WortIndex]][0];
}
var Endung = Endungen[Konjugation][ModusIndex][GenusIndex][ZeitIndex][FormIndex];
var RichtigesWort = Anfang + Endung;
var OptionalRichtig = "";
var EbensoRichtig = "";
if (Endung.search(/um\s/g) != -1) {
  var OptionalRichtig = Anfang + Endung.replace(/um\s/g, "us ");
  var EbensoRichtig = Anfang + Endung.replace(/um\s/g, "a ");
} else if (Endung.search(/a\s/g) != -1) {
  var OptionalRichtig = Anfang + Endung.replace(/a\s/g, "i ");
  var EbensoRichtig = Anfang + Endung.replace(/a\s/g, "ae ");
}
var EingegebenesWort = document.Abfrage.Eingabe.value;
switch (EingegebenesWort) {
case "":
  document.Abfrage.Statusfeld.value = Leer;
  break;
case RichtigesWort:
case OptionalRichtig:
case EbensoRichtig:
  document.Abfrage.Statusfeld.value = Erfolg;
  Richtig++;
  document.getElementById("richtig").innerHTML = Richtig;
  NeueAufgabe();
  break;
default:
  if (OptionalRichtig != "") {
    if (Endung.search(/um\s/g) != -1)
      var right = Anfang + Endung.replace(/um\s/g, "us/a/um ");
    if (Endung.search(/a\s/g) != -1)
      var right = Anfang + Endung.replace(/a\s/g, "i/ae/a ");
  } else {
    var right = RichtigesWort;
  }
  document.Abfrage.Statusfeld.value = Misserfolg + Formen[FormIndex] + " " + Modi[ModusIndex] + " " + Zeiten[ZeitIndex] + " " + Genera[GenusIndex] + " von " + Woerter[Konjugation][WortIndex] + ": " + right + "\n(" + Konjugationsbeschreibungen[Konjugation] + ")";
  Falsch++;
  document.getElementById("falsch").innerHTML = Falsch;
  NeueAufgabe();
  break;
}
document.Abfrage.Eingabe.value = "";
}
function NeueZeit () {
ZeitIndex = Math.floor(Math.random() * 1000) % Zeiten.length;
if (ZeitIndex == 0 && ModusIndex == 1)
  NeueZeit();
if (ZeitAbfragen[ZeitIndex] == false)
  NeueZeit();
}
function NeueKon () {
KonIndex = Math.floor(Math.random() * 1000) % Konjugationen.length;
if (KonAbfragen[KonIndex] == false)
  NeueKon();
}
function NeuesGenus () {
GenusIndex = Math.floor(Math.random() * 1000) % Genera.length;
if (GenAbfragen[GenusIndex] == false)
  NeuesGenus();
}
function NeuerModus () {
ModusIndex = Math.floor(Math.random() * 1000) % Modi.length;
if (ModAbfragen[ModusIndex] == false)
  NeuerModus();
}
function NeueAufgabe () {
NeueKon();
Konjugation = Konjugationen[KonIndex];
NeuerModus();
WortIndex = Math.floor(Math.random() * 1000) % Woerter[Konjugation].length;
FormIndex = Math.floor(Math.random() * 1000) % Formen.length;
NeuesGenus();
NeueZeit();
document.getElementById("Form").innerHTML = Formen[FormIndex] + " " + Modi[ModusIndex] + " " + Zeiten[ZeitIndex] + " " + Genera[GenusIndex];
document.getElementById("Wort").innerHTML = Woerter[Konjugation][WortIndex];
}
function ModusAendern (e) {
var j = 0;
for (var i = 0; i < 2; i++) {
if (document.config.Modus[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 2; i++)
  ModAbfragen[i] = document.config.Modus[i].checked;
NeueAufgabe();
} else {
  document.config.Modus[e].checked = true;
}
}
function GenusAendern (e) {
var j = 0;
for (var i = 0; i < 2; i++) {
if (document.config.Gen[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 2; i++)
  GenAbfragen[i] = document.config.Gen[i].checked;
  NeueAufgabe();
} else {
  document.config.Gen[e].checked = true;
}
}
function ZeitAendern (e) {
var j = 0;
for (var i = 0; i < 5; i++) {
if (document.config.Zeit[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 5; i++)
  ZeitAbfragen[i] = document.config.Zeit[i].checked;
  NeueAufgabe();
} else {
  document.config.Zeit[e].checked = true;
}
}
function KonAendern (e) {
var j = 0;
for (var i = 0; i < 5; i++) {
if (document.config.Kon[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 5; i++)
  KonAbfragen[i] = document.config.Kon[i].checked;
  NeueAufgabe();
} else {
  document.config.Kon[e].checked = true;
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
var Cookie = Cookies["Verben"];
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
document.cookie = "Verben=" + Richtig + "-" + Falsch + "; expires=" + Auszeit.toGMTString() + ";";
}
}

Woerter = new Array();
Woerter["a"] = new Array("vocare", "amare", "laudare", "superare", "accusare", "observare", "iuvare");
Woerter["e"] = new Array("monere", "debere", "obtinere", "persuadere");
Woerter["i"] = new Array("venire", "audire", "scire", "nescire", "reperire");
Woerter["k"] = new Array("ducere", "abducere", "colere", "currere", "cognoscere", "expellere");
Woerter["ki"] = new Array("capere", "adicere", "eicere", "perspicere");

Staemme = new Array();
Staemme["vocare"] = new Array("voc", "vocav", "vocat");
Staemme["amare"] = new Array("am", "amav", "amat");
Staemme["laudare"] = new Array("laud", "laudav", "laudat");
Staemme["superare"] = new Array("super", "superav", "superat");
Staemme["accusare"] = new Array("accus", "accusav", "accusat");
Staemme["observare"] = new Array("observ", "observav", "observat");
Staemme["iuvare"] = new Array("iuv", "iuv", "iuvat");
Staemme["monere"] = new Array("mone", "monu", "monit");
Staemme["debere"] = new Array("debe", "debu", "debit");
Staemme["obtinere"] = new Array("obtine", "obtinu", "obtent");
Staemme["persuadere"] = new Array("persuade", "persuas", "persuas");
Staemme["venire"] = new Array("veni", "ven", "vent");
Staemme["audire"] = new Array("audi", "audiv", "audit");
Staemme["scire"] = new Array("sci", "sciv", "scit");
Staemme["nescire"] = new Array("nesci", "nesciv", "nescit");
Staemme["reperire"] = new Array("reperi", "repper", "repert");
Staemme["ducere"] = new Array("duc", "dux", "duct");
Staemme["abducere"] = new Array("abduc", "abdux", "abduct");
Staemme["colere"] = new Array("col", "colu", "cult");
Staemme["currere"] = new Array("curr", "cucurr", "curs");
Staemme["cognoscere"] = new Array("cognosc", "cognov", "cognit");
Staemme["expellere"] = new Array("expell", "expul", "expuls");
Staemme["facere"] = new Array("fac", "fec", "fact");
Staemme["capere"] = new Array("cap", "cep", "capt");
Staemme["adicere"] = new Array("adic", "adiec", "adiect");
Staemme["eicere"] = new Array("eic", "eiec", "eiect");
Staemme["perspicere"] = new Array("perspic", "perspex", "perspect");

Konjugationsbeschreibungen = new Array();
Konjugationsbeschreibungen["a"] = "a - Konjugation";
Konjugationsbeschreibungen["e"] = "e - Konjugation";
Konjugationsbeschreibungen["i"] = "i - Konjugation";
Konjugationsbeschreibungen["k"] = "konsonantische Konjugation";
Konjugationsbeschreibungen["ki"] = "konsonantische Konjugation mit i-Erweiterung";

Endungen = new Array();
Endungen["a"] = new Array();
Endungen["a"][0] = new Array();
Endungen["a"][0][0] = new Array();
Endungen["a"][0][0][0] = new Array("abo", "abis", "abit", "abimus", "abitis", "abunt");
Endungen["a"][0][0][1] = new Array("o", "as", "at", "amus", "atis", "ant");
Endungen["a"][0][0][2] = new Array("abam", "abas", "abat", "abamus", "abatis", "abant");
Endungen["a"][0][0][3] = new Array("i", "isti", "it", "imus", "istis", "erunt");
Endungen["a"][0][0][4] = new Array("eram", "eras", "erat", "eramus", "eratis", "erant");
Endungen["a"][0][1] = new Array();
Endungen["a"][0][1][0] = new Array("abor", "aberis", "abitur", "abimur", "abimini", "abuntur");
Endungen["a"][0][1][1] = new Array("or", "aris", "atur", "amur", "amini", "antur");
Endungen["a"][0][1][2] = new Array("abar", "abaris", "abatur", "abamur", "abamini", "abantur");
Endungen["a"][0][1][3] = new Array("um sum", "um es", "um est", "a sumus", "a estis", "a sunt");
Endungen["a"][0][1][4] = new Array("um eram", "um eras", "um erat", "a eramus", "a eratis", "a erant");
Endungen["a"][1] = new Array();
Endungen["a"][1][0] = new Array();
Endungen["a"][1][0][1] = new Array("em", "es", "et", "emus", "etis", "ent");
Endungen["a"][1][0][2] = new Array("arem", "ares", "aret", "aremus", "aretis", "arent");
Endungen["a"][1][0][3] = new Array("erim", "eris", "erit", "erimus", "eritis", "erint");
Endungen["a"][1][0][4] = new Array("issem", "isses", "isset", "issemus", "issetis", "issent");
Endungen["a"][1][1] = new Array();
Endungen["a"][1][1][1] = new Array("er", "eris", "etur", "emur", "emini", "entur");
Endungen["a"][1][1][2] = new Array("arer", "areris", "aretur", "aremur", "aremini", "arentur");
Endungen["a"][1][1][3] = new Array("um sim", "um sis", "um sit", "a simus", "a sitis", "a sint");
Endungen["a"][1][1][4] = new Array("um essem", "um esses", "um esset", "a essemus", "a essetis", "a essent");
Endungen["e"] = new Array();
Endungen["e"][0] = new Array();
Endungen["e"][0][0] = new Array();
Endungen["e"][0][0][0] = new Array("bo", "bis", "bit", "bimus", "bitis", "bunt");
Endungen["e"][0][0][1] = new Array("o", "s", "t", "mus", "tis", "nt");
Endungen["e"][0][0][2] = new Array("bam", "bas", "bat", "bamus", "batis", "bant");
Endungen["e"][0][0][3] = new Array("i", "isti", "it", "imus", "istis", "erunt");
Endungen["e"][0][0][4] = new Array("eram", "eras", "erat", "eramus", "eratis", "erant");
Endungen["e"][0][1] = new Array();
Endungen["e"][0][1][0] = new Array("bor", "beris", "bitur", "bimur", "bimini", "buntur");
Endungen["e"][0][1][1] = new Array("or", "ris", "tur", "mur", "mini", "ntur");
Endungen["e"][0][1][2] = new Array("bar", "baris", "batur", "bamur", "bamini", "bantur");
Endungen["e"][0][1][3] = new Array("um sum", "um es", "um est", "a sumus", "a estis", "a sunt");
Endungen["e"][0][1][4] = new Array("um eram", "um eras", "um erat", "a eramus", "a eratis", "a erant");
Endungen["e"][1] = new Array();
Endungen["e"][1][0] = new Array();
Endungen["e"][1][0][1] = new Array("am", "as", "at", "amus", "atis", "ant");
Endungen["e"][1][0][2] = new Array("rem", "res", "ret", "remus", "retis", "rent");
Endungen["e"][1][0][3] = new Array("erim", "eris", "erit", "erimus", "eritis", "erint");
Endungen["e"][1][0][4] = new Array("issem", "isses", "isset", "issemus", "issetis", "issent");
Endungen["e"][1][1] = new Array();
Endungen["e"][1][1][1] = new Array("ar", "aris", "atur", "amur", "amini", "antur");
Endungen["e"][1][1][2] = new Array("rer", "reris", "retur", "remur", "remini", "rentur");
Endungen["e"][1][1][3] = new Array("um sim", "um sis", "um sit", "a simus", "a sitis", "a sint");
Endungen["e"][1][1][4] = new Array("um essem", "um esses", "um esset", "a essemus", "a essetis", "a essent");
Endungen["i"] = new Array();
Endungen["i"][0] = new Array();
Endungen["i"][0][0] = new Array();
Endungen["i"][0][0][0] = new Array("am", "es", "et", "emus", "etis", "ent");
Endungen["i"][0][0][1] = new Array("o", "s", "t", "mus", "tis", "unt");
Endungen["i"][0][0][2] = new Array("ebam", "ebas", "ebat", "ebamus", "ebatis", "ebant");
Endungen["i"][0][0][3] = new Array("i", "isti", "it", "imus", "istis", "erunt");
Endungen["i"][0][0][4] = new Array("eram", "eras", "erat", "eramus", "eratis", "erant");
Endungen["i"][0][1] = new Array();
Endungen["i"][0][1][0] = new Array("ar", "eris", "etur", "emur", "emini", "entur");
Endungen["i"][0][1][1] = new Array("or", "ris", "tur", "mur", "mini", "untur");
Endungen["i"][0][1][2] = new Array("bar", "baris", "batur", "bamur", "bamini", "bantur");
Endungen["i"][0][1][3] = new Array("um sum", "um es", "um est", "a sumus", "a estis", "a sunt");
Endungen["i"][0][1][4] = new Array("um eram", "um eras", "um erat", "a eramus", "a eratis", "a erant");
Endungen["i"][1] = new Array();
Endungen["i"][1][0] = new Array();
Endungen["i"][1][0][1] = new Array("am", "as", "at", "amus", "atis", "ant");
Endungen["i"][1][0][2] = new Array("rem", "res", "ret", "remus", "retis", "rent");
Endungen["i"][1][0][3] = new Array("erim", "eris", "erit", "erimus", "eritis", "erint");
Endungen["i"][1][0][4] = new Array("issem", "isses", "isset", "issemus", "issetis", "issent");
Endungen["i"][1][1] = new Array();
Endungen["i"][1][1][1] = new Array("ar", "aris", "atur", "amur", "amini", "antur");
Endungen["i"][1][1][2] = new Array("rer", "reris", "retur", "remur", "remini", "rentur");
Endungen["i"][1][1][3] = new Array("um sim", "um sis", "um sit", "a simus", "a sitis", "a sint");
Endungen["i"][1][1][4] = new Array("um essem", "um esses", "um esset", "a essemus", "a essetis", "a essent");
Endungen["k"] = new Array();
Endungen["k"][0] = new Array();
Endungen["k"][0][0] = new Array();
Endungen["k"][0][0][0] = new Array("am", "es", "et", "emus", "etis", "ent");
Endungen["k"][0][0][1] = new Array("o", "is", "it", "imus", "itis", "unt");
Endungen["k"][0][0][2] = new Array("ebam", "ebas", "ebat", "ebamus", "ebatis", "ebant");
Endungen["k"][0][0][3] = new Array("i", "isti", "it", "imus", "istis", "erunt");
Endungen["k"][0][0][4] = new Array("eram", "eras", "erat", "eramus", "eratis", "erant");
Endungen["k"][0][1] = new Array();
Endungen["k"][0][1][0] = new Array("ar", "eris", "etur", "emur", "emini", "entur");
Endungen["k"][0][1][1] = new Array("or", "eris", "itur", "imur", "imini", "untur");
Endungen["k"][0][1][2] = new Array("ebar", "ebaris", "ebatur", "ebamur", "ebamini", "ebantur");
Endungen["k"][0][1][3] = new Array("um sum", "um es", "um est", "a sumus", "a estis", "a sunt");
Endungen["k"][0][1][4] = new Array("um eram", "um eras", "um erat", "a eramus", "a eratis", "a erant");
Endungen["k"][1] = new Array();
Endungen["k"][1][0] = new Array();
Endungen["k"][1][0][1] = new Array("am", "as", "at", "amus", "atis", "ant");
Endungen["k"][1][0][2] = new Array("erem", "eres", "eret", "eremus", "eretis", "erent");
Endungen["k"][1][0][3] = new Array("erim", "eris", "erit", "erimus", "eritis", "erint");
Endungen["k"][1][0][4] = new Array("issem", "isses", "isset", "issemus", "issetis", "issent");
Endungen["k"][1][1] = new Array();
Endungen["k"][1][1][1] = new Array("ar", "aris", "atur", "amur", "amini", "antur");
Endungen["k"][1][1][2] = new Array("erer", "ereris", "eretur", "eremur", "eremini", "erentur");
Endungen["k"][1][1][3] = new Array("um sim", "um sis", "um sit", "a simus", "a sitis", "a sint");
Endungen["k"][1][1][4] = new Array("um essem", "um esses", "um esset", "a essemus", "a essetis", "a essent");
Endungen["ki"] = new Array();
Endungen["ki"][0] = new Array();
Endungen["ki"][0][0] = new Array();
Endungen["ki"][0][0][0] = new Array("iam", "ies", "iet", "iemus", "ietis", "ient");
Endungen["ki"][0][0][1] = new Array("io", "is", "it", "imus", "itis", "iunt");
Endungen["ki"][0][0][2] = new Array("iebam", "iebas", "iebat", "iebamus", "iebatis", "iebant");
Endungen["ki"][0][0][3] = new Array("i", "isti", "it", "imus", "istis", "erunt");
Endungen["ki"][0][0][4] = new Array("eram", "eras", "erat", "eramus", "eratis", "erant");
Endungen["ki"][0][1] = new Array();
Endungen["ki"][0][1][0] = new Array("iar", "ieris", "ietur", "iemur", "iemini", "ientur");
Endungen["ki"][0][1][1] = new Array("ior", "iris", "itur", "imur", "imini", "iuntur");
Endungen["ki"][0][1][2] = new Array("iebar", "iebaris", "iebatur", "iebamur", "iebamini", "iebantur");
Endungen["ki"][0][1][3] = new Array("um sum", "um es", "um est", "a sumus", "a estis", "a sunt");
Endungen["ki"][0][1][4] = new Array("um eram", "um eras", "um erat", "a eramus", "a eratis", "a erant");
Endungen["ki"][1] = new Array();
Endungen["ki"][1][0] = new Array();
Endungen["ki"][1][0][1] = new Array("iam", "ias", "iat", "iamus", "iatis", "iant");
Endungen["ki"][1][0][2] = new Array("erem", "eres", "eret", "eremus", "eretis", "erent");
Endungen["ki"][1][0][3] = new Array("erim", "eris", "erit", "erimus", "eritis", "erint");
Endungen["ki"][1][0][4] = new Array("issem", "isses", "isset", "issemus", "issetis", "issent");
Endungen["ki"][1][1] = new Array();
Endungen["ki"][1][1][1] = new Array("iar", "iaris", "iatur", "iamur", "iamini", "iantur");
Endungen["ki"][1][1][2] = new Array("erer", "ereris", "eretur", "eremur", "eremini", "erentur");
Endungen["ki"][1][1][3] = new Array("um sim", "um sis", "um sit", "a simus", "a sitis", "a sint");
Endungen["ki"][1][1][4] = new Array("um essem", "um esses", "um esset", "a essemus", "a essetis", "a essent");