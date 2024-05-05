/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var _color1 = ["rgba(65, 105, 225, 0.7)", "rgba(65, 105, 225, 0.3)", "#f7f7f0", "black", "blue", "green"];
var _color2 = ["#6699cc", "#336699", "#202020", "#e7e7e7", "#99ccff", "#ffff00"];
var _color = Array.from(_color2);
function setcolor() {
    var E = document.body.style;
    var F = document.getElementsByTagName("a");
    if ($("bcolor").checked) {
        localStorage.setItem("night", "1");
        E.backgroundColor = "#202020";
        E.color = "silver";
        for (var i = 0; i < F.length; i++) {
            F[i].style.color = 'silver'
        }
        ;_color = Array.from(_color2)
    } else {
        localStorage.removeItem("night");
        E.backgroundColor = "#f0f0f7";
        E.color = "black";
        for (var i = 0; i < F.length; i++) {
            F[i].style.color = ''
        }
        ;_color = Array.from(_color1)
    }
}
let cw = document.documentElement.clientHeight / 12;
let cw2 = cw / 2;
let cw3 = cw * 2 / 3;
let cw4 = cw * 9 / 20;
let cw5 = cw * 68 / 100;
var wid = [4, 2, 2, 4, 2, 2, 4, 2, 2, 4];
var pos = [];
var temp = 0;
for (var i = 0; i < 10; i++) {
    temp += wid[i];
    pos[i] = temp;
    ;;temp += cw
}
;var arr = [];
var arr2 = [];
let myA = document.getElementById("canA");
let myB = document.getElementById("canB");
let w = cw * 9 + 24;
myA.width = w + 4;
myA.height = w + 4;
myB.width = cw * 9;
myB.height = cw;
let penA = myA.getContext('2d');
let penB = myB.getContext('2d');
if (localStorage.getItem("night") != null) {
    $("bcolor").checked = true
}
;function ArrNum() {
    let h = [];
    for (let i = 1, f = 0; i <= 9; i++,
    f++) {
        h[f] = i
    }
    ;return h
}
function scramble() {
    arrA = ArrNum();
    arrA.sort(function(C, D) {
        return 0.5 - Math.random()
    });
    return arrA
}
function ok() {
    $("info").style.display = "none"
}
Array.prototype.remove = function(c) {
    var b = this.indexOf(c);
    if (b > -1) {
        this.splice(b, 1)
    }
}
;
function getArrB(B, y) {
    let k = ArrNum(1, 9);
    for (let f = 0; f < 9; f++) {
        if (arr[B][f] != 0) {
            k.remove(arr[B][f])
        }
    }
    ;for (let i = 0; i < 9; i++) {
        if (arr[i][y] != 0) {
            k.remove(arr[i][y])
        }
    }
    ;let z = Math.floor(B / 3) * 3;
    let A = Math.floor(y / 3) * 3;
    for (let i = z; i < z + 3; i++) {
        for (let f = A; f < A + 3; f++) {
            if (arr[i][f] != 0) {
                k.remove(arr[i][f])
            }
        }
    }
    ;return k
}
function rArrB(k) {
    let b = Math.floor(Math.random() * k.length);
    return b
}
function calc() {
    for (let i = 0; i < 9; i++) {
        for (let f = 0; f < 9; f++) {
            if (arr[i][f] == 0) {
                let k = getArrB(i, f);
                if (k.length == 0) {
                    return false
                } else {
                    let b = rArrB(k);
                    arr[i][f] = k[b]
                }
            }
        }
    }
    ;return true
}
function dupArr(arr) {
    let x = [];
    for (let i = 0; i < 9; i++) {
        x[i] = [];
        for (let f = 0; f < 9; f++) {
            x[i][f] = arr[i][f]
        }
    }
    ;return x
}
var knum = localStorage.getItem("knum");
if (knum == null) {
    knum = init_num
}
;$("knum").value = knum;
function $(a) {
    return document.getElementById(a)
}
function drawframe() {
    penA.lineWidth = 4;
    penA.strokeStyle = _color[0];
    penA.beginPath();
    for (var i = 0; i < 4; i++) {
        var f = i * 3;
        var v = pos[f] - 2;
        penA.moveTo(0, v);
        penA.lineTo(w, v);
        penA.moveTo(v, 0);
        penA.lineTo(v, w)
    }
    ;penA.lineTo(v, w + 4);
    penA.closePath();
    penA.stroke();
    penA.lineWidth = 2;
    penA.strokeStyle = _color[1];
    penA.beginPath();
    for (var i = 0; i < 9; i++) {
        if (i % 3 != 0) {
            var v = pos[i] - 1;
            penA.moveTo(1, v);
            penA.lineTo(w, v);
            penA.moveTo(v, 1);
            penA.lineTo(v, w)
        }
    }
    ;penA.closePath();
    penA.stroke();
    penA.font = cw5 + "px Symbol";
    penA.textAlign = "center";
    penB.font = cw5 + "px Symbol";
    penB.textAlign = "center"
}
function drawA() {
    var s = 0;
    var u = 2 * Math.PI;
    for (let f = 0; f < 9; f++) {
        for (let i = 0; i < 9; i++) {
            let g = arr[f][i];
            penA.fillStyle = _color[2];
            penA.fillRect(pos[i], pos[f], cw, cw);
            let t = carr[g] == 9;
            if (g != 0) {
                penA.fillStyle = arr2[f][i] == 1 ? _color[5] : t ? "orange" : _color[3];
                penA.fillText(arr[f][i].toString(), pos[i] + cw2, pos[f] + cw3);
                if (curnum == g) {
                    penA.beginPath();
                    penA.arc(pos[i] + cw2, pos[f] + cw2, cw4, 0, u);
                    penA.strokeStyle = t ? "orange" : _color[4];
                    penA.stroke()
                }
            } else {
                s++
            }
        }
    }
    ;if (s == 0) {
        $("gname").innerHTML = "\u6210\u529f";
        setTimeout(function() {
            $("info").style.display = "block"
        }, 200)
    }
    ;penB.fillStyle = _color[2];
    penB.fillRect(0, 0, myB.width, myB.height);
    tpos = 1;
    for (var i = 1; i < 10; i++) {
        let t = carr[i] == 9;
        penB.fillStyle = t ? "orange" : _color[3];
        penB.fillText(i.toString(), tpos + cw2, cw3);
        if (i == curnum) {
            penB.beginPath();
            penB.arc(tpos + cw2, cw2, cw4, 0, u);
            penB.strokeStyle = t ? "orange" : _color[4];
            penB.stroke()
        }
        ;tpos += cw
    }
}
let carr = [];
function toAlign() {
    window.scrollTo(0, $("startbtn").offsetTop - 10)
}
var curnum = 1;
function start() {
    for (var f = 0; f < 9; f++) {
        arr[f] = new Array();
        for (var i = 0; i < 9; i++) {
            arr[f][i] = 0
        }
    }
    ;for (let G = 0; G < 3; G++) {
        let h = scramble(1, 9);
        let b = 0;
        for (let i = G * 3; i < G * 3 + 3; i++) {
            for (let f = G * 3; f < G * 3 + 3; f++) {
                arr[i][f] = h[b];
                b++
            }
        }
    }
    ;let x = dupArr(arr);
    while (!calc()) {
        arr = dupArr(x)
    }
    ;knum = parseInt($("knum").value);
    if (knum > 81) {
        knum = 81
    }
    ;if (knum < 0) {
        knum = 0
    }
    ;$("knum").value = knum;
    localStorage.setItem("knum", knum);
    var J = 0;
    while (J < knum) {
        let I = Math.floor(9 * Math.random());
        let H = Math.floor(9 * Math.random());
        if (arr[I][H] != 0) {
            arr[I][H] = 0;
            J++
        }
    }
    ;for (let i = 0; i < 10; i++) {
        carr[i] = 0
    }
    ;for (let i = 0; i < 9; i++) {
        for (let f = 0; f < 9; f++) {
            carr[arr[i][f]]++
        }
    }
    ;curnum = 1;
    for (var f = 0; f < 9; f++) {
        arr2[f] = new Array();
        for (var i = 0; i < 9; i++) {
            arr2[f][i] = 0
        }
    }
    ;drawA()
}
setcolor();
drawframe();
start();
function redraw() {
    setcolor();
    drawframe();
    drawA()
}
function err(i, f) {
    penA.fillStyle = "red";
    penA.fillRect(pos[i], pos[f], cw, cw);
    penA.fillStyle = "black";
    penA.fillText(arr[f][i].toString(), pos[i] + cw2, pos[f] + cw3)
}
function Check(q, r) {
    var i;
    var p = 0;
    for (i = 0; i < 9; i++) {
        if (arr[r][i] == curnum) {
            err(i, r);
            p = 1
        }
    }
    ;for (i = 0; i < 9; i++) {
        if (arr[i][q] == curnum) {
            err(q, i);
            p = 1
        }
    }
    ;var n = Math.floor(q / 3) * 3;
    var o = Math.floor(r / 3) * 3;
    var l = n + 3;
    var m = o + 3;
    for (var f = o; f < m; f++) {
        for (i = n; i < l; i++) {
            if (arr[f][i] == curnum) {
                err(i, f);
                p = 1
            }
        }
    }
    ;return p
}
myA.onclick = function(d) {
    var d = event || window.event;
    for (var i = 0; i < 9; i++) {
        if (d.offsetX < pos[i]) {
            break
        }
    }
    ;for (var f = 0; f < 9; f++) {
        if (d.offsetY < pos[f]) {
            break
        }
    }
    ;i--;
    f--;
    var g = arr[f][i];
    if (g == 0) {
        if (0 == Check(i, f)) {
            arr[f][i] = curnum;
            arr2[f][i] = 1;
            carr[curnum]++;
            drawA()
        } else {
            setTimeout(drawA, 600)
        }
    } else {
        if (curnum != g) {
            curnum = g
        } else {
            if (arr2[f][i] == 1) {
                arr[f][i] = 0;
                arr2[f][i] = 0;
                carr[curnum]--
            }
        }
        ;drawA()
    }
}
;
myB.onclick = function(d) {
    var d = event || window.event;
    for (var i = 0; i < 9; i++) {
        if (d.offsetX < pos[i]) {
            break
        }
    }
    ;curnum = i;
    drawA()
}
