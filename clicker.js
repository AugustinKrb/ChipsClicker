var nbrClick = 0;
var nbrChips = 0;
var tabIdBonus = ["Coupdepoing", "marteau", "pistolet"]
var tabBonus = ["\uD83D\uDC4A", "\uD83D\uDD28", "\uD83D\uDD2B"];
var tabCout = ["20", "40", "60"];
var tabBonusMultiplicateur = [4, 10, 20];
var tabBonusActifs = initialiserBonus(tabBonus);

var bonusMultiplicateur = valeurMultiplicateur();

/* BONUS */
const CHIPS_MP3 = new Audio("./sons/chipsCassee33.mp3");
/* ***** */

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

function chipsCassee(evet) {
    nbrClick ++;
    nbrChips += bonusMultiplicateur;
    console.log("nbr click : " + nbrClick + " et nbrChips : " + nbrChips);
    actualisationAffichageClickEtChips();

    /* BONUS */
    miettesDeChips();
    CHIPS_MP3.pause();
    CHIPS_MP3.currentTime = 0;
    CHIPS_MP3.play();
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

/* BONUS */

const TEMP_ANIMATION = 1000;
var posL = 0;
var posT = 0;

document.addEventListener("mousedown", function(evt) {
    posL = evt.pageX;
    posT = evt.pageY;
}, false);

function miettesDeChips() {
    const TMP = 60;
    for (let i = 0; i < 3; i++) {
        let miette = document.createElement('i');
    
        miette.classList.add('miette');
        //miette.style.left = Math.random() * 50 + '%';
        //miette.style.left = Math.floor(Math.random() * (52 - 48 + 1)) + 48 + "%";
        miette.style.left = posL + Math.random() * TMP + "px";
        miette.style.top = posT + Math.random() * TMP + "px";
        miette.style.opacity = 1;
        miette.style.fontSize = Math.random() * 15 + "px";
        
        document.getElementById("boutonChips").appendChild(miette);
        
        setTimeout(() => {
            miette.remove();
        }, 650)
    }
}
