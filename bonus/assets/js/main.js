/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

const container = document.querySelector('#site_main .container');
const layover = document.querySelector('.layover')
const button = document.getElementById('generate');
const winLose = document.getElementById('win-lose');
const difficulties = document.getElementById('difficulties');
const scoreEl = document.getElementById('score');
let maxCells;
let rowNum;
let bombs = [];
let score;
let boxes = [];





button.addEventListener('click', function () {
    rowNum = Number(difficulties.value);
    maxCells = rowNum * rowNum;
    generateGrid(maxCells, container);
    console.log(bombs);
    boxes = document.querySelectorAll('.box');
    generateNumbersWidth(boxes, rowNum);


});

difficulties.addEventListener('input', ()=>{
    container.classList.remove('generated');
});


// creazione della griglia resettando gli stati precedenti
function generateGrid(cellsNum, domEl) {
    resetGrid();
    for (let i = 1; i <= cellsNum; i++) {
        let boxEl = document.createElement('div');
        boxEl.classList.add('box');
        domEl.insertAdjacentElement('beforeend', boxEl)
    }
    domEl.classList.add('generated');
}
// genero i numerim da aggiungere alle celle e la larghezza delle celle
function generateNumbersWidth(domElements, rowNum) {
    for (let i = 0; i < domElements.length; i++) {
        let number = i;
        let element = domElements[i];
        element.innerText = ++number;
        element.style.width = `calc(100%/${rowNum})`
        element.addEventListener('click', function () {
            //console.log(this);
            console.log(this.innerText);
            // se il numero della cella è una bomba
            if (bombs.includes(Number(this.innerText))) {
                //console.log('Hai perso')
                //aggiungo colore rosso
                element.classList.add('clicked-bomb');
                //aggiungo un div sopra alle box per non permettere più di cliccare dopo aver perso
                layover.classList.add('display');
                //display dello score e del risultato
                winLose.innerHTML = 'Hai perso!'
                scoreEl.innerHTML = `Score: ${score}`;
            } else if (score == maxCells - bombs.length){
                //console.log('Hai vinto');
                element.classList.add('clicked');
                layover.classList.add('display');
                winLose.innerHTML = 'Hai vinto!'
                scoreEl.innerHTML = `Score: ${score}`;
            } else {
                //incremento lo score e display di una casella valida
                element.classList.add('clicked');
                ++score;
            }
            //console.log(score);

        })
    }

}

// reset della griglia rimuovo gli elementi 
function resetGrid() {
    score = 0;
    bombs = generateBombs(maxCells);
    for (let i = boxes.length - 1; i >= 0; i--) {
        boxes[i].remove();
    }
    //console.log(boxes);
    layover.classList.remove('display');
    winLose.innerHTML = '';
    scoreEl.innerHTML = '';
    
    
}


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// creazione delle bombe
function generateBombs(maxCells) {
    let bombs = [];

    while (bombs.length !== 16) {
        let bomb = getRandomArbitrary(1, maxCells);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }

    }
    return bombs;

}



