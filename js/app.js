/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/** 
 * Listens for click on `#btn__reset` and calls startGame() on game object
 */
document.getElementById('btn__reset').addEventListener('click', function() {
    window.game = new Game(['words dont hurt but looks kill','the best things in life are free','all is well ends well','fake it until you make it','tell it to the judge']);
    window.game.startGame(); // displays the game page
});

$('#qwerty').on('click', function(e) {
    window.game.handleInteraction(e);
});