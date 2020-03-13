// ... crickets...
let wordId = null;
let guessAmount = 8
let guessedStr = [];
let guessingStr = []

const guessedP = document.getElementById('guessed string')
const guessAmountP = document.getElementById('guess amount')
const guessing = document.getElementById('guessing')
const startBtn = document.getElementById('start')
const endMessage = document.getElementById('end message')
const anotherBtn = document.getElementById('another')
const gameInfo = document.getElementById('game info')
const endBlock = document.getElementById('end block')
const instructionBtn = document.getElementById('instructions')
const instructionsBox = document.getElementById('instructions-box')
const hintBtn = document.getElementById('hint button')
const theHint = document.getElementById('the hint')

const appendNewX = (img, i) => {
    img = document.createElement('img');
    img.src = '../assets/X.png'
    img.classList.add('x')
    img.id = `x#${i+1}`
    guessing.appendChild(img)
}

const getWord = (event) => {
    hintBtn.addEventListener('click', getHintHandler)
    fetch('/hangman/words')
        .then(data => data.json())
        .then(response => {
            if(response.status === 200) {
                const wordLength = response.data.length;
                wordId = response.data.id
                let img = null;
                let imgWidth = null
                for (let i = 0; i < wordLength; i ++){
                    appendNewX(img, i);
                    guessingStr.push(' _')
                }
                // guessing.innerText = guessingStr.join(' ')
            }
        })
    guessAmountP.innerText = guessAmount;
    document.addEventListener('keydown', keyDownHandler)
}

const anotherGameHandler = (event) => {
    endBlock.classList.add('none')
    guessAmount = 8;
    guessedStr = [];
    guessingStr = [];
    guessedP.innerText = ''
    theHint.innerText = ''
    hintBtn.classList.remove('none')
    while (guessing.firstChild) {
        guessing.removeChild(guessing.lastChild);
    }
    theHint.classList.add('none')
    getWord();
}

const endOfGame = (status) => {
    document.removeEventListener('keydown', keyDownHandler)
    anotherBtn.addEventListener('click', anotherGameHandler)
    endBlock.classList.remove('none')
    if (status) {
        endMessage.innerText = 'Winner!'
    } else {
        endMessage.innerText = 'Loser!'
    }
}

const getLetterGif = (letter) => {
    switch (letter){
        case 'a':
        return A;
        break;
        case 'b':
        return B;
        break;
        case 'c':
        return C;
        break;
        case 'd':
        return D;
        break;
        case 'e':
        return E;
        break;
        case 'f':
        return F;
        break;
        case 'g':
        return G;
        break;
        case 'h':
        return H;
        break;
        case 'i':
        return I;
        break;
        case 'j':
        return J;
        break;
        case 'k':
        return K;
        break;
        case 'l':
        return L;
        break;
        case 'm':
        return M;
        break;
        case 'n':
        return N;
        break;
        case 'o':
        return O;
        break;
        case 'p':
        return P;
        break;
        case 'q':
        return Q;
        break;
        case 'r':
        return R;
        break;
        case 's':
        return S;
        break;
        case 't':
        return T;
        break;
        case 'u':
        return U;
        break;
        case 'v':
        return V;
        break;
        case 'w':
        return W;
        break;
        case 'x':
        return X;
        break;
        case 'y':
        return Y;
        break;
        case 'z':
        return Z;
        break;
    }
}

const checkLetter = (wordId, letter) => {
    fetch(`/hangman/${wordId}/${letter}`)
        .then(response=>response.json())
        .then(response => {
            const guessArr = response.data;
            if(guessArr.includes(true)){
                for (let i = 0; i<guessArr.length; i++){
                    if(guessArr[i]) {
                        guessingStr[i] = letter;
                        let gif = getLetterGif(letter)
                        document.getElementById(`x#${i+1}`).src = gif;
                    }
                }   
                // guessing.innerText = guessingStr.join('')
                if(!guessingStr.includes(' _')) endOfGame(true)
            } else {
                attempt();
            }
            guessedStr.push(letter.toUpperCase());
            guessedP.innerText = guessedStr.join(' ')
        })
}

const attempt = () => {
    guessAmount--;
    guessAmountP.innerText = guessAmount
    if(guessAmount === 1) hintBtn.classList.add('none')
    if(guessAmount === 0) endOfGame(false);
}

const keyDownHandler = (event) => {
    if (event.repeat) {return}
    let key = event.code
    let letter = null;
    if(key.slice(0, 3)==='Key'){
        letter = key[(key.length-1)].toLowerCase();
        if(!guessedStr.includes(letter.toUpperCase())){
            checkLetter(wordId, letter);
        }
    }
}

const getHintHandler = (event) => {
    hintBtn.removeEventListener('click', getHintHandler)
    hintBtn.classList.add('none');
    attempt();
    fetch(`/hint/${wordId}`)
        .then(response => response.json())
        .then(response => {
            if(response.status === 200) {
                theHint.innerText = response.data;
            }
        })
        theHint.classList.remove('none')
}

const startHandler = (event) => {
    startBtn.removeEventListener('click', startHandler)
    startBtn.style.display = 'none';
    gameInfo.classList.remove('none');
    guessing.innerHtml = "";
    guessing.textContent = ''
    while (guessing.firstChild) {
    guessing.removeChild(guessing.lastChild);
    }
    getWord();
}

const leaveInstructionsHandler = (event) => {
    if(event.code==='Space'){
        document.removeEventListener('keydown', leaveInstructionsHandler)
        instructionsBox.classList.add('none')
        instructionBtn.addEventListener('click', instructionsHandler)
        instructionBtn.disabled = false;
        document.addEventListener('keydown', keyDownHandler)

    }
}

const instructionsHandler = (event) => {
    instructionBtn.removeEventListener('click', instructionsHandler)
    document.removeEventListener('keydown', keyDownHandler)
    instructionBtn.disabled = 'true';
    instructionsBox.classList.remove('none')
    document.addEventListener('keydown', leaveInstructionsHandler)
}

instructionBtn.addEventListener('click', instructionsHandler)
startBtn.addEventListener('click', startHandler)