const OPTS = ['.', '.', '.', '.', 'O'];
const CONFIG = {
    size: 10,
    interval: 5,
};
const MAPPER = {
    close: 0,
    medium: 1,
    far: 2
}

let ROUND = 1;
let MAP = [[]];
let FINISH = false;
let ROBO = [0, 0];
let TESTE = [0, 0];

async function iniciar() {

    MAP = getMap();
    //Setando posicao inicial Robô
    setPosition(ROBO[0], ROBO[1], '@');
    //Setando posicao da saida
    setPosition(CONFIG.size - 1, CONFIG.size - 1, 'S');
    print(MAP);

    while (!FINISH) {
        console.log('ROBO: ', ROBO);
        finish();
        await go();
    }

    console.log('VOCE ENCONTROU A SAÍDA');
}

async function go() {
    ROUND++;
    const next = await getNext();
    // setPosition(4, 4, '@');
    setPosition(next[0], next[1], '@');
    print(MAP);
}

async function getNext() {
    let rr = ROBO[0];
    let cr = ROBO[1];
    const coordinate = {
        top: getTop(rr, cr),
        right: getRight(rr, cr),
        bottom: getBottom(rr, cr),
        left: getLeft(rr, cr),
    }
    console.log('cordinante: ', coordinate)
    const fuzzy = await fuzzyfication(coordinate);
    const distance = await getDistance(fuzzy);
    const step = await defuzzyfication(distance);
    return step;
}

function getRight(r, c) {
    try {
        // console.log('********************')
        const RIGHT = [];
        let right;
        const interval = getInterval(c);

        for (let i = 0; i <= interval; i++) {
            RIGHT.push(MAP[r][c + 1 + i]);
        }

        for (let [index, element] of RIGHT.entries()) {
            if (element === 'O') {
                right = index;
                break;
            }

            right = index;
        }
        // console.log('right', right)
        // console.log('********************')
        return right
    } catch (error) { FINISH = true
        console.log('GETRIGHT', error)
        // console.log('********************')
    }
}

function getBottom(r, c) {
    try {
        // console.log('********************')
        const BOTTOM = [];
        let bottom;
        const interval = getInterval(r);

        for (let i = 0; i < interval; i++) {
            BOTTOM.push(MAP[r + 1 + i][c]);
        }

        for (let [index, element] of BOTTOM.entries()) {
            if (element === 'O') {
                bottom = index;
                break;
            }

            bottom = index;
        }
        // console.log('bottom', bottom)
        // console.log('********************')
        return bottom
    } catch (error) { FINISH = true
        console.log('GETBOTTOM', error)
        // console.log('********************')
    }
}

function getTop(r, c) {
    try {
        // console.log('********************')
        const TOP = [];
        let top;

        const interval = getInverseInterval(r);

        for (let i = -1; i <= interval; i++) {
            TOP.push(MAP[r + 1 - i][c]);
        }

        for (let [index, element] of TOP.entries()) {
            if (element === 'O') {
                top = index;
                break;
            }

            top = index;
        }
        // console.log('top', top)
        // console.log('********************')
        return top
    } catch (error) { FINISH = true
        console.log('GETTOP', error)
        // console.log('********************')
    }

}

function getLeft(r, c) {
    try {
        // console.log('********************')
        const LEFT = [];
        let left = 0;
        const interval = getInverseInterval(c);
        for (let i = 0; i <= interval; i++) {
            LEFT.push(MAP[r][c - i]);
            console.log('LEFT', LEFT);
        }

        for (let [element, index] of LEFT.entries()) {
            if (element === 'O' || interval === 0) {
                left = index;
                break;
            }
            console.log('index: ', index);
            left = index;
        }
        // console.log('left', left)
        // console.log('********************')
        return left
    } catch (error) { FINISH = true
        console.log('GETLEFT', error)
        // console.log('********************')
    }

}

function getInterval(positionRobot) {
    const interval = CONFIG.interval + positionRobot + 1 >= CONFIG.size
        ? CONFIG.size - (positionRobot + 1)
        : CONFIG.interval;

    return interval;
}

function getInverseInterval(positionRobot) {
    const interval = (CONFIG.interval * (-1)) + positionRobot <= 0
        ? positionRobot
        : CONFIG.interval;

    return interval;
}

function finish() {
    const isFinish = ROBO[0] === CONFIG.size - 1
        && ROBO[1] === CONFIG.size - 1;

    FINISH = isFinish;
}

function getRobotPosition() {
    const arr = MAP.map((row, r) => row.map((column, c) => {
        if (column === '@') {
            return [r, c];
        };
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

    if (element === '@') {
        if ((ROBO[0] !== 0 || ROBO[1] !== 0 || ROUND !== 1)) {
            MAP[ROBO[0]][ROBO[1]] = '.';
        }
        ROBO[0] = row
        ROBO[1] = column;
    }
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

async function fuzzyfication(params) {

    const distance = {
        top: {
            close: maximumClose(params.top),
            medium: maxiumMedium(params.top),
            far: maximumFar(params.top),
        },
        right: {
            close: maximumClose(params.right),
            medium: maxiumMedium(params.right),
            far: maximumFar(params.right),
        },
        bottom: {
            close: maximumClose(params.bottom),
            medium: maxiumMedium(params.bottom),
            far: maximumFar(params.bottom),
        },
        left: {
            close: maximumClose(params.left),
            medium: maxiumMedium(params.left),
            far: maximumFar(params.left)
        }
    }
    console.log(distance)
    return distance;
}

async function defuzzyfication(distance) {

    if (MAPPER[distance.right] === MAPPER.far) {
        return [ROBO[0] + 0, ROBO[1] + 5];
    } else {
        if (MAPPER[distance.right] === MAPPER.medium && MAPPER[distance.bottom] === MAPPER.medium) {
            return [ROBO[0] + 0, ROBO[1] + 2];
        } else {
            if (MAPPER[distance.right] === MAPPER.medium && MAPPER[distance.bottom] === MAPPER.far) {
                return [ROBO[0] + 0, ROBO[1] + 2];
            } else {
                if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.far) {
                    return [ROBO[0] + 5, ROBO[1] + 0];
                } else {
                    if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.medium) {
                        return [ROBO[0] + 2, ROBO[1] + 0];
                    } else {
                        if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.far) {
                            return [ROBO[0] + 0, ROBO[1] - 2];
                        } else {
                            if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.medium) {
                                return [ROBO[0] + 0, ROBO[1] - 1];
                            } else {
                                if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.close && MAPPER[distance.top] === MAPPER.far) {
                                    return [ROBO[0] - 2, ROBO[1] + 0];
                                } else {
                                    if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.close && MAPPER[distance.top] === MAPPER.medium) {
                                        return [ROBO[0] - 1, ROBO[1] - 0]
                                    } else {
                                        console.log('deu merda')
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log('distances', distance);
}

async function getDistance(distance) {
    const cartesian = {
        top: '',
        right: '',
        bottom: '',
        left: ''
    }

    Object.keys(cartesian).map(key => {
        Object.keys(distance[key]).map(subKey => {
            if (distance[key][subKey]) {
                cartesian[key] = subKey;
            }
        })
    });

    return cartesian;
}

function getPercent() {
    const a = CONFIG.interval * 0.2;
    const b = CONFIG.interval * 0.4;
    const c = CONFIG.interval * 0.8;
    const d = CONFIG.interval;

    return { a, b, c, d };
}

function maximumClose(x) {
    const { a, b } = getPercent();

    if (x < a) {
        return 1;
    } else {
        if (x >= a && x <= b) {
            return ((b - x) / (b - a));
        } else {
            return 0;
        }
    }
}

function maxiumMedium(x) {
    const { a, b, c, d } = getPercent();

    if (x < a) {
        return 0;
    } else {
        if (x >= a && x <= b) {
            return ((x - a) / (b - a));
        } else {
            if (x >= b && x <= c) {
                return 1;
            } else {
                if (x >= c && x <= d) {
                    return ((d - x) / (d - c));
                } else {
                    return 0;
                }
            }
        }
    }
}

function maximumFar(x) {
    const { c, d } = getPercent();

    if (x < c) {
        return 0;
    } else {
        if (x >= c && x <= d) {
            return ((x - c) / (d - c));
        } else {
            return 1;
        }
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
//  \_(ツ)_/