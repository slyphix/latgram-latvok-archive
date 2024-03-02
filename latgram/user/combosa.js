/*
Kombination Substantive und Adjektive
Autor: Justus Henneberg
*/
Faelle = new Array("Nominativ Singular", "Genitiv Singular", "Dativ Singular", "Akkusativ Singular", "Ablativ Singular", "Nominativ Plural", "Genitiv Plural", "Dativ Plural", "Akkusativ Plural", "Ablativ Plural");
Deklinationen = new Array("a", "e", "om", "on");
Genera = new Array(1, 1, 0, 2);
Steigerungen = new Array("Positiv", "Komparativ", "Superlativ");
Arten = new Array("ao", "k1", "k2");
Erfolg = "Die eingegebene Form ist RICHTIG!\nSehr gut!";
Misserfolg = "Die eingegebene Form ist leider falsch!\n";
Leer = "Es wurde nichts eingegeben!";
Falsch = 0;
Richtig = 0;

function Pruefen () {
var Anfang = Anfaenge[Deklination][AnfangIndex];
var Endung = Endungen[Deklination][FallIndex];
var RichtigesSubst = Anfang + Endung;
var AdjAnfang = AdjAnfaenge[Art][SteigerungIndex][AdjAnfangIndex];
var AdjEndung = AdjEndungen[Art][Genera[DeklinationIndex]][SteigerungIndex][FallIndex];
var RichtigesAdj = AdjAnfang + AdjEndung;
RichtigesAdj = RichtigesAdj.replace(/nts/g, "ns");
var RichtigeKombi = RichtigesSubst + " " + RichtigesAdj;
var AuchRichtigeKombi = RichtigesAdj + " " + RichtigesSubst;
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
  document.Abfrage.Statusfeld.value = Misserfolg + Faelle[FallIndex] + " von " + Subst + " " + Adj + ": " + RichtigeKombi;
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
SteigerungIndex = Math.floor(Math.random() * 1000) % Steigerungen.length;
AnfangIndex = Math.floor(Math.random() * 1000) % Anfaenge[Deklination].length;
AdjAnfangIndex = Math.floor(Math.random() * 1000) % AdjAnfaenge[Art][SteigerungIndex].length;
FallIndex = Math.floor(Math.random() * 1000) % Faelle.length;
Subst = Anfaenge[Deklination][AnfangIndex] + Endungen[Deklination][0];
Adj = AdjAnfaenge[Art][SteigerungIndex][AdjAnfangIndex] + AdjEndungen[Art][Genera[DeklinationIndex]][SteigerungIndex][0];
Adj = Adj.replace(/nts/g, "ns");
document.getElementById("Fall").innerHTML = Faelle[FallIndex];
document.getElementById("Wort").innerHTML = Subst + " " + Adj;
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

AdjAnfaenge = new Array();
AdjAnfaenge["ao"] = new Array();
AdjAnfaenge["ao"][0] = new Array("magn", "parv", "bon", "mal", "rar", "superb", "mir", "praeclar", "tant");
AdjAnfaenge["ao"][1] = new Array("mai", "min", "meli", "pei", "rari", "superbi", "miri", "praeclari", "tanti");
AdjAnfaenge["ao"][2] = new Array("maxim", "minim", "optim", "pessim", "rarissim", "superbissim", "mirrim", "praeclarissim", "tantissim");
AdjAnfaenge["k1"] = new Array();
AdjAnfaenge["k1"][0] = new Array("vehement", "libent", "diligent", "frequent");
AdjAnfaenge["k1"][1] = new Array("vehementi", "libenti", "diligenti", "frequenti");
AdjAnfaenge["k1"][2] = new Array("vehementissim", "libentissim", "diligentissim", "frequentissim");
AdjAnfaenge["k2"] = new Array();
AdjAnfaenge["k2"][0] = new Array("fort", "turp", "nobil", "tal", "trist", "lev", "facil");
AdjAnfaenge["k2"][1] = new Array("forti", "turpi", "nobili", "tali", "tristi", "levi", "facili");
AdjAnfaenge["k2"][2] = new Array("fortissim", "turpissim", "nobelissim", "talissim", "tristissim", "levissim", "facillim");

AdjEndungen = new Array();
AdjEndungen["ao"] = new Array();
AdjEndungen["ao"][0] = new Array();
AdjEndungen["ao"][0][0] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
AdjEndungen["ao"][0][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
AdjEndungen["ao"][0][2] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
AdjEndungen["ao"][1] = new Array();
AdjEndungen["ao"][1][0] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
AdjEndungen["ao"][1][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
AdjEndungen["ao"][1][2] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
AdjEndungen["ao"][2] = new Array();
AdjEndungen["ao"][2][0] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
AdjEndungen["ao"][2][1] = new Array("us", "oris", "ori", "us", "ore", "ora", "orum", "oribus", "ora", "oribus");
AdjEndungen["ao"][2][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
AdjEndungen["k1"] = new Array();
AdjEndungen["k1"][0] = new Array();
AdjEndungen["k1"][0][0] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
AdjEndungen["k1"][0][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
AdjEndungen["k1"][0][2] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
AdjEndungen["k1"][1] = new Array();
AdjEndungen["k1"][1][0] = new Array("s", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
AdjEndungen["k1"][1][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
AdjEndungen["k1"][1][2] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
AdjEndungen["k1"][2] = new Array();
AdjEndungen["k1"][2][0] = new Array("s", "is", "i", "s", "i", "ia", "ium", "ibus", "ia", "ibus");
AdjEndungen["k1"][2][1] = new Array("us", "oris", "ori", "us", "ore", "ora", "orum", "oribus", "ora", "oribus");
AdjEndungen["k1"][2][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");
AdjEndungen["k2"] = new Array();
AdjEndungen["k2"][0] = new Array();
AdjEndungen["k2"][0][0] = new Array("is", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
AdjEndungen["k2"][0][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
AdjEndungen["k2"][0][2] = new Array("us", "i", "o", "um", "o", "i", "orum", "is", "os", "is");
AdjEndungen["k2"][1] = new Array();
AdjEndungen["k2"][1][0] = new Array("is", "is", "i", "em", "i", "es", "ium", "ibus", "es", "ibus");
AdjEndungen["k2"][1][1] = new Array("or", "oris", "ori", "orem", "ore", "ores", "orum", "oribus", "ores", "oribus");
AdjEndungen["k2"][1][2] = new Array("a", "ae", "ae", "am", "a", "ae", "arum", "is", "as", "is");
AdjEndungen["k2"][2] = new Array();
AdjEndungen["k2"][2][0] = new Array("e", "is", "i", "e", "i", "ia", "ium", "ibus", "ia", "ibus");
AdjEndungen["k2"][2][1] = new Array("us", "oris", "ori", "us", "ore", "ora", "orum", "oribus", "ora", "oribus");
AdjEndungen["k2"][2][2] = new Array("um", "i", "o", "um", "o", "a", "orum", "is", "a", "is");

