var nbrClick = 0;
var nbrChips = 0;
var tabIdBonus = ["poing", "pied", "marteau", "pistolet", "bombeNucleaire"]
var tabBonus = ["\uD83D\uDC4A", "\uD83E\uDDB6", "\uD83D\uDD28", "\uD83D\uDD2B", "\u2622"];
var tabCout = [50, 300, 500, 5000, 99999];
var tabBonusMultiplicateur = [4, 7, 10, 20, 999];
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
    supprimerMessagesErreur();

    /* BONUS */
    miettesDeChips();
    if (sonActive) {
        CHIPS_MP3.pause();
        CHIPS_MP3.currentTime = 0;
        CHIPS_MP3.play();
    }
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
            button.title = "Ce bonus vous permettra d'écraser " + tabBonusMultiplicateur[i] + " chips en plus par clic.";
            button.addEventListener("click", debloquerBonus);
            button.appendChild(nameButton);
            document.getElementById("bonusDispo").appendChild(button);
        }
    }
}

function debloquerBonus() {
    idx = tabIdBonus.indexOf(this.id);
    if (nbrChips >= tabCout[idx]) {
        tabBonusActifs[idx] = true;
        nbrChips -= tabCout[idx];
        bonusMultiplicateur = valeurMultiplicateur();
        afficherBonusDebloques();
        affichageBonusDisponibles();
        actualisationAffichageClickEtChips();
        supprimerMessagesErreur();
        changerCurseur(tabIdBonus[idx]);
    } else {
        let tmp = tabCout[idx] - nbrChips;
        let msg = "Vous ne pouvez pas acheter ce bonus, il vous manque " + tmp + " chips pour le débloquer.";
        document.getElementById("messagesErreur").innerHTML = msg;
    }
}

function afficherBonusDebloques() {
    let tmp = 0;
    let nbrBonus = 0
    let str = "";
    for (let i = 0; i < tabBonusActifs.length; i++) {
        if (tabBonusActifs[i]) {
            str += tabBonus[i];
            tmp += tabBonusMultiplicateur[i];
            nbrBonus++;
        }
    }
    if (nbrBonus > 1) {
        document.getElementById("bonus").title = ("Avec ces bonus débloqués, vous écrasez maintenant " + tmp + " chips par clic.");
    } else {
        document.getElementById("bonus").title = ("Avec ce bonus débloqué, vous écrasez maintenant " + tmp + " chips par clic.");
    }
    document.getElementById("bonus").innerHTML = str;
}

function supprimerMessagesErreur() {
    document.getElementById("messagesErreur").innerHTML = "&nbsp;";
}

function changerCurseur(nom) {
    let url = "url(\"./images/" + nom + ".png\"), default"
    document.getElementById("boutonChips").style.cursor = url;
    document.getElementById("imageChips").style.cursor = url;
}

/* BONUS */

var posL = 0;
var posT = 0;
var sonActive = true;

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
        }, 450)
    }
}

function volumeSon() {
    if (sonActive) {
        document.getElementById("boutonSon").innerHTML = "\uD83D\uDD07";    //Afficher son muet
    } else {
        document.getElementById("boutonSon").innerHTML = "\uD83D\uDD0A";    //Afficher son NON muet
    }
    sonActive = !sonActive;
    return sonActive;
}
