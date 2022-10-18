/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

const container = document.querySelector('#site_main .container');
const button = document.getElementById('generate');
const maxCells = 100;
const rowNum = 10;
const bombs = generateBombs(maxCells);
let score = 0;
let boxes = [];
console.log(bombs);




button.addEventListener('click', function () {
    generateGrid(maxCells, container);
    boxes = document.querySelectorAll('.box');
    generateNumbersWidth(boxes, rowNum);


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
            console.log(this);
            console.log(this.innerText);
            if (bombs.includes(Number(this.innerText))) {
                console.log('Hai perso')
                element.classList.add('clicked-bomb');
            } else {
                element.classList.add('clicked');
                ++score;
            }
            console.log(score);

        })
    }

}

// reset della griglia rimuovo gli elementi 
function resetGrid() {
    for (let i = boxes.length - 1; i >= 0; i--) {
        boxes[i].remove();
    }
    console.log(boxes);

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



