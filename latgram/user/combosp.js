/*
Kombination Substantive und Adjektive
Autor: Justus Henneberg
*/
Faelle = new Array("Nominativ Singular", "Genitiv Singular", "Dativ Singular", "Akkusativ Singular", "Ablativ Singular", "Nominativ Plural", "Genitiv Plural", "Dativ Plural", "Akkusativ Plural", "Ablativ Plural");
Deklinationen = new Array("a", "e", "om", "on");
Genera = new Array(1, 1, 0, 2);
Steigerungen = new Array("Positiv", "Komparativ", "Superlativ");
Arten = new Array("ppp", "ppa");
Erfolg = "Die eingegebene Form ist RICHTIG!\nSehr gut!";
Misserfolg = "Die eingegebene Form ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Pruefen () {
var Anfang = Anfaenge[Deklination][AnfangIndex];
var Endung = Endungen[Deklination][FallIndex];
var RichtigesSubst = Anfang + Endung;
var PartAnfang = PartAnfaenge[Art][PartAnfangIndex];
var PartEndung = PartEndungen[Art][Genera[DeklinationIndex]][FallIndex];
var RichtigesPart = PartAnfang + PartEndung;
RichtigesPart = RichtigesPart.replace(/nts/g, "ns");
var RichtigeKombi = RichtigesSubst + " " + RichtigesPart;
var AuchRichtigeKombi = RichtigesPart + " " + RichtigesSubst;
var EingegebeneKombi = document.Abfrage.Eingabe.value;
switch (EingegebeneKombi) {
case "":
  document.Abfrage.Statusfeld.value = Leer;
  break;
case RichtigeKombi:
  document.Abfrage.Statusfeld.value = Erfolg;
  Richtig++;
  document.getElementById("richtig").innerHTML = Richtig;
  NeueAufgabe();
  break;
case AuchRichtigeKombi:
  document.Abfrage.Statusfeld.value = Erfolg;
  Richtig++;
  document.getElementById("richtig").innerHTML = Richtig;
  NeueAufgabe();
  break;
default:
  document.Abfrage.Statusfeld.value = Misserfolg + Faelle[FallIndex] + " von " + Subst + " " + Part + ": " + RichtigeKombi;
  Falsch++;
  document.getElementById("falsch").innerHTML = Falsch;
  NeueAufgabe();
  break;
}
document.Abfrage.Eingabe.value = "";
}
function NeueAufgabe () {
ArtIndex = Math.floor(Math.random() * 1000) % Arten.length;
Art = Arten[ArtIndex];
DeklinationIndex = Math.floor(Math.random() * 1000) % Deklinationen.length;
Deklination = Deklinationen[DeklinationIndex];
AnfangIndex = Math.floor(Math.random() * 1000) % Anfaenge[Deklination].length;
PartAnfangIndex = Math.floor(Math.random() * 1000) % PartAnfaenge[Art].length;
FallIndex = Math.floor(Math.random() * 1000) % Faelle.length;
Subst = Anfaenge[Deklination][AnfangIndex] + Endungen[Deklination][0];
Part = PartAnfaenge[Art][PartAnfangIndex] + PartEndungen[Art][Genera[DeklinationIndex]][0];
Part = Part.replace(/nts/g, "ns");
document.getElementById("Fall").innerHTML = Faelle[FallIndex];
document.getElementById("Wort").innerHTML = Subst + " " + Part;
}
function KeinStatus () {
document.Abfrage.Statusfeld.value = "";
}


Anfaenge = new Array();
Anfaenge["a"] = new Array("serv", "victori", "curi", "turb", "port", "amic", "besti", "amiciti", "licenti");
Anfaenge["e"] = new Array("fid", "r", "sp", "di");
Anfaenge["om"] = new Array("amic", "nunti", "serv", "lud", "equ", "fili", "ocul", "libert", "vic", "ann");
Anfaenge["on"]= new Array("for", "ferr", "sign", "aedifici", "vin", "pericul", "consili", "bell", "iudici");

Endungen = new Array();
Endungen["a"] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
Endungen["e"] = new Array("es", "ei", "ei", "em", "e", "es", "erum", "ebus", "es", "ebus");
Endungen["om"] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
Endungen["on"] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");

PartAnfaenge = new Array();
PartAnfaenge["ppp"] = new Array("vocat", "amat", "laudat", "superat", "accusat", "observat", "persuas", "audit", "scit", "nescit", "repert", "duct", "cult", "cognot", "expuls", "capt", "adiect", "eiect");
PartAnfaenge["ppa"] = new Array("vocant", "amant", "laudant", "superant", "accusant", "observant", "persuadent", "audient", "scient", "nescient", "reperient", "ducent", "colent", "cognoscent", "expellent", "capient", "adicient", "eicient");

PartEndungen = new Array();
PartEndungen["ppp"] = new Array();
PartEndungen["ppp"][0] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
PartEndungen["ppp"][1] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
PartEndungen["ppp"][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
PartEndungen["ppa"] = new Array();
PartEndungen["ppa"][0] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
PartEndungen["ppa"][1] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
PartEndungen["ppa"][2] = new Array("s", "is", "i", "s", "i", "ia", "ium", "ibus", "ia", "ibus");
