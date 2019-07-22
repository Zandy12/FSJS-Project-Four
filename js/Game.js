/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(phrases) {
        this.missed = 0;
        this.phrases = phrases;
        this.activePhrase = null;
    }
    /**
    * Begins game by getting random phrase, adding it to display, and enabling key interaction
    */
    startGame() {
        $("#overlay").hide();
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        window.arrayCheck = this.activePhrase.phrase.split("").filter(arrayElement => arrayElement !== " ");
    }
    /**
     * Generates random phrase
     * @returns {string} 
     */
    getRandomPhrase() {
        let phrases = this.phrases;
        window.gamePhrase = new Phrase(phrases[Math.floor(Math.random() * 5)]);
        return gamePhrase;
    }
    /**
    * Adds eventHandler for key buttons and checks if key exists in phrase
    */
    handleInteraction(e) {
        let letterCheck = window.gamePhrase.checkLetter(e.target.innerHTML);
        if (letterCheck) {
            if (e.target.className !==  `keyrow` && e.target.className !==  `qwerty`) {
                e.target.classList.toggle(`chosen`);
                e.target.disabled = true;
            }
            gamePhrase.showMatchedLetter(e.target);
        } else {
            if (e.target.className !==  `keyrow` && e.target.className !==  `section`) {
                game.removeLife();
                e.target.classList.toggle(`wrong`);
                e.target.disabled = true;
            }
        }
        if (game.checkForWin()) {
            game.gameOver();
        }
    }
    /**
    * Method which checks if all letters in phrase are discovered
    */
    checkForWin() {
        if (window.arrayCheck.length === 0 || game.missed === 5) {
            return true;
        }
    }
    /**
    * Removes a life by changing image and incrementing `missed`
    */
    removeLife() {
        if (game.missed <= 4) {
            document.getElementById('scoreboard').children[0].children[4-game.missed].children[0].src = 'images/lostHeart.png';
        }
        if (game.missed === 5) {
            game.gameOver();
        } else {
            game.missed += 1;
        }
    }
    /**
    *   Declares to player that the game is lost and the board resets to default 
    */
    gameOver() {
        if (game.checkForWin() && window.arrayCheck.length === 0) {
            document.getElementById('game-over-message').textContent = 'YOU WIN!';
            document.getElementById('overlay').classList.add('win');
            document.getElementById('overlay').classList.remove('lose');
            $('#overlay').show();
        }
        if (game.checkForWin() && game.missed === 5) {
            document.getElementById('game-over-message').textContent = 'YOU LOSE!';
            document.getElementById('overlay').classList.add('lose');
            document.getElementById('overlay').classList.remove('win');
            $('#overlay').show();
        }
        game.missed = 0;
        // Credit: oculv21. Source: https://github.com/oculv21/OOP-Guessing-Game/tree/master/js
        const hearts = document.querySelectorAll('.tries img')
        for (let h of hearts) {
            h.setAttribute('src', 'images/liveHeart.png')
        }
        document.getElementById('phrase').innerHTML = '<ul></ul>';
        const keys = document.getElementsByClassName('key');
        for (let k of keys) {
            k.removeAttribute('disabled');
            if (k.classList.contains('chosen')) {
                k.classList.remove('chosen')
            } else if (k.classList.contains('wrong')) {
                k.classList.remove('wrong');
            }
        }
    }
}   