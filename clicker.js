var nbrClick = 0;
var nbrChips = 0;
var bonus = ["marteau", "coup de poing"];
var tabBonusMultiplicateur = ["10", "4"];
var bonusActifs = initialiserBonus(bonus);

var bonusMultiplicateur = 1;

console.log(bonusActifs);






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
}
