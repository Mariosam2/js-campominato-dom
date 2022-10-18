/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

const container = document.querySelector('.container');
const button = document.getElementById('generate');
let boxes = [];
//console.log(container);




button.addEventListener('click', ()=>{
    if(!container.classList.contains('generated')){
        generateGrid(100, container);
        boxes = document.querySelectorAll('.box');
        generateNumbersWidth(boxes, 10);
    }
    
});



function generateGrid(cellsNum, domEl){
    for (let i = 1; i <= cellsNum; i++){
        let boxEl = document.createElement('div');
        boxEl.classList.add('box');
        domEl.insertAdjacentElement('afterbegin', boxEl)
    }
    domEl.classList.add('generated');
}

function generateNumbersWidth(domElements, rowNum){
    for(let i = 0; i < domElements.length; i++){
        let number = i;
        let element = domElements[i];
        element.innerText = ++number;
        element.style.width =`calc(100%/${rowNum})`
        element.addEventListener('click', ()=>{
            //console.log(this);
            console.log(element.innerText);
            element.classList.toggle('clicked');
        })
    }

}



