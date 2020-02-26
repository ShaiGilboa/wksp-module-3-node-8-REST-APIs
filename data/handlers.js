const {words} = require('./words')

const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const homeHandler = (req, res) => {res.redirect('/hangman')}

const wordsHandler = (req, res) => {
    const wordsLength = words.length;
    const guessThis = words[randomNumberInRange(0,wordsLength)];
    res.status(200).send({status: 200, data: {length: guessThis.count, id: guessThis.id}})
}

const findIndexes = (word, letter) => {
    const wordArr = word.split('');
    const indexesArr = wordArr.map(element => element === letter);
    return indexesArr;
}

const checkLetter = (wordId, letter) => {
    const index = words.findIndex(obj => obj.id === wordId);
    const indexes = findIndexes(words[index].word, letter);
    return indexes;
}

const guessHandler = (req, res) => {
    const {wordId, letter} = req.params
    const checked = checkLetter(wordId,letter)
    res.status(200).send({status: 200, data: checked})
}

module.exports = {homeHandler,wordsHandler,guessHandler}