/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase;
    }
    /**
    * Appends li elements containing letters in the phrase into HTML for display
    */
    addPhraseToDisplay() {
        let phraseArray = this.phrase.split("");
        for (let i = 0; i < phraseArray.length; i++) {
            if (phraseArray[i] === " ") {
                let li = document.createElement('li');
                li.className = `space`;
                li.appendChild(document.createTextNode(phraseArray[i]));
                document.getElementById('phrase').children[0].appendChild(li);                   
            } else {
                let li = document.createElement('li');
                li.className = `hide letter ${phraseArray[i]}`;
                li.appendChild(document.createTextNode(phraseArray[i]));
                document.getElementById('phrase').children[0].appendChild(li);
            }         
        }
    }
    /**
    * For loop checking if key pressed contains same letter in phrase
    */
    checkLetter(arg) {
        window.array = this.phrase.split("");
        let i = 0;
        while (i < window.array.length) {
            if (arg === window.array[i]) {
                return true;
            } 
            i++;
        }
    }
    /**
    * Reveals correct letters on board and disables the letter's key
    */
    showMatchedLetter(arg) {
        let letterToBeChanged = document.getElementsByClassName(`hide letter ${arg.innerHTML}`);
        let i = 0;
        while (i < letterToBeChanged.length) {
            letterToBeChanged[i].classList.toggle(`show`);
            i++;
        }
        let j = 0;
        while (j < window.arrayCheck.length) {
            if (window.arrayCheck[j] === arg.innerHTML) { 
                window.arrayCheck = window.arrayCheck.filter(arrayElement => arrayElement !== window.arrayCheck[j]);
            }
            j++;
        }
    }
}

