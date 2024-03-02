/*
Abfrageprogramm Pronomina
Autor: Justus Henneberg
*/
Faelle = new Array("Nominativ Singular", "Genitiv Singular", "Dativ Singular", "Akkusativ Singular", "Ablativ Singular", "Nominativ Plural", "Genitiv Plural", "Dativ Plural", "Akkusativ Plural", "Ablativ Plural");
Genera = new Array("m", "f", "n");
Erfolg = "Das eingegebene Wort ist RICHTIG!\nSehr gut!";
Misserfolg = "Das eingegebene Wort ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Start () {
var chbox = document.getElementsByName("Wort");
Abfragen = new Array(chbox[0].checked, chbox[1].checked, chbox[2].checked, chbox[3].checked, chbox[4].checked, chbox[5].checked, chbox[6].checked);
NeueAufgabe();
}
function Pruefen () {
var OptionalRichtig = "";
var RichtigesWort = Woerter[WortIndex][FallIndex][GenusIndex];
if (RichtigesWort.search(/\s\(.\)/) != -1) {
RichtigesWort = RichtigesWort.replace(/\s\(.\)/g, "")
}
if (RichtigesWort.indexOf("|") != -1) {
var pos = RichtigesWort.indexOf("|");
var len = RichtigesWort.length;
OptionalRichtig = RichtigesWort.substring(pos + 1, len);
RichtigesWort = RichtigesWort.substring(0, pos);
}
var EingegebenesWort = document.Abfrage.Eingabe.value;
switch (EingegebenesWort) {
case "":
  document.Abfrage.Statusfeld.value = Leer;
  break;
case RichtigesWort:
case OptionalRichtig:
  document.Abfrage.Statusfeld.value = Erfolg;
  Richtig++;
  document.getElementById("richtig").innerHTML = Richtig;
  NeueAufgabe();
  break;
default:
  if (OptionalRichtig == "")
    var right = RichtigesWort;
  else
    var right = RichtigesWort + " oder " + OptionalRichtig;
  document.Abfrage.Statusfeld.value = Misserfolg + Faelle[FallIndex] + " von " + Woerter[WortIndex][0][GenusIndex] + ": " + right;
  Falsch++;
  document.getElementById("falsch").innerHTML = Falsch;
  NeueAufgabe();
  break;
}
document.Abfrage.Eingabe.value = "";
}
function NeuesWort () {
WortIndex = Math.floor(Math.random() * 1000) % Woerter.length;
if (Abfragen[WortIndex] == false)
  NeuesWort();
}
function NeueAufgabe () {
GenusIndex = Math.floor(Math.random() * 1000) % Genera.length;
NeuesWort();
FallIndex = Math.floor(Math.random() * 1000) % Faelle.length;
document.getElementById("Fall").innerHTML = Faelle[FallIndex];
document.getElementById("Wort").innerHTML = Woerter[WortIndex][0][GenusIndex];
}
function WortAendern (e) {
var j = 0;
for (var i = 0; i < 7; i++) {
if (document.config.Wort[i].checked == true)
  j++;
}
if (j != 0) {
for (var i = 0; i < 7; i++)
  Abfragen[i] = document.config.Wort[i].checked;
  NeueAufgabe();
} else {
  document.config.Wort[e].checked = true;
}
}
function KeinStatus () {
document.Abfrage.Statusfeld.value = "";
}

Woerter = new Array();
Woerter[0] = new Array();
Woerter[0][0] = new Array("qui", "quae", "quod");
Woerter[0][1] = new Array("cuius", "cuius", "cuius");
Woerter[0][2] = new Array("cui", "cui", "cui");
Woerter[0][3] = new Array("quem", "quam", "quod");
Woerter[0][4] = new Array("quo", "qua", "quo");
Woerter[0][5] = new Array("qui", "quae", "quae");
Woerter[0][6] = new Array("quorum", "quarum", "quorum");
Woerter[0][7] = new Array("quibus", "quibus", "quibus");
Woerter[0][8] = new Array("quos", "quas", "quae");
Woerter[0][9] = new Array("quibus", "quibus", "quibus");
Woerter[1] = new Array();
Woerter[1][0] = new Array("ipse", "ipsa", "ipsum");
Woerter[1][1] = new Array("ipsius", "ipsius", "ipsius");
Woerter[1][2] = new Array("ipsi", "ipsi", "ipsi");
Woerter[1][3] = new Array("ipsum", "ipsam", "ipsum");
Woerter[1][4] = new Array("ipso", "ipsa", "ipso");
Woerter[1][5] = new Array("ipsi", "ipsae", "ipsa");
Woerter[1][6] = new Array("ipsorum", "ipsarum", "ipsorum");
Woerter[1][7] = new Array("ipsis", "ipsis", "ipsis");
Woerter[1][8] = new Array("ipsos", "ipsas", "ipsa");
Woerter[1][9] = new Array("ipsis", "ipsis", "ipsis");
Woerter[2] = new Array();
Woerter[2][0] = new Array("is", "ea", "id");
Woerter[2][1] = new Array("eius", "eius", "eius");
Woerter[2][2] = new Array("ei", "ei", "ei");
Woerter[2][3] = new Array("eum", "eam", "id");
Woerter[2][4] = new Array("eo", "ea", "eo");
Woerter[2][5] = new Array("ei|ii", "eae", "ea");
Woerter[2][6] = new Array("eorum", "earum", "eorum");
Woerter[2][7] = new Array("eis|iis", "eis|iis", "eis|iis");
Woerter[2][8] = new Array("eos", "eas", "ea");
Woerter[2][9] = new Array("eis|iis", "eis|iis", "eis|iis");
Woerter[3] = new Array();
Woerter[3][0] = new Array("ille", "illa", "illud");
Woerter[3][1] = new Array("illius", "illius", "illius");
Woerter[3][2] = new Array("illi", "illi", "illi");
Woerter[3][3] = new Array("illum", "illam", "illud");
Woerter[3][4] = new Array("illo", "illa", "illo");
Woerter[3][5] = new Array("illi", "illae", "illa");
Woerter[3][6] = new Array("illorum", "illarum", "illorum");
Woerter[3][7] = new Array("illis", "illis", "illis");
Woerter[3][8] = new Array("illos", "illas", "illa");
Woerter[3][9] = new Array("illis", "illis", "illis");
Woerter[4] = new Array();
Woerter[4][0] = new Array("hic", "haec", "hoc");
Woerter[4][1] = new Array("huius", "huius", "huius");
Woerter[4][2] = new Array("huic", "huic", "huic");
Woerter[4][3] = new Array("hunc", "hanc", "hoc");
Woerter[4][4] = new Array("hoc", "hac", "hoc");
Woerter[4][5] = new Array("hi", "hae", "hae");
Woerter[4][6] = new Array("horum", "harum", "horum");
Woerter[4][7] = new Array("his", "his", "his");
Woerter[4][8] = new Array("hos", "has", "haec");
Woerter[4][9] = new Array("his", "his", "his");
Woerter[5] = new Array();
Woerter[5][0] = new Array("iste", "ista", "istud");
Woerter[5][1] = new Array("istius", "istius", "istius");
Woerter[5][2] = new Array("isti", "isti", "isti");
Woerter[5][3] = new Array("istum", "istam", "istud");
Woerter[5][4] = new Array("isto", "ista", "isto");
Woerter[5][5] = new Array("isti", "istae", "ista");
Woerter[5][6] = new Array("istorum", "istarum", "istorum");
Woerter[5][7] = new Array("istis", "istis", "istis");
Woerter[5][8] = new Array("istos", "istas", "ista");
Woerter[5][9] = new Array("istis", "istis", "istis");
Woerter[6] = new Array();
Woerter[6][0] = new Array("idem (m)", "eadem", "idem (n)");
Woerter[6][1] = new Array("eiusdem", "eiusdem", "eiusdem");
Woerter[6][2] = new Array("eidem", "eidem", "eidem");
Woerter[6][3] = new Array("eundem", "eandem", "idem");
Woerter[6][4] = new Array("eodem", "eadem", "eodem");
Woerter[6][5] = new Array("iidem", "eaedem", "eadem");
Woerter[6][6] = new Array("eorundem", "earundem", "eorundem");
Woerter[6][7] = new Array("eisdem|isdem", "eisdem|isdem", "eisdem|isdem");
Woerter[6][8] = new Array("eosdem", "easdem", "eadem");
Woerter[6][9] = new Array("eisdem|isdem", "eisdem|isdem", "eisdem|isdem");
