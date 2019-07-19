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
        // Credit: alan9595. Source: https://github.com/allan9595/oop_game-v2-treehouseTech/blob/master/js/Game.js
        $("#overlay").hide();
        if (window.lose) 
            document.getElementsByClassName('lose')[0].className = 'start';
            window.lose = false;
        if (window.win) {
            document.getElementsByClassName('win')[0].className = 'start'; 
            window.win = false;
        }
        this.activePhrase = this.getRandomPhrase(); 
        this.activePhrase.addPhraseToDisplay();
        window.arrayCheck = this.activePhrase.phrase.split("").filter(arrayElement => arrayElement !== " ");
        $('#qwerty').on('click', function(e) {
            if (!active) {
                active = true;
                game.handleInteraction(e);
            }
        });
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
                // Credit: https://www.w3schools.com/jsref/prop_style_cursor.asp
                e.target.style.cursor = 'not-allowed';
            }
        }
    }
    /**
    * Method which checks if all letters in phrase are discovered
    */
    checkForWin() {
        if (window.arrayCheck.length === 0) {
            // Show win screen
            document.getElementsByClassName('start')[0].className = 'win'; 
            document.getElementsByClassName('title')[0].innerHTML = "YOU WIN!";
            // Remove original phrase
            document.getElementById('phrase').children[0].parentNode.removeChild(document.getElementById('phrase').children[0]);
            document.getElementById('phrase').appendChild(document.createElement('ul'));
            // Reset key classes
            for (let i = 0; i < 3; i++) {
                if (i === 0) {
                    for (let j = 0; j < 10; j++) {
                        document.getElementsByClassName('keyrow')[i].children[j].disabled = false;
                        document.getElementsByClassName('keyrow')[i].children[j].removeAttribute('style');
                        document.getElementsByClassName('keyrow')[i].children[j].className = 'key';
                    }
                }
                if (i === 1) {
                    for (let j = 0; j < 9; j++) {
                        document.getElementsByClassName('keyrow')[i].children[j].disabled = false;
                        document.getElementsByClassName('keyrow')[i].children[j].removeAttribute('style');
                        document.getElementsByClassName('keyrow')[i].children[j].className = 'key';
                    }
                }
                if (i === 2) {
                    for (let j = 0; j < 7; j++) {
                        document.getElementsByClassName('keyrow')[i].children[j].disabled = false;
                        document.getElementsByClassName('keyrow')[i].children[j].removeAttribute('style');
                        document.getElementsByClassName('keyrow')[i].children[j].className = 'key';
                    }                   
                }
            }
            // Reset hearts 
            for (let i = 0 ; i < 5; i++) {
                document.getElementById('scoreboard').children[0].children[i].children[0].src = 'images/liveHeart.png';
            };
            game.missed = 0;
            $("#overlay").show();
            window.win = true;

        }
    }
    /**
    * Removes a life by changing image and incrementing `missed`
    */
    removeLife() {
        document.getElementById('scoreboard').children[0].children[4-game.missed].children[0].src = 'images/lostHeart.png';
        if (game.missed === 4) {
            game.gameOver();
        } else {
            game.missed += 1;
        }
    }
    /**
    *   Declares to player that the game is lost and the board resets to default 
    */
    gameOver() {
        // Show lose screen
        document.getElementsByClassName('start')[0].className = 'lose'; 
        document.getElementsByClassName('title')[0].innerHTML = "YOU LOSE!";
        // Remove original phrase
        document.getElementById('phrase').children[0].parentNode.removeChild(document.getElementById('phrase').children[0]);
        document.getElementById('phrase').appendChild(document.createElement('ul'));
        // Reset key classes
        for (let i = 0; i < 3; i++) {
            if (i === 0) {
                for (let j = 0; j < 10; j++) {
                    document.getElementsByClassName('keyrow')[i].children[j].disabled = false;
                    document.getElementsByClassName('keyrow')[i].children[j].removeAttribute('style');
                    document.getElementsByClassName('keyrow')[i].children[j].className = 'key';
                }
            }
            if (i === 1) {
                for (let j = 0; j < 9; j++) {
                    document.getElementsByClassName('keyrow')[i].children[j].disabled = false;
                    document.getElementsByClassName('keyrow')[i].children[j].removeAttribute('style');
                    document.getElementsByClassName('keyrow')[i].children[j].className = 'key';
                }
            }
            if (i === 2) {
                for (let j = 0; j < 7; j++) {
                    document.getElementsByClassName('keyrow')[i].children[j].disabled = false;
                    document.getElementsByClassName('keyrow')[i].children[j].removeAttribute('style');
                    document.getElementsByClassName('keyrow')[i].children[j].className = 'key';
                }                   
            }
        }
        // Reset hearts 
        for (let i = 0 ; i < 5; i++) {
            document.getElementById('scoreboard').children[0].children[i].children[0].src = 'images/liveHeart.png';
        };
        game.missed = 0;
        $("#overlay").show();
        window.lose = true; 
    }
}   