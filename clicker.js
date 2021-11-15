var nbrClick = 0;
var nbrChips = 0;
var tabIdBonus = ["Coupdepoing", "marteau", "pistolet"]
var tabBonus = ["\uD83D\uDC4A", "\uD83D\uDD28", "\uD83D\uDD2B"];
var tabCout = ["20", "40", "60"];
var tabBonusMultiplicateur = ["4", "10", "20"];
var tabBonusActifs = initialiserBonus(tabBonus);

var bonusMultiplicateur = 1;

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
    document.getElementById("nbrClick").innerHTML=nbrClick;
    document.getElementById("nbrChips").innerHTML=nbrChips;
}

function affichageBonusDisponibles() {
    for (let i = 0; i < tabBonusMultiplicateur.length; i++) {        
        var button = document.createElement("button");
        var nameButton = document.createTextNode(tabBonus[i] + " (" + tabCout[i] + ")");
        button.id = tabIdBonus[i];
        button.type = "button";
        button.addEventListener("click", test);
        button.appendChild(nameButton);
        document.getElementById("bonusDispo").appendChild(button);
    }
}

function test() {
    console.log("coucou, je suis le onclicker");
}
