var nbrClick = 0;
var nbrChips = 60;
var tabIdBonus = ["Coupdepoing", "marteau", "pistolet"]
var tabBonus = ["\uD83D\uDC4A", "\uD83D\uDD28", "\uD83D\uDD2B"];
var tabCout = ["20", "40", "60"];
var tabBonusMultiplicateur = [4, 10, 20];
var tabBonusActifs = initialiserBonus(tabBonus);

var bonusMultiplicateur = valeurMultiplicateur();

function valeurMultiplicateur() {    
    let multiplicateur = 0;
    for (let i = 0; i < tabBonusActifs.length; i++) {
        if (tabBonusActifs[i]) {
            multiplicateur += tabBonusMultiplicateur[i];
            console.log("multiplicateur = " + multiplicateur);
        }
    }
    if (multiplicateur == 0) {
        multiplicateur = 1;
    }
    return multiplicateur;
}

function initialiserBonus(tab) {
    let res = [];
    for (let i = 0; i < tab.length; i++) {
        res.push(false);
    }
    return res;
}

function chipsCassee() {
    nbrClick ++;
    nbrChips += bonusMultiplicateur;
    console.log("nbr click : " + nbrClick + " et nbrChips : " + nbrChips);
    actualisationAffichageClickEtChips();
}

function actualisationAffichageClickEtChips() {
    var tmp = document.getElementById("nbrClick")
    document.getElementById("nbrClick").innerHTML = nbrClick;
    document.getElementById("nbrChips").innerHTML = nbrChips;
}

function affichageBonusDisponibles() {
    document.getElementById("bonusDispo").innerHTML = "";
    for (let i = 0; i < tabBonusMultiplicateur.length; i++) {        
        if (!tabBonusActifs[i]) {
            let button = document.createElement("button");
            let nameButton = document.createTextNode(tabBonus[i] + " (" + tabCout[i] + ")");
            button.id = tabIdBonus[i];
            button.type = "button";
            button.addEventListener("click", debloquerBonus);
            button.appendChild(nameButton);
            document.getElementById("bonusDispo").appendChild(button);
        }
    }
}

function debloquerBonus() {
    idx = tabIdBonus.indexOf(this.id);
    let multiplicateur = 0;
    if (nbrChips >= tabCout[idx]) {
        tabBonusActifs[idx] = true;
        nbrChips -= tabCout[idx];
        bonusMultiplicateur = valeurMultiplicateur();
        afficherBonusDebloques();
        affichageBonusDisponibles();
        actualisationAffichageClickEtChips();
    }
}

function afficherBonusDebloques() {
    let str = "";
    for (let i = 0; i < tabBonusActifs.length; i++) {
        if (tabBonusActifs[i]) {
            str += tabBonus[i];
        }
    }
    document.getElementById("bonus").innerHTML = str;
}
