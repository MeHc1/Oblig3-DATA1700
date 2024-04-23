function kjopBillett() {
    const film = $("#film").val();
    if(film === "Velg film her" || !film){
        $("#eFilm").html("Film må velges");
    } else{
        $("#eFilm").html("");
        //tømmer error tekst gitt at bruker korrigerer feil
    }
    const antall = $("#antall").val();
    if(!antall){
        $("#eAntall").html("Antall må fylles ut");
    } else if(antall <= 0) {
        $("#eAntall").html("Ugyldig verdi, legg inn et tall større enn null");
    } else{
        $("#eAntall").html("");
    }
    const fornavn = $("#fornavn").val();
    if(!fornavn){
        $("#eFornavn").html("Fornavn må fylles ut");
    } else if(!gyldigFornavn(fornavn)){
        $("#eFornavn").html("Ugyldig verdi");
    } else{
        $("#eFornavn").html("");
    }
    const etternavn = $("#etternavn").val();
    if(!etternavn){
        $("#eEtternavn").html("Etternavn må fylles ut");
    } else if(!gyldigEtternavn(etternavn)){
        $("#eEtternavn").html("Ugyldig verdi");
    } else{
        $("#eEtternavn").html("");
    }
    const telefonnr = $("#telefonnr").val();
    if(!telefonnr){
        $("#eTelefonnr").html("Telefonnummer må fylles ut");
    } else if (!gyldigTelefonnr(telefonnr)) {
        $("#eTelefonnr").html("Ugyldig telefonnummer");
    } else{
        $("#eTelefonnr").html("");
    }
    const epost = $("#epost").val();
    if(!epost){
        $("#eEpost").html("Epost må fylles ut");
    } else if(!gyldigEpost(epost)){
        $("#eEpost").html("Ugyldig epost");
    } else{
        $("#eEpost").html("");
    }
    if(film === "Velg film her" || !antall || !fornavn || !etternavn ||
        !telefonnr || !epost || !gyldigTelefonnr(telefonnr) || !gyldigEpost(epost)){
        return false;
        //stopper registrering av billett dersom det er oppgitt feile verdier eller obligatoriske felt ikke er fylt ut
    }

    const billett = {
        film: $("#film").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val(),
    };

    $.post("/lagre", billett, function(){
        visAlleBilletter();
    });

    //setter verdiene i feltene tilbake til start
    $("#film").val("Velg film her");
    $("#antall").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
    }
    function visAlleBilletter(){
        $.get("/hentAlle", function(billetter){
            formaterData(billetter);
        })
    }
    function formaterData(billetter){
    let ut = "<table class='table table-striped'><tr>" +
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
        "</tr>";
    for (let bestilling of billetter){
        ut+="<tr>";
        ut+="<td>"+bestilling.film+"</td><td>"+bestilling.antall+"</td><td>"+bestilling.fornavn+"</td><td>"+
        bestilling.etternavn+"</td><td>"+bestilling.telefonnr+"</td><td>"+bestilling.epost+"</td>";
    }
    ut+="</tr>";
    $("#alleBilletter").html(ut);
}

function slettBilletter() {
    $.get("/slettAlle", function(){
        visAlleBilletter();
    });
}

function gyldigEpost(epost){
    const epostRegex = /^[a-åA-Å0-9.-]+@[a-åA-Å0-9-]+\.[a-Å]{2,3}$/;
    return epostRegex.test(epost);
    /*
    Tester at epost følger en gitt struktur. Lagt opp til 4 ledd:
    - Første ledd: store/små bokstaver, tall mellom 0-9, noen tegn (kunne tillatt flere)
    - Andre ledd: må være en alfakrøll
    - Tredje ledd: store/små bokstaver, tall mellom 0-9, ett tegn (-)
    - Fjerde ledd: punktum + to til tre bokstaver
    Ifølge w3school kunne man benyttet input type="email" i html-en. Et alternativ til det ovenstående.
    * */
}

function gyldigTelefonnr(telefonnr){
    const telefonnrRegex = /^[0-9]{8}$/;
    return telefonnrRegex.test(telefonnr);
    //tester at telefonnr er tall. Ikke hensyntatt at mønster utover det, eks at det må starte med [4|9]
}
function gyldigFornavn(fornavn){
    const tekstRegex = /^[a-åA-Å]+$/;
    return tekstRegex.test(fornavn);
}
function gyldigEtternavn(etternavn) {
    const tekstRegex = /^[a-åA-Å]+$/;
    return tekstRegex.test(etternavn);
}
