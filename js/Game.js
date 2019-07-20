/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(missed, phrases, activePhrase) {
        this.missed = missed;
        this.phrases = phrases;
        this.activePhrase = activePhrase;
    }
    /**
    * Begins game by getting random phrase, adding it to display, and enabling key interaction
    */
    startGame() {
        // Credit: alan9595. Source: https://github.com/allan9595/oop_game-v2-treehouseTech/blob/master/jsGame.js
        $("#overlay").hide();
        game.gameOver();
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
            gamePhrase.showMatchedLetter(e.target);
            game.checkForWin();
        } else {
            if (e.target.className !==  `keyrow` && e.target.className !==  `section`) {
                game.removeLife();
                e.target.classList.toggle(`wrong`);
                e.target.disabled = true;
                game.checkForWin();
            }
        }
    }
    /**
    * Method which checks if all letters in phrase are discovered
    */
    checkForWin() {
        if (window.arrayCheck.length === 0) {
            document.getElementById('game-over-message').textContent = 'YOU WIN!';
            document.getElementById('overlay').classList.add('win');
            document.getElementById('overlay').classList.remove('lose');
            $('#overlay').show();
            game.gameOver();
        } 
        if (this.missed === 5) {
            document.getElementById('game-over-message').textContent = 'YOU LOSE!';
            document.getElementById('overlay').classList.add('lose');
            document.getElementById('overlay').classList.remove('win');
            $('#overlay').show();
            game.gameOver();
        }
    }
    /**
    * Removes a life by changing image and incrementing `missed`
    */
    removeLife() {
        document.getElementById('scoreboard').children[0].children[4-game.missed].children[0].src = 'images/lostHeart.png';
        game.missed += 1;
    }
    /**
    *   Declares to player that the game is lost and the board resets to default 
    */
    gameOver() {
        // Credit: oculv21. Source: https://github.com/oculv21/OOP-Guessing-Game/tree/master/js
        game.missed = 0;
        const hearts = document.querySelectorAll('.tries img')
        for (let h of hearts) {
            h.setAttribute('src', 'images/liveHeart.png')
        }
        document.getElementById('phrase').innerHTML = '<ul></ul>';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
        const keys = document.getElementsByClassName('key');
        for (let k of keys) {
            k.removeAttribute('disabled');
            if (k.classList.contains('chosen')) {
                k.classList.remove('chosen')
            } else if (k.classList.contains('wrong')) {
                k.classList.remove('wrong');
            }
        }
        window.arrayCheck = this.activePhrase.phrase.split("").filter(arrayElement => arrayElement !== " ");
    }
}   