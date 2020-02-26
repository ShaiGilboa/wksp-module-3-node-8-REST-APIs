// ... crickets...
let wordId = null;
let guessAmount = 8
let guessedStr = [];
let guessingStr = []
const newWordForm = document.getElementById('new word')
const guessedP = document.getElementById('guessed string')
const guessAmountP = document.getElementById('guess amount')
const guessing = document.getElementById('guessing')

const getWord = (event) => {
    event.preventDefault();
    
    fetch('/hangman/words')
        .then(data => data.json())
        .then(response => {
            if(response.status === 200) {
                const wordLength = response.data.length;
                wordId = response.data.id
                console.log('length ', wordLength)
                for (let i = 0; i < wordLength; i ++){
                    guessingStr.push(' _')
                }
                guessing.innerText = guessingStr.join('')
            }
        })
    newWordForm.style.display = 'none';
    guessAmountP.innerText = guessAmount;
    document.addEventListener('keydown', keyDownHandler)
}

const endOfGame = (status) => {
    document.removeEventListener('keydown', keyDownHandler)
    if (status) {
        console.log('win')
    } else {
        console.log('loser!')
    }
}

const checkLetter = (wordId, letter) => {
    fetch(`/hangman/${wordId}/${letter}`)
        .then(response=>response.json())
        .then(response => {
            const guessArr = response.data;
            if(guessArr.includes(true)){
                for (let i = 0; i<guessArr.length; i++){
                    if(guessArr[i])guessingStr[i] = letter
                }   
                guessing.innerText = guessingStr.join('')
                if(!guessingStr.includes(' _')) endOfGame(true)
            } else {
                guessAmount--;
                guessAmountP.innerText = guessAmount
                if(guessAmount === 0) endOfGame(false);
            }
            guessedStr.push(letter);
            guessedP.innerText = guessedStr.join('')
            
        })
    
}

const keyDownHandler = (event) => {
    if (event.repeat) {return}
    let key = event.code
    let letter = null;
    if(key.slice(0, 3)==='Key'){
        letter = key[(key.length-1)].toLowerCase();
        if(!guessedStr.includes(letter)){
            
            checkLetter(wordId, letter);
        }
    }
}

