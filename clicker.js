var nbrClick = 0;
var nbrChips = 0;
var bonus = ["marteau", "coup de poing"];
var bonusActifs = initialiserBonus(bonus);

console.log(bonusActifs);






function initialiserBonus(tab) {
    let res = [];
    for (let i = 0; i < tab.length; i++) {
        res.push(false);
    }
    return res;
}
