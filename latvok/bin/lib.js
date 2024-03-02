
//
// vocArray[wortid](inf, bed [regel, sf])
// flag:   0 nichts - 1 substantive - 2 adjektive - 3 verben
// wortid: wortarrays
// stammf: stamm präs pf ppp / stamm gensg genus / pos gensg komp super
// regel: deklklasse / konjklasse / endigkeit
//

numerusliste = new Array("Singular", "Plural");
kasusliste = new Array("Nominativ", "Genitiv", "Dativ", "Akkusativ", "Ablativ");
zeitliste = new Array("Futur", "Präsens", "Imperfekt", "Perfekt", "Plusquamperfekt");
modusliste = new Array("Indikativ", "Konjunktiv");
gvliste = new Array("Aktiv", "Passiv");
personliste = new Array("1. Person", "2. Person", "3. Person");
genusliste = new Array("m", "f", "n");
steigerungliste = new Array("Positiv", "Komparativ", "Superlativ");

endrms = {
    a: [2],
    e: [2],
    //i: [2],
    o: [1],
    u: [2],
    k: [2]
};
endrmspl = {
    a: [4],
    e: [3],
    o: [4],
    u: [3],
    k: [2]
};
endrma = {
    ao: [1, 2, 2],
    k1: [2, 2, 2],
    k2: [2, 2, 2],
    k3: [2, 2, 2]
};
endrmv = {
    a: [1, 1, 2],
    e: [1, 1, 2],
    i: [1, 1, 2],
    k: [1, 1, 2],
    ki: [2, 1, 2],
    ferre: [1, 1, 2],
    esse: [3, 1],
    ire: [2, 1]
};

//
// endrm - kurzmethode
// if (flag == 1) return new Array((regel == "a") ? 1 : 2, 0, 0);
// if (flag == 2) return new Array(2, 2, 2);
// if (flag == 3) return new Array((regel == "ki") ? 2 : 1, 1, 2);
//


vocarray = new Array();
vocarray[0] = new Wort("ut", "dass, damit");
vocarray[1] = new Wort("tum", "da, dann, darauf, damals");
vocarray[2] = new Wort("nam", "denn, deshalb");
vocarray[3] = new Wort("sed", "aber");
vocarray[4] = new Wort("ne", "dass nicht, damit nicht");
vocarray[5] = new Wort("postquam", "nachdem");
vocarray[6] = new Substantiv("serva", "Sklavin", "a", new Array("serv", "f"));
vocarray[7] = new Substantiv("forum", "Forum", "o", new Array("for", "n"), "n");
vocarray[8] = new Substantiv("magistratus", "Magistrat, Beamter", "u", new Array("magistrat", "m"));
vocarray[9] = new Substantiv("plebs", "Volk", "k", new Array("pleb", "f"));
vocarray[10] = new Substantiv("orator", "Redner", "k", new Array("orator", "m"));
vocarray[11] = new Substantiv("dies", "Tag", "e", new Array("di", "m"));
vocarray[12] = new Substantiv("carmen", "Lied, Gedicht", "k", new Array("carmin", "n"), "n");
vocarray[13] = new Adjektiv("libens", "gern", "k1", new Array("libent", "libenti", "libentissim"));
vocarray[14] = new Adjektiv("diligens", "sorgfältig", "k1", new Array("diligent", "diligenti", "diligentissim"));
vocarray[15] = new Adjektiv("magnus", "groß", "ao", new Array("magn", "mai", "maxim"));
vocarray[16] = new Adjektiv("superbus", "überheblich, stolz", "ao", new Array("superb", "superbi", "superbissim"));
vocarray[17] = new Adjektiv("talis", "derartig, ein solcher", "k2", new Array("tal", "tali", "talissim"));
vocarray[18] = new Adjektiv("levis", "leicht", "k2", new Array("lev", "levi", "levissim"));
vocarray[19] = new Adjektiv("acer", "scharf", "k3", new Array("acr", "acri", "acerrim"));
vocarray[20] = new Verb("currere", "rennen", "k", new Array("curr", "cucurr", "currit"));
vocarray[21] = new Verb("facere", "machen", "ki", new Array("fac", "fec", "fact"));
vocarray[22] = new Verb("audire", "hören", "i", new Array("audi", "audiv", "audit"));
vocarray[23] = new Verb("agere", "handeln", "k", new Array("ag", "eg", "act"));
vocarray[24] = new Verb("monere", "mahnen", "e", new Array("mone", "monu", "monit"));
vocarray[25] = new Verb("vocare", "rufen", "a", new Array("voc", "vocav", "vocat"));

adjend = new Array();
adjend[1] = new Array();
adjend[1][0] = new Array(new Array("or", "oris", "ori", "orem", "ore"), new Array("ores", "orum", "oribus", "ores", "oribus"));
adjend[1][1] = new Array(new Array("or", "oris", "ori", "orem", "ore"), new Array("ores", "orum", "oribus", "ores", "oribus"));
adjend[1][2] = new Array(new Array("us", "oris", "ori", "us", "ore"), new Array("ora", "orum", "oribus", "ora", "oribus"));
adjend[2] = new Array();
adjend[2][0] = new Array(new Array("us", "i", "o", "um", "o"), new Array("i", "orum", "is", "os", "is"));
adjend[2][1] = new Array(new Array("a", "ae", "ae", "am", "a"), new Array("ae", "arum", "is", "as", "is"));
adjend[2][2] = new Array(new Array("um", "i", "o", "um", "o"), new Array("a", "orum", "is", "a", "is"));

adjendpos = new Array();
adjendpos["ao"] = new Array();
adjendpos["ao"][0] = new Array(new Array("us", "i", "o", "um", "o"), new Array("i", "orum", "is", "os", "is"));
adjendpos["ao"][1] = new Array(new Array("a", "ae", "ae", "am", "a"), new Array("ae", "arum", "is", "as", "is"));
adjendpos["ao"][2] = new Array(new Array("um", "i", "o", "um", "o"), new Array("a", "orum", "is", "a", "is"));
adjendpos["k1"] = new Array();
adjendpos["k1"][0] = new Array(new Array("", "is", "i", "em", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
adjendpos["k1"][1] = new Array(new Array("", "is", "i", "em", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
adjendpos["k1"][2] = new Array(new Array("", "is", "i", "", "i"), new Array("ia", "ium", "ibus", "ia", "ibus"));
adjendpos["k2"] = new Array();
adjendpos["k2"][0] = new Array(new Array("is", "is", "i", "em", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
adjendpos["k2"][1] = new Array(new Array("is", "is", "i", "em", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
adjendpos["k2"][2] = new Array(new Array("e", "is", "i", "e", "i"), new Array("ia", "ium", "ibus", "ia", "ibus"));
adjendpos["k3"] = new Array();
adjendpos["k3"][0] = new Array(new Array("", "is", "i", "em", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
adjendpos["k3"][1] = new Array(new Array("is", "is", "i", "em", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
adjendpos["k3"][2] = new Array(new Array("e", "is", "i", "e", "i"), new Array("ia", "ium", "ibus", "ia", "ibus"));

adjk1e = new Array();
adjk1e[0] = new Array(new Array(null, null, null, null, "e"), new Array(null, "um", null, null, null));
adjk1e[1] = new Array(new Array(null, null, null, null, "e"), new Array(null, "um", null, null, null));
adjk1e[2] = new Array(new Array(null, null, null, null, "e"), new Array("a", "um", null, "a", null));

subend = new Array();
subend["a"] = new Array(new Array("a", "ae", "ae", "am", "a"), new Array("ae", "arum", "is", "as", "is"));
subend["e"] = new Array(new Array("es", "ei", "ei", "em", "e"), new Array("es", "erum", "ebus", "es", "ebus"));
//subend["i"] = new Array(new Array("", "is", "i", "im", "i"), new Array("es", "ium", "ibus", "es", "ibus"));
subend["o"] = new Array(new Array("us", "i", "o", "um", "o"), new Array("i", "orum", "is", "os", "is"));
subend["u"] = new Array(new Array("us", "us", "ui", "um", "u"), new Array("us", "uum", "ibus", "us", "ibus"));
subend["k"] = new Array(new Array("", "is", "i", "em", "e"), new Array("es", "um", "ibus", "es", "ibus"));

verbendpf = new Array();
verbendpf[0] = new Array();
verbendpf[0][0] = new Array();
verbendpf[0][0][3] = new Array(new Array("i", "isti", "it"), new Array("imus", "istis", "erunt"));
verbendpf[0][0][4] = new Array(new Array("eram", "eras", "erat"), new Array("eramus", "eratis", "erant"));
verbendpf[0][1] = new Array();
verbendpf[0][1][3] = new Array(new Array("um sum", "um es", "um est"), new Array("a sumus", "a estis", "a sunt"));
verbendpf[0][1][4] = new Array(new Array("um eram", "um eras", "um erat"), new Array("a eramus", "a eratis", "a erant"));
verbendpf[1] = new Array();
verbendpf[1][0] = new Array();
verbendpf[1][0][3] = new Array(new Array("erim", "eris", "erit"), new Array("erimus", "eritis", "erint"));
verbendpf[1][0][4] = new Array(new Array("issem", "isses", "isset"), new Array("issemus", "issetis", "issent"));
verbendpf[1][1] = new Array();
verbendpf[1][1][3] = new Array(new Array("um sim", "um sis", "um sit"), new Array("a simus", "a sitis", "a sint"));
verbendpf[1][1][4] = new Array(new Array("um essem", "um esses", "um esset"), new Array("a essemus", "a essetis", "a essent"));

verbend = new Array();
verbend["a"] = new Array();
verbend["a"][0] = new Array();
verbend["a"][0][0] = new Array();
verbend["a"][0][0][0] = new Array(new Array("abo", "abis", "abit"), new Array("abimus", "abitis", "abunt"));
verbend["a"][0][0][1] = new Array(new Array("o", "as", "at"), new Array("amus", "atis", "ant"));
verbend["a"][0][0][2] = new Array(new Array("abam", "abas", "abat"), new Array("abamus", "abatis", "abant"));
verbend["a"][0][1] = new Array();
verbend["a"][0][1][0] = new Array(new Array("abor", "aberis", "abitur"), new Array("abimur", "abimini", "abuntur"));
verbend["a"][0][1][1] = new Array(new Array("or", "aris", "atur"), new Array("amur", "amini", "antur"));
verbend["a"][0][1][2] = new Array(new Array("abar", "abaris", "abatur"), new Array("abamur", "abamini", "abantur"));
verbend["a"][1] = new Array();
verbend["a"][1][0] = new Array();
verbend["a"][1][0][1] = new Array(new Array("em", "es", "et"), new Array("emus", "etis", "ent"));
verbend["a"][1][0][2] = new Array(new Array("arem", "ares", "aret"), new Array("aremus", "aretis", "arent"));
verbend["a"][1][1] = new Array();
verbend["a"][1][1][1] = new Array(new Array("er", "eris", "etur"), new Array("emur", "emini", "entur"));
verbend["a"][1][1][2] = new Array(new Array("arer", "areris", "aretur"), new Array("aremur", "aremini", "arentur"));
verbend["e"] = new Array();
verbend["e"][0] = new Array();
verbend["e"][0][0] = new Array();
verbend["e"][0][0][0] = new Array(new Array("bo", "bis", "bit"), new Array("bimus", "bitis", "bunt"));
verbend["e"][0][0][1] = new Array(new Array("o", "s", "t"), new Array("mus", "tis", "nt"));
verbend["e"][0][0][2] = new Array(new Array("bam", "bas", "bat"), new Array("bamus", "batis", "bant"));
verbend["e"][0][1] = new Array();
verbend["e"][0][1][0] = new Array(new Array("bor", "beris", "bitur"), new Array("bimur", "bimini", "buntur"));
verbend["e"][0][1][1] = new Array(new Array("or", "ris", "tur"), new Array("mur", "mini", "ntur"));
verbend["e"][0][1][2] = new Array(new Array("bar", "baris", "batur"), new Array("bamur", "bamini", "bantur"));
verbend["e"][1] = new Array();
verbend["e"][1][0] = new Array();
verbend["e"][1][0][1] = new Array(new Array("am", "as", "at"), new Array("amus", "atis", "ant"));
verbend["e"][1][0][2] = new Array(new Array("rem", "res", "ret"), new Array("remus", "retis", "rent"));
verbend["e"][1][1] = new Array();
verbend["e"][1][1][1] = new Array(new Array("ar", "aris", "atur"), new Array("amur", "amini", "antur"));
verbend["e"][1][1][2] = new Array(new Array("rer", "reris", "retur"), new Array("remur", "remini", "rentur"));
verbend["i"] = new Array();
verbend["i"][0] = new Array();
verbend["i"][0][0] = new Array();
verbend["i"][0][0][0] = new Array(new Array("am", "es", "et"), new Array("emus", "etis", "ent"));
verbend["i"][0][0][1] = new Array(new Array("o", "s", "t"), new Array("mus", "tis", "unt"));
verbend["i"][0][0][2] = new Array(new Array("ebam", "ebas", "ebat"), new Array("ebamus", "ebatis", "ebant"));
verbend["i"][0][1] = new Array();
verbend["i"][0][1][0] = new Array(new Array("ar", "eris", "etur"), new Array("emur", "emini", "entur"));
verbend["i"][0][1][1] = new Array(new Array("or", "ris", "tur"), new Array("mur", "mini", "ntur"));
verbend["i"][0][1][2] = new Array(new Array("bar", "baris", "batur"), new Array("bamur", "bamini", "bantur"));
verbend["i"][1] = new Array();
verbend["i"][1][0] = new Array();
verbend["i"][1][0][1] = new Array(new Array("am", "as", "at"), new Array("amus", "atis", "ant"));
verbend["i"][1][0][2] = new Array(new Array("rem", "res", "ret"), new Array("remus", "retis", "rent"));
verbend["i"][1][1] = new Array();
verbend["i"][1][1][1] = new Array(new Array("ar", "aris", "atur"), new Array("amur", "amini", "antur"));
verbend["i"][1][1][2] = new Array(new Array("rer", "reris", "retur"), new Array("remur", "remini", "rentur"));
verbend["k"] = new Array();
verbend["k"][0] = new Array();
verbend["k"][0][0] = new Array();
verbend["k"][0][0][0] = new Array(new Array("am", "es", "et"), new Array("emus", "etis", "ent"));
verbend["k"][0][0][1] = new Array(new Array("o", "is", "it"), new Array("imus", "itis", "unt"));
verbend["k"][0][0][2] = new Array(new Array("ebam", "ebas", "ebat"), new Array("ebamus", "ebatis", "ebant"));
verbend["k"][0][1] = new Array();
verbend["k"][0][1][0] = new Array(new Array("ar", "eris", "etur"), new Array("emur", "emini", "entur"));
verbend["k"][0][1][1] = new Array(new Array("or", "eris", "itur"), new Array("imur", "imini", "untur"));
verbend["k"][0][1][2] = new Array(new Array("ebar", "ebaris", "ebatur"), new Array("ebamur", "ebamini", "ebantur"));
verbend["k"][1] = new Array();
verbend["k"][1][0] = new Array();
verbend["k"][1][0][1] = new Array(new Array("am", "as", "at"), new Array("amus", "atis", "ant"));
verbend["k"][1][0][2] = new Array(new Array("erem", "eres", "eret"), new Array("eremus", "eretis", "erent"));
verbend["k"][1][1] = new Array();
verbend["k"][1][1][1] = new Array(new Array("ar", "aris", "atur"), new Array("amur", "amini", "antur"));
verbend["k"][1][1][2] = new Array(new Array("erer", "ereris", "eretur"), new Array("eremur", "eremini", "erentur"));
verbend["ki"] = new Array();
verbend["ki"][0] = new Array();
verbend["ki"][0][0] = new Array();
verbend["ki"][0][0][0] = new Array(new Array("iam", "ies", "iet"), new Array("iemus", "ietis", "ient"));
verbend["ki"][0][0][1] = new Array(new Array("io", "is", "it"), new Array("imus", "itis", "iunt"));
verbend["ki"][0][0][2] = new Array(new Array("iebam", "iebas", "iebat"), new Array("iebamus", "iebatis", "iebant"));
verbend["ki"][0][1] = new Array();
verbend["ki"][0][1][0] = new Array(new Array("iar", "ieris", "ietur"), new Array("iemur", "iemini", "ientur"));
verbend["ki"][0][1][1] = new Array(new Array("ior", "eris", "itur"), new Array("imur", "imini", "iuntur"));
verbend["ki"][0][1][2] = new Array(new Array("iebar", "iebaris", "iebatur"), new Array("iebamur", "iebamini", "iebantur"));
verbend["ki"][1] = new Array();
verbend["ki"][1][0] = new Array();
verbend["ki"][1][0][1] = new Array(new Array("iam", "ias", "iat"), new Array("iamus", "iatis", "iant"));
verbend["ki"][1][0][2] = new Array(new Array("erem", "eres", "eret"), new Array("eremus", "eretis", "erent"));
verbend["ki"][1][1] = new Array();
verbend["ki"][1][1][1] = new Array(new Array("iar", "iaris", "iatur"), new Array("iamur", "iamini", "iantur"));
verbend["ki"][1][1][2] = new Array(new Array("erer", "ereris", "eretur"), new Array("eremur", "eremini", "erentur"));
verbend["esse"] = new Array();
verbend["esse"][0] = new Array();
verbend["esse"][0][0] = new Array();
verbend["esse"][0][0][0] = new Array(new Array("ero", "eris", "erit"), new Array("erimus", "eritis", "erunt"));
verbend["esse"][0][0][1] = new Array(new Array("sum", "es", "est"), new Array("sumus", "estis", "sunt"));
verbend["esse"][0][0][2] = new Array(new Array("eram", "eras", "erat"), new Array("eramus", "eratis", "erant"));
verbend["esse"][1] = new Array();
verbend["esse"][1][0] = new Array();
verbend["esse"][1][0][1] = new Array(new Array("sim", "sis", "sit"), new Array("simus", "sitis", "sint"));
verbend["esse"][1][0][2] = new Array(new Array("essem", "esses", "esset"), new Array("essemus", "essetis", "essent"));
verbend["ire"] = new Array();
verbend["ire"][0] = new Array();
verbend["ire"][0][0] = new Array();
verbend["ire"][0][0][0] = new Array(new Array("ibo", "ibis", "ibit"), new Array("ibimus", "ibitis", "ibunt"));
verbend["ire"][0][0][1] = new Array(new Array("eo", "is", "it"), new Array("imus", "itis", "eunt"));
verbend["ire"][0][0][2] = new Array(new Array("ibam", "ibas", "ibat"), new Array("ibamus", "ibatis", "ibant"));
verbend["ire"][1] = new Array();
verbend["ire"][1][0] = new Array();
verbend["ire"][1][0][1] = new Array(new Array("eam", "eas", "eat"), new Array("eamus", "eatis", "eant"));
verbend["ire"][1][0][2] = new Array(new Array("irem", "ires", "iret"), new Array("iremus", "iretis", "irent"));
verbend["ferre"] = new Array();
verbend["ferre"][0] = new Array();
verbend["ferre"][0][0] = new Array();
verbend["ferre"][0][0][0] = new Array(new Array("am", "es", "et"), new Array("emus", "etis", "ent"));
verbend["ferre"][0][0][1] = new Array(new Array("o", "s", "t"), new Array("imus", "tis", "unt"));
verbend["ferre"][0][0][2] = new Array(new Array("ebam", "ebas", "ebat"), new Array("ebamus", "ebatis", "ebant"));
verbend["ferre"][0][1] = new Array();
verbend["ferre"][0][1][0] = new Array(new Array("ar", "eris", "etur"), new Array("emur", "emini", "entur"));
verbend["ferre"][0][1][1] = new Array(new Array("or", "ris", "tur"), new Array("imur", "imini", "untur"));
verbend["ferre"][0][1][2] = new Array(new Array("ebar", "ebaris", "ebatur"), new Array("ebamur", "ebamini", "ebantur"));
verbend["ferre"][1] = new Array();
verbend["ferre"][1][0] = new Array();
verbend["ferre"][1][0][1] = new Array(new Array("am", "as", "at"), new Array("amus", "atis", "ant"));
verbend["ferre"][1][0][2] = new Array(new Array("rem", "res", "ret"), new Array("remus", "retis", "rent"));
verbend["ferre"][1][1] = new Array();
verbend["ferre"][1][1][1] = new Array(new Array("ar", "aris", "atur"), new Array("amur", "amini", "antur"));
verbend["ferre"][1][1][2] = new Array(new Array("rer", "reris", "retur"), new Array("remur", "remini", "rentur"));
