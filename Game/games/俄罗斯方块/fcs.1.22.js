function $(a) {
    return document.getElementById(a)
}
var _tflag = false;
window.addEventListener('touchstart', (b) => {
    _tflag = true;
    mousedown(b.touches[0].clientX, b.touches[0].clientY)
}
);
window.addEventListener('touchend', (b) => {
    mouseup()
}
);
window.addEventListener('mousedown', (b) => {
    if (_tflag) {
        return
    }
    ; mousedown(b.clientX, b.clientY)
}
);
window.addEventListener('mouseup', (b) => {
    mouseup()
}
);
function mousedown(ba, bb) {
    if (gameState != 1) {
        return
    }
    ; var Z = canvasBox.getBoundingClientRect();
    ba = Math.floor((ba - Z.left) / cs);
    bb = Math.floor((bb - Z.top) / cs);
    var bc, bd, be, bf;
    bc = bd = sMov[0][1];
    be = bf = sMov[0][0];
    for (var i = 1; i < 4; i++) {
        var Y = sMov[i];
        if (Y[1] < bc) {
            bc = Y[1]
        } else {
            if (Y[1] > bd) {
                bd = Y[1]
            }
        }
        ; if (Y[0] < be) {
            be = Y[0]
        } else {
            if (Y[0] > bf) {
                bf = Y[0]
            }
        }
    }
    ; if (ba < bc) {
        if (rightLock) {
            clearTimeout(rightStop)
        }
        ; leftLock = true;
        hcount = bc - ba;
        moveToLeft()
    } else {
        if (ba > bd) {
            if (leftLock) {
                clearTimeout(leftStop)
            }
            ; rightLock = true;
            hcount = ba - bd;
            moveToRight()
        } else {
            bb += 5;
            if (bb >= be) {
                moveToDeep()
            } else {
                rotate('r')
            }
        }
    }
}
function mouseup() {
    if (gameState != 1) {
        return
    }
    ; if (leftLock) {
        clearTimeout(leftStop)
    }
    ; if (rightLock) {
        clearTimeout(rightStop)
    }
}
function startgame() {
    $("start").style.display = "none";
    $("more").style.display = "none";
    gameBorder.style.display = "block";
    gameStart();
    event.stopPropagation()
}
function toNegative(A) {
    return A <= 0 ? A : -A
}
function random(bo, W) {
    return Math.floor(Math.random() * (W - bo + 1) + bo)
}
function* randGenerator() {
    let bn = [];
    while (true) {
        if (bn.length === 0) {
            bn = [1, 2, 3, 4, 5, 6, 7];
            kShuffle(bn)
        }
        ; yield bn.pop()
    }
}
function kShuffle(U) {
    let X, W;
    for (let i = U.length - 1; i >= 0; i--) {
        W = U[i];
        X = random(0, i);
        U[i] = U[X];
        U[X] = W
    }
}
function copyAtoB(f, E) {
    if (f.length === E.length) {
        let i = f.length;
        while (i--) {
            E[i][0] = f[i][0];
            E[i][1] = f[i][1]
        }
    }
}
function c4a() {
    return [[0, 0], [0, 0], [0, 0], [0, 0]]
}
function clone(D) {
    if (D === null || typeof D !== "object") {
        return D
    }
    ; if (Array.isArray(D)) {
        let C = [];
        for (let i = 0; i < D.length; i++) {
            C[i] = clone(D[i])
        }
        ; return C
    }
    ; if (typeof D === "object") {
        let C = {};
        for (let B in D) {
            if (D.hasOwnProperty(B)) {
                C[B] = clone(D[B])
            }
        }
        ; return C
    }
}
function getTopAndLow(U) {
    let V = U[0][0]
        , E = V;
    for (let i = 1; i < U.length; i++) {
        if (U[i][0] < V) {
            V = U[i][0]
        } else {
            if (U[i][0] > E) {
                E = U[i][0]
            }
        }
    }
    ; return [V, E]
}
function objCopy(j, bm) {
    let bl = Object.keys(j);
    for (let q of bl) {
        bm[q] = j[q]
    }
}
$("speed").value = localStorage.getItem("speed") || 1000;
$("acc").value = localStorage.getItem("acc") || 2;
const clearSound = document.querySelector('#clear-sound');
const lockSound = document.querySelector('#lock-sound');
const offsound = document.querySelector('#off-sound');
const tetris = {
    1: [[3, 4], [3, 5], [4, 5], [4, 4]],
    2: [[4, 3], [4, 4], [4, 5], [4, 6]],
    3: [[4, 3], [4, 5], [3, 4], [4, 4]],
    4: [[3, 3], [3, 4], [4, 5], [4, 4]],
    5: [[3, 4], [3, 5], [4, 3], [4, 4]],
    6: [[4, 3], [4, 5], [3, 3], [4, 4]],
    7: [[4, 3], [4, 5], [3, 5], [4, 4]]
};
const tetrisColor = ["#1E1E1E", "#EEE685", "#B9D3EE", "#f54ff5", "#f56565", "#32CD32", "#4faaf5", "#ffa500", "#999999"];
const createColor = (c) => {
    return tetrisColor[c]
}
    ;
const table = [];
for (let i = 0; i <= 24; i++) {
    table.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}
; let moving, old, sMov = c4a();
let rtype = []
    , rlist = [];
let tetrisType, tetrisStage;
let gameState = 0;
const readyNum = 6;
const randList = randGenerator();
const rand = () => {
    return randList.next().value
}
    ;
const QS = (d) => {
    return document.querySelector(d)
}
    ;
const QSA = (d) => {
    return document.querySelectorAll(d)
}
    ;
const canvasBox = QS('#canvas-box');
const bgLayerEl = QS('#bg-layer');
const cubeShadowLayerEl = QS('#cube-shadow-layer');
const bgCanvas = bgLayerEl.getContext("2d");
const cuShCanvas = cubeShadowLayerEl.getContext("2d");
let isDrawBg = false;
let isDrawCS = true;
const hcanvas = QS('#saveCubeBox');
const hpix = hcanvas.getContext("2d");
const LineDisplay = QS("#score");
const SpeedDisplay = QS("#sinfo");
const bg = QS('html');
const gameBorder = QS('#game-border');
const gameover = QS('#u-gameover');
let realWidth, realHeight, gap = 30, cs;
let scanvasWidth, scanvasHeight;
let amt_w;
const alphalist = [0.9, 0.5, 0.6, 1];
var sHeight, sWidth;
function setMainCanvas() {
    sHeight = document.body.clientHeight;
    sWidth = document.body.clientWidth;
    cs = Math.floor((sHeight - gap) / 20);
    realHeight = cs * 20;
    realWidth = amt_w = cs * 10;
    hcanvas.width = cs * (9 + 7);
    hcanvas.height = cs;
    let bA, bz = 0;
    hpix.translate(cs / 2, cs / 2);
    for (let A, i = 1; i <= (7 + 1 + 7); i++) {
        if (i < 9) {
            bA = createColor(i)
        } else {
            !bz && (bz = 0.4);
            bA = createColor(i - 8)
        }
        ; hpix.fillStyle = bA;
        A = 4;
        while (A--) {
            hpix.globalAlpha = alphalist[A] - bz;
            hpix.beginPath();
            hpix.moveTo(0, 0);
            hpix.lineTo(-cs / 2, -cs / 2);
            hpix.lineTo(cs / 2, -cs / 2);
            hpix.fill();
            hpix.rotate(Math.PI * 0.5)
        }
        ; hpix.translate(cs, 0)
    }
    ; canvasBox.style.width = realWidth + 'px';
    canvasBox.style.height = realHeight + 'px';
    bgLayerEl.width = cubeShadowLayerEl.width = realWidth;
    bgLayerEl.height = cubeShadowLayerEl.height = realHeight
}
function drawBg() {
    bgCanvas.clearRect(0, 0, realWidth, realHeight);
    let k;
    for (let H = 5; H <= 24; H++) {
        for (let i = 0; i <= 9; i++) {
            k = Math.abs(table[H][i]);
            if (k !== 0) {
                drawCube(bgCanvas, i, H, k)
            }
        }
    }
}
let isDelay, isDelayColor;
function drawCS() {
    cuShCanvas.clearRect(0, 0, realWidth, realHeight);
    sMov.forEach((i) => {
        drawCube(cuShCanvas, i[1], i[0], 8)
    }
    );
    old.forEach((i) => {
        drawCube(cuShCanvas, i[1], i[0], isDelayColor ? tetrisType + 8 : tetrisType)
    }
    )
}
setMainCanvas();
function drawCube(K, L, M, J) {
    K.drawImage(hcanvas, cs * (J - 1), 0, cs, cs, L * cs, (M - 5) * cs, cs, cs)
}
const wallKick = {
    JLSTZ: {
        '0R': [[-1, 0], [-1, +1], [0, -2], [-1, -2]],
        'R0': [[+1, 0], [+1, -1], [0, +2], [+1, +2]],
        'R2': [[+1, 0], [+1, -1], [0, +2], [+1, +2]],
        '2R': [[-1, 0], [-1, +1], [0, -2], [-1, -2]],
        '2L': [[+1, 0], [+1, +1], [0, -2], [+1, -2]],
        'L2': [[-1, 0], [-1, -1], [0, +2], [-1, +2]],
        'L0': [[-1, 0], [-1, -1], [0, +2], [-1, +2]],
        '0L': [[+1, 0], [+1, +1], [0, -2], [+1, -2]]
    },
    I: {
        '0R': [[-2, 0], [+1, 0], [-2, -1], [+1, +2]],
        'R0': [[+2, 0], [-1, 0], [+2, +1], [-1, -2]],
        'R2': [[-1, 0], [+2, 0], [-1, +2], [+2, -1]],
        '2R': [[+1, 0], [-2, 0], [+1, -2], [-2, +1]],
        '2L': [[+2, 0], [-1, 0], [+2, +1], [-1, -2]],
        'L2': [[-2, 0], [+1, 0], [-2, -1], [+1, +2]],
        'L0': [[+1, 0], [-2, 0], [+1, -2], [-2, +1]],
        '0L': [[-1, 0], [+2, 0], [-1, +2], [+2, -1]]
    },
    parse: function (j, g) {
        let l, k, f = ['0', 'R', '2', 'L'], h = {
            '0': 0,
            'R': 1,
            '2': 2,
            'L': 3
        };
        if (g === 'r') {
            l = 1
        } else {
            if (g === 'l') {
                l = -1
            } else {
                if (g === 'o') {
                    l = 2
                }
            }
        }
        ; k = h[j] + l;
        if (k === 4) {
            k = 0
        } else {
            if (k === -1) {
                k = 3
            } else {
                if (k === 5) {
                    k = 1
                }
            }
        }
        ; return [j, f[k]]
    },
    get: function (n, j, g) {
        let m = this.parse(j, g).join('');
        return n === 2 ? this.I[m] : this.JLSTZ[m]
    }
};
wallKick.JLSTZ['02'] = wallKick.JLSTZ['R2'];
wallKick.JLSTZ['RL'] = wallKick.JLSTZ['2L'];
wallKick.JLSTZ['20'] = wallKick.JLSTZ['L0'];
wallKick.JLSTZ['LR'] = wallKick.JLSTZ['0R'];
wallKick.I['02'] = wallKick.I['R2'];
wallKick.I['RL'] = wallKick.I['2L'];
wallKick.I['20'] = wallKick.I['L0'];
wallKick.I['LR'] = wallKick.I['0R'];
function createNewCube() {
    let G, F;
    while (rlist.length < readyNum + 1) {
        G = rand();
        rtype.push(G);
        rlist.push(tetris[G])
    }
    ; tetrisType = rtype.shift();
    F = rlist.shift();
    copyAtoB(F, moving);
    copyAtoB(F, old);
    shadow();
    isDrawCS = true;
    if (tetrisType === 2) {
        straightStage = 0
    }
    ; tetrisStage = '0'
}
function clearLock() {
    if (checkCanDown()) {
        isDelay = false;
        isDelayColor = false;
        clearTimeout(softlock)
    } else {
        if (isDelay) {
            clearTimeout(softlock)
        }
    }
}
function moveOneStep(bi, bj, V) {
    let bh = 4;
    V = V || 1;
    if (bi.length === 4) {
        if (bj === "left") {
            while (bh--) {
                bi[bh][1] -= V
            }
        } else {
            if (bj === "right") {
                while (bh--) {
                    bi[bh][1] += V
                }
            } else {
                if (bj === "down") {
                    while (bh--) {
                        bi[bh][0] += V
                    }
                } else {
                    if (bj === "up") {
                        while (bh--) {
                            bi[bh][0] -= V
                        }
                    }
                }
            }
        }
    }
}
let canMoveUsed = c4a();
function checkCanDown() {
    copyAtoB(moving, canMoveUsed);
    moveOneStep(canMoveUsed, "down");
    for (let i of canMoveUsed) {
        if (i[0] > 24 || table[i[0]][i[1]] < 0) {
            return false
        }
    }
    ; return true
}
function checkIsTouch() {
    for (let i of moving) {
        if (i[1] < 0 || i[1] > 9 || i[0] > 24 || table[i[0]][i[1]] < 0) {
            return true
        }
    }
    ; return false
}
function checkGetScore() {
    let x = [];
    let [z, y] = getTopAndLow(old);
    for (; y >= z; y--) {
        if (table[y].every(function (A) {
            return A !== 0
        })) {
            x.push(y)
        }
    }
    ; return x
}
function shadow() {
    copyAtoB(moving, sMov);
    for (let L = 4; L <= 24; L++) {
        for (let i of sMov) {
            if (i[0] === 24 || table[i[0] + 1][i[1]] < 0) {
                return
            }
        }
        ; moveOneStep(sMov, "down")
    }
}
const BT_start_color = '#fdfd22';
const BT_pause_color = '#ffa500';
function checkEnd() {
    if (table[4].some(function (i) {
        return (i < 0)
    })) {
        stopLoop();
        drawCS();
        gameState = 2;
        resetKeyStatus();
        gameover.style.display = "block";
        return true
    } else {
        return false
    }
}
let softlock;
function downLoop() {
    if (gameState != 1 || isDelay || amt_done) {
        return
    }
    ; moveOneStep(moving, "down");
    if (checkCanDown()) {
        copyAtoB(moving, old)
    } else {
        if (checkIsTouch()) {
            copyAtoB(old, moving)
        } else {
            copyAtoB(moving, old)
        }
        ; DelayDropEnd()
    }
}
function moveToDeep() {
    if (amt_done) {
        return
    }
    ; for (let L = 0; L <= 24; L++) {
        for (let i of moving) {
            if (i[0] === 24 || table[i[0] + 1][i[1]] < 0) {
                if (isDelay) {
                    clearTimeout(softlock);
                    isDelay = isDelayColor = false
                }
                ; copyAtoB(moving, old);
                DropEnd();
                return
            }
        }
        ; moveOneStep(moving, "down")
    }
}
function moveToLeftOrRight(bj) {
    if (amt_done) {
        return
    }
    ; moveOneStep(moving, bj);
    if (checkIsTouch()) {
        copyAtoB(old, moving)
    } else {
        copyAtoB(moving, old);
        shadow();
        if (checkCanDown()) {
            if (isDelay) {
                isDelay = false;
                isDelayColor = false;
                clearTimeout(softlock)
            }
        } else {
            clearTimeout(softlock);
            DelayDropEnd()
        }
    }
}
function DropEnd() {
    old.forEach(function (i) {
        table[i[0]][i[1]] = toNegative(tetrisType)
    });
    stopLoop();
    amt_list = checkGetScore();
    amt_line = amt_list.length;
    if (amt_line) {
        clearTimeout(softlock);
        amt_done = true;
        amt_list.forEach(function (i) {
            table.splice(i, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        });
        isDrawBg = true;
        setAnimate();
        cuShCanvas.clearRect(0, 0, realWidth, realHeight);
        isDrawCS = false;
        soundPlay(clearSound)
    } else {
        isDrawBg = true;
        if (checkEnd()) {
            return
        }
        ; soundPlay(lockSound);
        createNewCube();
        startLoop(false)
    }
}
function DelayDropEnd() {
    isDelay = isDelayColor = true;
    softlock = setTimeout(function () {
        if (!checkCanDown()) {
            DropEnd()
        }
        ; isDelay = isDelayColor = false
    }, lockRange)
}
let gameScore = 0;
let amt_line, amt_list;
let finishLine = 0;
function updateScore() {
    finishLine += amt_line;
    timeSpeed -= amt_line * _acc;
    LineDisplay.innerText = finishLine;
    if (checkEnd()) {
        return
    }
    ; createNewCube();
    startLoop(false);
    amt_done = false
}
function offset(bi, f) {
    let [L, M] = f;
    if (L < 0) {
        moveOneStep(bi, 'left', -L)
    } else {
        if (L > 0) {
            moveOneStep(bi, 'right', L)
        }
    }
    ; if (M < 0) {
        moveOneStep(bi, 'down', -M)
    } else {
        if (M > 0) {
            moveOneStep(bi, 'up', M)
        }
    }
}
let straightStage = 1;
function straightRotate(bi) {
    let bD = (f, M, L) => {
        M && (f[0] += M);
        L && (f[1] += L)
    }
        ;
    if (straightStage === 0) {
        bD(bi[0], -1, +2);
        bD(bi[1], 0, +1);
        bD(bi[2], 1, 0);
        bD(bi[3], +2, -1);
        straightStage = 1
    } else {
        if (straightStage === 1) {
            bD(bi[0], +2, +1);
            bD(bi[1], +1, 0);
            bD(bi[2], 0, -1);
            bD(bi[3], -1, -2);
            straightStage = 2
        } else {
            if (straightStage === 2) {
                bD(bi[0], 1, -2);
                bD(bi[1], 0, -1);
                bD(bi[2], -1, 0);
                bD(bi[3], -2, 1);
                straightStage = 3
            } else {
                if (straightStage === 3) {
                    bD(bi[0], -2, -1);
                    bD(bi[1], -1, 0);
                    bD(bi[2], 0, 1);
                    bD(bi[3], 1, 2);
                    straightStage = 0
                }
            }
        }
    }
}
function rotate(bq) {
    if (amt_done) {
        return
    }
    ; if (tetrisType === 1) {
        if (isDelay) {
            clearTimeout(softlock);
            DelayDropEnd()
        }
        ; return
    }
    ; let bv;
    if (bq === 'r') {
        bv = 1
    } else {
        if (bq === 'l') {
            bv = 3
        } else {
            if (bq === 'o') {
                bv = 2
            }
        }
    }
    ; let bu;
    if (tetrisType === 2) {
        bu = straightStage;
        while (bv--) {
            straightRotate(moving)
        }
    } else {
        let J = moving[3]
            , bw = c4a();
        while (bv--) {
            copyAtoB(moving, bw);
            for (let i, bi, br = 0; br < 3; br++) {
                i = bw[br];
                bi = moving[br];
                if (i[0] > J[0] && i[1] === J[1]) {
                    bi[0] -= 1;
                    bi[1] -= 1
                }
                ; if (i[0] === J[0] && i[1] > J[1]) {
                    bi[0] += 1;
                    bi[1] -= 1
                }
                ; if (i[0] < J[0] && i[1] < J[1]) {
                    bi[1] += 2
                }
                ; if (i[0] < J[0] && i[1] === J[1]) {
                    bi[0] += 1;
                    bi[1] += 1
                }
                ; if (i[0] < J[0] && i[1] > J[1]) {
                    bi[0] += 2
                }
                ; if (i[0] > J[0] && i[1] > J[1]) {
                    bi[1] -= 2
                }
                ; if (i[0] > J[0] && i[1] < J[1]) {
                    bi[0] -= 2
                }
                ; if (i[0] === J[0] && i[1] < J[1]) {
                    bi[0] -= 1;
                    bi[1] += 1
                }
            }
        }
    }
    ; let bt = c4a();
    copyAtoB(moving, bt);
    if (checkIsTouch()) {
        let bs = wallKick["get"](tetrisType, tetrisStage, bq);
        for (let i = 0; i <= 3; i++) {
            offset(moving, bs[i]);
            if (!checkIsTouch()) {
                clearLock();
                tetrisStage = wallKick.parse(tetrisStage, bq)[1];
                copyAtoB(moving, old);
                shadow();
                break
            } else {
                if (i === 3) {
                    if (tetrisType === 2) {
                        straightStage = bu
                    }
                    ; copyAtoB(old, moving);
                    shadow();
                    return
                }
                ; copyAtoB(bt, moving)
            }
        }
    } else {
        clearLock();
        tetrisStage = wallKick.parse(tetrisStage, bq)[1];
        copyAtoB(moving, old);
        shadow()
    }
    ; if (!checkCanDown()) {
        DelayDropEnd()
    }
}
let leftLock = false;
let rightLock = false;
let downLock = false;
let deepLock = false;
let leftStop;
let rightStop;
let downStop;
let rotateLock = false;
let rotateLock1 = false;
let rotateLock2 = false;
window.addEventListener('keydown', (p) => {
    let q = toUpper(p.key);
    if (gameState == 0 && q == keyboard.enter) {
        startgame();
        return
    } else {
        if (gameState == 2 && q == keyboard.enter) {
            ShowStart();
            p.stopPropagation();
            return
        }
    }
    ; if (gameState != 1) {
        return
    }
    ; if (q === keyboard.left) {
        if (!leftLock) {
            clearTimeout(rightStop);
            leftLock = true;
            hcount = 10;
            moveToLeft()
        }
    } else {
        if (q === keyboard.right) {
            if (!rightLock) {
                clearTimeout(leftStop);
                rightLock = true;
                hcount = 10;
                moveToRight()
            }
        } else {
            if (q === keyboard.down) {
                if (!downLock) {
                    stopLoop();
                    moveToDown();
                    downLock = true
                }
            } else {
                if (q === keyboard.deep) {
                    if (!deepLock) {
                        moveToDeep();
                        deepLock = true
                    }
                } else {
                    if (q === keyboard.rotate) {
                        if (!rotateLock) {
                            rotate('r');
                            rotateLock = true
                        }
                    } else {
                        if (q === keyboard.rotate1) {
                            if (!rotateLock1) {
                                rotate('l');
                                rotateLock1 = true
                            }
                        } else {
                            if (q === keyboard.rotate2) {
                                if (!rotateLock2) {
                                    rotate('o');
                                    rotateLock2 = true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    ; p.preventDefault()
}
    , false);
window.addEventListener('keyup', (p) => {
    if (gameState != 1) {
        return
    }
    ; let q = toUpper(p.key);
    if (q === keyboard.left) {
        clearTimeout(leftStop);
        leftLock = false
    } else {
        if (q === keyboard.right) {
            clearTimeout(rightStop);
            rightLock = false
        } else {
            if (q === keyboard.deep) {
                deepLock = false
            } else {
                if (q === keyboard.down) {
                    clearTimeout(downStop);
                    downLock = false;
                    startLoop(false)
                } else {
                    if (q === keyboard.rotate) {
                        rotateLock = false
                    } else {
                        if (q === keyboard.rotate1) {
                            rotateLock1 = false
                        } else {
                            if (q === keyboard.rotate2) {
                                rotateLock2 = false
                            }
                        }
                    }
                }
            }
        }
    }
}
    , false);
var hcount;
function moveToLeft(bk = firstDelay) {
    if (hcount < 0) {
        return
    }
    ; hcount--;
    moveToLeftOrRight('left');
    leftStop = setTimeout(() => {
        moveToLeft(repeDelay)
    }
        , bk)
}
function moveToRight(bk = firstDelay) {
    if (hcount < 0) {
        return
    }
    ; hcount--;
    moveToLeftOrRight('right');
    rightStop = setTimeout(() => {
        moveToRight(repeDelay)
    }
        , bk)
}
function moveToDown(bk = firstDelay) {
    downLoop();
    downStop = setTimeout(() => {
        moveToDown(repeDelay)
    }
        , bk)
}
function resetGame() {
    table.forEach((s) => {
        s.forEach((bp, c, U) => {
            U[c] = 0
        }
        )
    }
    );
    stopLoop();
    moving = c4a();
    old = c4a();
    sMov = c4a();
    finishLine = 0;
    timeSpeed = $("speed").value;
    _acc = $("acc").value;
    gameScore = 0;
    LineDisplay.innerText = 0;
    SpeedDisplay.innerText = timeSpeed + "|" + _acc;
    gameState = 0;
    isDelay = false;
    isDelayColor = false;
    resetKeyStatus();
    drawBg();
    drawCS()
}
let timeSpeed, AutoDown;
function startLoop(bC = true) {
    bC && downLoop();
    AutoDown = setTimeout(() => {
        startLoop()
    }
        , timeSpeed)
}
function stopLoop() {
    clearTimeout(AutoDown)
}
function resetKeyStatus() {
    deepLock = false;
    rotateLock = false;
    rotateLock1 = false;
    rotateLock2 = false;
    if (leftLock) {
        leftLock = false;
        clearTimeout(leftStop)
    }
    ; if (rightLock) {
        rightLock = false;
        clearTimeout(rightStop)
    }
    ; if (downLock) {
        downLock = false;
        clearTimeout(downStop)
    }
}
function gameStart() {
    if (gameState == 0) {
        resetGame();
        gameState = 1;
        window.requestAnimationFrame(tableAnimation);
        createNewCube();
        startLoop(false);
        if (!opm_is && opm_step !== 0) {
            opm_step = 0;
            opm_ready = false;
            opm_beginTime = undefined
        }
    }
}
function ShowStart() {
    gameover.style.display = "none";
    gameBorder.style.display = "none";
    $("start").style.display = "block";
    $("more").style.display = "block";
    gameState = 0
}
resetGame();
const bgColor = {
    0: 'rgb(35, 80, 48)',
    1: 'rgb(55, 68, 103)',
    2: 'rgb(30, 30, 30)',
    3: 'rgb(110, 14, 73)'
};
const firstDelay = 150;
const repeDelay = 40;
const lockRange = 400;
let initGameDate = {
    data: [],
    bg: "rgb(30, 30, 30)",
    opm: false,
    frame: undefined,
    offsound: false,
    keyboard: {
        deep: " ",
        left: "ArrowLeft",
        right: "ArrowRight",
        rotate: "ArrowUp",
        down: "Control",
        rotate1: "ArrowDown",
        rotate2: "o",
        pause: "Escape",
        enter: "Enter"
    }
};
localData = clone(initGameDate);
let opm_frame;
let amt_wait, amt_wait_v;
let amt_wait_time = 90;
if (!localData.opm) {
    opm_frame = localData.frame = 1000 / 60
} else {
    opm_frame = localData.frame
}
; amt_wait = amt_wait_v = Math.floor(amt_wait_time / opm_frame);
let opm_is = localData.opm;
let keyboard = localData.keyboard;
bg.style.backgroundColor = localData.bg;
function soundPlay(bB) {
    if (!localData.offsound) {
        if (bB.play) {
            bB.currentTime = 0
        }
        ; bB.play()
    }
}
function getAttribute(P, Q) {
    return P.getAttribute(Q)
}
let optUsedOjb;
function toUpper(k) {
    return k.length === 1 ? /^[a-z]$/.test(k) ? k.toUpperCase() : k : k
}
let amt_done = false;
function getBestFrame(S, w) {
    let R = Math.floor(w / opm_frame);
    let T = Math.floor(S / R);
    return {
        frame: R,
        stepSize: T
    }
}
let amt_h;
const amt_queue = [];
function addFrameQueue(r, s, w) {
    let { frame, stepSize } = getBestFrame(s * cs, w);
    let u = 0;
    r -= 5;
    r += (s - 1);
    while (frame--) {
        u += stepSize;
        amt_queue.push({
            floor: r,
            move: u
        })
    }
    ; amt_queue.push(() => {
        for (let i = 0; i < s; i++) {
            table.splice(r + 5 + amt_base, 1);
            table.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        }
        ; isDrawBg = true;
        cuShCanvas.clearRect(0, 0, realWidth, realHeight)
    }
    );
    amt_queue.push(s)
}
function setAnimate() {
    let w, by = amt_list;
    switch (amt_line) {
        case 1:
            w = 100;
            break;
        case 2:
            w = 150;
            break;
        case 3:
            w = 180;
            break;
        case 4:
            w = 200;
            break
    }
    ; if (by.length === 1) {
        addFrameQueue(by[0], 1, w)
    } else {
        for (let s = 1, bx = by[0], i = 1; i <= by.length; i++) {
            if (by[i] && bx - by[i] === 1) {
                bx = by[i];
                s += 1
            } else {
                addFrameQueue(bx, s, w);
                s = 1;
                bx = by[i]
            }
        }
    }
}
function drawNow(O, N) {
    let { floor, move } = O;
    amt_h = (N ? floor + N : floor) * cs;
    cuShCanvas.fillStyle = '#1E1E1E';
    cuShCanvas.fillRect(0, 0, amt_w, amt_h + cs);
    cuShCanvas.drawImage(bgLayerEl, 0, 0, amt_w, amt_h, 0, move, amt_w, amt_h)
}
let amt_base = 0;
function drawBgAnimate() {
    if (amt_wait) {
        amt_wait--;
        return false
    }
    ; let I;
    if (I = amt_queue.shift()) {
        if (amt_base) {
            drawNow(I, amt_base)
        } else {
            drawNow(I)
        }
    }
    ; if (typeof amt_queue[0] === 'function') {
        (amt_queue.shift())();
        amt_base = amt_queue.shift();
        if (!amt_queue.length) {
            amt_base = 0;
            amt_wait = amt_wait_v;
            return true
        }
    }
    ; return false
}
let opm_ready = false;
let opm_step = 0;
let opm_beginTime;
function tableAnimation() {
    if (isDrawCS) {
        drawCS()
    } else {
        if (drawBgAnimate()) {
            updateScore()
        }
    }
    ; if (isDrawBg) {
        drawBg();
        isDrawBg = false
    }
    ; if (!opm_is) {
        if (!opm_ready) {
            opm_beginTime = new Date().getTime();
            opm_ready = true
        } else {
            opm_step += 1;
            if (opm_step === 60) {
                opm_frame = (new Date().getTime() - opm_beginTime) / 60;
                if (opm_frame > 4 && opm_frame < 20) {
                    localData.opm = opm_is = true;
                    localData.frame = opm_frame;
                    amt_wait = amt_wait_v = Math.floor(amt_wait_time / opm_frame)
                } else {
                    opm_is = true
                }
            }
        }
    }
    ; if (gameState == 1) {
        window.requestAnimationFrame(tableAnimation)
    }
}
