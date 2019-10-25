const OPTS = ['.', '.', '.', '.', 'O'];
const CONFIG = {
    size: 20,
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
let ROAD = [0, 0];
let ROBO = [0, 0];
const SAIDA = [CONFIG.size - 1, CONFIG.size - 1];

async function iniciar() {

    MAP = getMap();
    //Setando posicao inicial Robô
    setPosition(ROBO[0], ROBO[1], '@');
    //Setando posicao da saida
    //setPosition(CONFIG.size -1, CONFIG.size -1, 'S');
    setPosition(SAIDA[0], SAIDA[1], 'S');
    print(MAP);
    while (!FINISH) {
        // getWeight(ROBO);
        await go();
        finish();
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
    const space = {
        top: getTop(rr, cr),
        right: getRight(rr, cr),
        bottom: getBottom(rr, cr),
        left: getLeft(rr, cr),
    }
    const fuzzy = await fuzzyfication(space);
    const distance = await getDistance(fuzzy);
    const step = await defuzzyfication(distance, space);
    return step;
}


function getRight(r, c) {
    try {
        // console.log('********************')
        const RIGHT = [];
        let right;
        const interval = getInterval(c);

        for (let i = 0; i < interval; i++) {
            RIGHT.push(MAP[r][c + 1 + i]);
        }

        for (let [index, element] of RIGHT.entries()) {
            if (element === 'O') {
                right = index;
                break;
            }
            right = interval;
        }
        // console.log('right', right)
        // console.log('********************')
        return RIGHT.length ? right : 0;
    } catch (error) {
        FINISH = true
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

            bottom = interval;
        }
        // console.log('bottom', bottom)
        // console.log('********************')
        return BOTTOM.length ? bottom : 0;
    } catch (error) {
        FINISH = true
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

        for (let i = 0; i <= interval; i++) {
            TOP.push(MAP[r - i][c]);
        }

        for (let [index, element] of TOP.entries()) {
            if (element === 'O') {
                top = index - 1;
                break;
            }

            top = index;
        }
        // console.log('top', top)
        // console.log('********************')
        return top
    } catch (error) {
        FINISH = true
        console.log('GETTOP', error)
        // console.log('********************')
    }

}

function getLeft(r, c) {
    try {
        const LEFT = [];
        let left;

        const interval = getInverseInterval(c);

        for (let i = 0; i <= interval; i++) {
            LEFT.push(MAP[r][c - i]);
        }

        for (let [index, element] of LEFT.entries()) {
            if (element === 'O') {
                left = index - 1;
                break;
            }
            left = index;
        }
        return left;
    } catch (error) {

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
    if (ROBO[0] === CONFIG.size - 1 && ROBO[1] === CONFIG.size - 1) {
        FINISH = true;
    }
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
    let rows = '';
    matriz.forEach((arr, index) => {
        rows += `${index}   `;
        let row = '';
        arr.map(item => {
            row += `${item}   `;
        })
        map += `${row}\n`;
    });
    console.log(`### Rodada ${ROUND} ###`)
    console.log(rows)
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
        ROAD.push(ROBO);
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
    return distance;
}

async function defuzzyfication(distance, space) {

    const { a, b, c, d } = getPercent();

    if (MAPPER[distance.right] === MAPPER.far) {
        if (space.right = d) {
            return [ROBO[0], ROBO[1] + d];
        }
    } else {
        if (MAPPER[distance.right] === MAPPER.medium) {
            if (space.right === b) {
                return [ROBO[0], ROBO[1] + b];
            } else {
                if (space.right > b && space.right < c) {
                    return [ROBO[0], ROBO[1] + space.right];
                } else {
                    return [ROBO[0], ROBO[1] + c];
                }
            }
        } else {
            if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.far) {
                if (space.right === a) {
                    return [ROBO[0], ROBO[1] + a];
                } else {
                    return [ROBO[0] + d, ROBO[1]];
                }
            } else {
                if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.medium) {
                    if (space.right === a) {
                        return [ROBO[0], ROBO[1] + a];
                    } else {
                        if (space.bottom === b) {
                            return [ROBO[0] + b, ROBO[1]];
                        } else {
                            if (space.bottom > b && space.bottom < c) {
                                return [ROBO[0] + space.bottom, ROBO[1]];
                            } else {
                                return [ROBO[0] + c, ROBO[1]];
                            }
                        }
                    }
                } else {
                    if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.far) {
                        if (space.right === a) {
                            return [ROBO[0], ROBO[1] + a];
                        } else {
                            if (space.bottom === a) {
                                return [ROBO[0] + a, ROBO[1]]
                            } else {
                                return [ROBO[0], ROBO[1] - b];
                            }
                        }
                    } else {
                        if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.medium) {
                            if (space.right === a){
                                return [ROBO[0], ROBO[1] + a];
                            } else {
                                if (space.bottom === a) {
                                    return [ROBO[0] + a, ROBO[1]];
                                } else {
                                    if (space.left === b) {
                                        return [ROBO[0], ROBO[1] - a];
                                    } else {
                                        if (space.left > b && space.left < c) {
                                            return [ROBO[0], ROBO[1] - a];
                                        } else {
                                            return [ROBO[0], ROBO[1] - a]
                                        }
                                    }
                                }
                            }
                        } else {
                            if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.close && MAPPER[distance.top] === MAPPER.far) {
                                if (space.right === a) {
                                    return [ROBO[0], ROBO[1] + a];
                                } else {
                                    if (space.bottom === a) {
                                        return [ROBO[0] + a, ROBO[1]];
                                    } else {
                                        if (space.left === a) {
                                            return [ROBO[0], ROBO[1] - a];
                                        } else {
                                            return [ROBO[0] - b, ROBO[1]];
                                        }
                                    }
                                }
                            } else {
                                if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.close && MAPPER[distance.top] === MAPPER.medium) {
                                    if (space.right === a) {
                                        return [ROBO[0], ROBO[1] + a];
                                    } else {
                                        if (space.bottom === a) {
                                            return [ROBO[0] + a, ROBO[1]];
                                        } else {
                                            if (space.left === a) {
                                                return [ROBO[0], ROBO[1] - a];
                                            } else {
                                                if (space.top === b) {
                                                    return [ROBO[0] - b, ROBO[1]]
                                                } else {
                                                    if (space.top > b && space.top < c) {
                                                        return [ROBO[0] + space.top, ROBO[1]];
                                                    } else {
                                                        return [ROBO[0] + b, ROBO[1]];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (MAPPER[distance.right] === MAPPER.close && MAPPER[distance.bottom] === MAPPER.close && MAPPER[distance.left] === MAPPER.close && MAPPER[distance.top] === MAPPER.close) {
                                        if (space.right === a) {
                                            return [ROBO[0], ROBO[1] + a];
                                        } else {
                                            if (space.bottom === a) {
                                                return [ROBO[0] + a, ROBO[1]];
                                            } else {
                                                if (space.left === a) {
                                                    return [ROBO[0], ROBO[1] - a];
                                                } else {
                                                    if (space.top === a) {
                                                        return [ROBO[0] + a, ROBO[1]];
                                                    } else {
                                                        console.log('VOCE ESTA PRESO')
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
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

function passed(coordenate) {
    let wasPassed = false;
    for (const row of ROAD) {
        if (row === coordenate) {
            isPassed = true;
            break;
        }
    }
    return wasPassed;
}

$(document).ready(function () {
    $('#go').click(iniciar);
});

console.log(`------ DICAS ------
| Caminho: .      |
| Obstáculo: O    |
| Robo: @         |
| Saída: S        |
-------------------`);

// _        _
//  \_(ツ)_/