const OPTS = [ '.','.','.','.','O']
const CONFIG = {
    size: 5
}
const round = 0;

function iniciar() {
    const map = getMap();

    print(map);
}

function print(matriz) {
    let map = '';
    matriz.forEach(arr => {
        let row = '';
        arr.map(item => {
            row += `${item}   `;
        })
        map += `${row}\n`;
    });
    console.log('### Rodada 1 ###')
    console.log(map);
}

function getMap() {
    const map = [];

    for (let index = 0; index < CONFIG.size; index++) {
        const row = getRow();
        map.push(row);
    }
    return map;
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRow() {
    const row = [];
    for (let i = 0 ; i < CONFIG.size ; i++){
      const posicao = getRandom(0, OPTS.length-1);
      row.push(OPTS[posicao]);
    }
    return row;
}

$(document).ready(function(){
    $('#go').click(iniciar);
});

// _        _
//   \_(ツ)_/