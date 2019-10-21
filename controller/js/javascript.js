const OPTS = ['.', '.', '.', '.', 'O'];
const CONFIG = {
    size: 15,
    inteval: 2
};

let ROUND = 0;
let MAP = [[]];
let FINISH = false;

async function iniciar() {
    MAP = getMap();
    //Setando posicao inicial Robô
    setPosition(0, 0, '@');
    //Setando posicao da saida
    setPosition(CONFIG.size - 1, CONFIG.size - 1, 'S');
    print(MAP);
    while (!FINISH) {
        await go();
    }



    print(MAP);
}

async function go() {
    ROUND++;
    let robotPosition = await getRobotPosition();
    console.log(robotPosition);
    const next = getNext();
    setPosition(next[0], next[1], '@');
    setPosition(robotPosition[0, robotPosition[1], '.');
    print(MAP);
    if (ROUND === 2) {
        FINISH = true;
    }
    
}

function getNext() {
    //regras Nebulosas
    CONFIG.inteval;
    return [0, 1]
}


function Nebulosa() {
    let direita = math.max(MpX(), MmX(), MlX());
    let baixo = math.max(MpX(), MmX(), MlX());
    let cima = math.max(MpX(), MmX(), MlX());
    let esquerda = math.max(MpX(), MmX(), MlX());
}


async function getRobotPosition() {
    const arr = MAP.map((row, r) => row.map((column, c) => {
        if (column === '@') {
            return [r, c];
        }
    }));

    return arr[0][0];
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
    console.log(`### Rodada ${ROUND} ###`)
    console.log(map);
}

function setPosition(row, column, element) {
    MAP[row][column] = element;

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
    for (let i = 0; i < CONFIG.size; i++) {
        const posicao = getRandom(0, OPTS.length - 1);
        row.push(OPTS[posicao]);
    }
    return row;
}

function MpX() {
    if (x < 1) {
        return 1;
    } else {
        if (1 < x < 3) {
            return (3 - x) / 2;
        } else {
            return 0;
        }
    }
}

function MmX() {
    if (x < 1) {
        return 0;
    } else {
        if (1 < x < 3) {
            return (x - 1) / 2;
        } else {
            if (3 < x < 4) {
                return 1;
            } else {
                if (4 < x < 5) {
                    return (5 - x) / 1;
                } else {
                    return 0;
                }
            }
        }
    }
}

function MlX() {
    if (x < 4) {
        return 0;
    } if (4 < x < 5) {
        return (x - 4);
    } else {
        return 1;
    }
}


$(document).ready(function () {
    $('#go').click(iniciar);
});

console.log(`------ DICAS ------
| Caminho: .      |
| Obstáculo: 0    |
| Robo: @         |
| Saída: S        |
-------------------`);

// _        _
//   \_(ツ)_/