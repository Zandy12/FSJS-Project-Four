/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

 const game = new Game(0,['words dont hurt but looks kill','the best things in life are free','all is well ends well','fake it until you make it','tell it to the judge'], null);

/** 
 * Listens for click on `#btn__reset` and calls startGame() on game object
 */
document.getElementById('btn__reset').addEventListener('click', function() {
    game.startGame(); // displays the game page
});