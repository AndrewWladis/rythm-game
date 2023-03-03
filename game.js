//have an array of songs
//also play audio
const song = [0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75]
//above is the time for each beat
const left = document.getElementById('left');
const right = document.getElementById('right');
const scoreHeader = document.querySelector('.score');
let isLeftPlayerDead = true;
let isRightPlayerDead = true;
let hexString = "0123456789abcdef";
let leftScore = 0;
let rightScore = 0;

function randomColor() {
    let hexCode = "#";
    for( i=0; i<6; i++){
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}

function generateGrad(ele) {
    let colorOne = randomColor();
    let colorTwo = randomColor();
    let angle = Math.floor(Math.random() * 360);
    ele.style.boxShadow = `0 0 7.5px 3.75px ${colorOne}, 0 0 12.5px 7.5px ${colorTwo}`;
    ele.style.background = `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
}

function createTile() {
    let tile = document.createElement('div');
    generateGrad(tile);
    tile.classList.add('tile');
    setTimeout(() => {
        tile.remove();
    }, 1000) 
    return tile;
}

function removeAndAddToScore(side, path) {
    let locationDiv = document.getElementById(side);
    let location = locationDiv.getElementsByTagName('div')[1].getElementsByTagName('div')[path];
    if (location.children.length > 0) {
        side === 'left' ? leftScore++ : rightScore++;
        let sideScore = side === 'left' ? leftScore : rightScore;
        location.removeChild(location.children[0]);
        locationDiv.getElementsByTagName('div')[0].innerText = `SCORE: ${sideScore}`;
    }
}

function startGame() {
    let newArr = [];
    leftScore = 0;
    rightScore = 0;
    isLeftPlayerDead = false;
    isRightPlayerDead = false;
    for (let i = 0; i < song.length; i++) {
        let randomPath = Math.floor(Math.random() * 3);
        console.log(randomPath)
        setTimeout(() => {
            if (!isLeftPlayerDead) {
                let newTile = createTile();
                left.getElementsByTagName('div')[1].getElementsByTagName('div')[randomPath].appendChild(newTile);
            }
            if (!isRightPlayerDead) {
                let newTile = createTile();
                right.getElementsByTagName('div')[1].getElementsByTagName('div')[randomPath].appendChild(newTile);
            }
            
        }, newArr.reduce((partialSum, a) => partialSum + a, 0) * 1000);
        newArr.push(song[i]);
    }
}

let countdown = document.createElement('h1');
countdown.id = 'countdown';
countdown.innerText = '3';
document.body.appendChild(countdown);
setTimeout(() => {
    let header = document.getElementById('countdown');
    header.innerText = '2';
    setTimeout(() => {
        header.innerText = '1';
        setTimeout(() => {
            header.innerText = 'GO!';
            setTimeout(() => {
                header.remove();
                startGame();
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)

window.onkeypress = function (e) {
    e = e || window.event;
    if (!isLeftPlayerDead) {
        if (e.key === 'a') {
            removeAndAddToScore('left', 0);
        } else if (e.key === 's') {
            removeAndAddToScore('left', 1);
        } else if (e.key === 'd') {
            removeAndAddToScore('left', 2);
        }
    }
    if (!isRightPlayerDead) {
        if (e.key === 'l') {
            removeAndAddToScore('right', 0);
        } else if (e.key === ';') {
            removeAndAddToScore('right', 1);
        } else if (e.key === "'") {
            removeAndAddToScore('right', 2);
        }
    }
};