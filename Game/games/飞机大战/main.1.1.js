/***************************************************************************/
/*                                                                         */
/*  This obfuscated code was created by Javascript Obfuscator Free Version.*/
/*  Javascript Obfuscator Free Version can be downloaded here              */
/*  http://javascriptobfuscator.com                                        */
/*                                                                         */
/***************************************************************************/
var eArr = [2, 1, 1, 3, 3, 1, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 3, 3, 2, 3, 3, 1, 1, 3, 3, 2];
var _speed = [1, 3, 1, 2];
var _shoot = [0, 0, 0, 1];
var _width = [126, 108, 126, 120];
var _height = [81, 81, 87, 101];
function $(a) {
    return document.getElementById(a)
}
var layout, mystart, scoreshow, plane, fire, boom;
var score;
var layoutw, layouth;
var homebtn, gameoverwnd, startbtn;
var mainthread;
var c1 = 0
  , c2 = 0;
var efly;
var b1fly;
var b2fly;
init = function() {
    layout = $('layout'),
    mystart = $('start'),
    scoreshow = $('score'),
    fire = $("fire");
    boom = $("boom");
    fire.playbackRate = p_r;
    startbtn = $('startBtn');
    homebtn = $('home');
    document.oncontextmenu = function() {
        return false
    }
    ;
    document.onselectstart = function() {
        return false
    }
    ;
    var b = 0;
    startbtn.onclick = function() {
        efly = [];
        b1fly = [];
        b2fly = [];
        layoutw = layout.offsetWidth,
        layouth = layout.offsetHeight;
        score = 0;
        scoreshow.innerHTML = '0';
        scoreshow.style.display = 'block';
        mystart.style.display = 'none';
        homebtn.style.display = 'none';
        plane = document.createElement('div');
        plane.className = 'plane';
        layout.appendChild(plane);
        var g = plane.offsetWidth / 2;
        var f = plane.offsetHeight / 2;
        var d = layoutw / 2;
        var e = layouth - f;
        var l, m;
        var j, k;
        var c;
        plane.style.left = d - g + 'px';
        plane.style.top = e - f + 'px';
        var i = Math.floor(18 * 728064 / (layoutw * layouth));
        mainthread = setInterval(function() {
            var r = 0;
            var s, t;
            for (s = 0; s < b1fly.length; s++) {
                var n = b1fly[s];
                n.style.top = n.offsetTop - 15 + 'px';
                if (n.offsetTop < 1) {
                    layout.removeChild(n);
                    b1fly.splice(s, 1);
                    n = null
                } else {
                    if (r == 0) {
                        for (t = 0; t < efly.length; t++) {
                            var q = efly[t];
                            if (Bump(q, n)) {
                                layout.removeChild(n);
                                b1fly.splice(s, 1);
                                n = null;
                                if (q.blood < 0) {
                                    boom.play();
                                    score += q.score;
                                    scoreshow.innerHTML = score;
                                    layout.removeChild(q);
                                    efly.splice(t, 1);
                                    q = null
                                } else {
                                    q.blood--
                                }
                                ;r = 1;
                                break
                            }
                        }
                    }
                }
            }
            ;for (s = 0; s < b2fly.length; s++) {
                var o = b2fly[s];
                o.style.top = o.offsetTop + o.dy + 'px';
                o.style.left = o.offsetLeft + o.dx + 'px';
                if (o.offsetTop > layouth || o.offsetLeft < 0 || o.offsetLeft > layoutw || o.offsetTop < 0) {
                    layout.removeChild(o);
                    b2fly.splice(s, 1);
                    o = null
                } else {
                    if (Bump(plane, o)) {
                        GameOver();
                        return
                    }
                }
            }
            ;for (t = 0; t < efly.length; t++) {
                var q = efly[t];
                q.style.top = (q.offsetTop + q.pace) + 'px';
                if (q.offsetTop > layouth) {
                    layout.removeChild(q);
                    efly.splice(t, 1);
                    q = null
                } else {
                    if (Bump(q, plane)) {
                        GameOver();
                        return
                    } else {
                        if (q.shoot == 1) {
                            if (++q.c1 > 40) {
                                createBullet2(q);
                                q.c1 = 0
                            }
                        }
                    }
                }
            }
            ;if (++c1 > 2) {
                var p = document.createElement('div');
                p.className = "b1";
                layout.appendChild(p);
                b1fly.push(p);
                p.style.top = (plane.offsetTop - p.offsetHeight) - 10 + 'px';
                p.style.left = (plane.offsetLeft + plane.offsetWidth / 2) - 4 + 'px';
                c1 = 0
            }
            ;if (++c2 > i) {
                createEnemy();
                c2 = 0
            }
        }, 50);
        fire.play();
        document.onmousemove = function(u) {
            if (b) {
                return
            }
            ;plane.style.left = u.clientX - g + 'px';
            plane.style.top = u.clientY - f + 'px'
        }
        ;
        document.ontouchstart = function(z) {
            b = 1;
            j = z.touches[0].clientX;
            k = z.touches[0].clientY;
            var v = j - d;
            var x = k - e;
            var y = x * x;
            var w = v * v;
            l = v == 0 ? 0 : h / (1 + y / w);
            m = x == 0 ? 0 : h / (1 + w / y);
            if (j < d) {
                l = -l
            }
            ;if (k < e) {
                m = -m
            }
            ;moveplane()
        }
        ;
        document.ontouchend = function(z) {}
        ;
        const h = 18;
        moveplane = function() {
            var A = 1;
            d += l;
            if (l < 0 && d < j) {
                A = 0
            } else {
                if (l > 0 && d > j) {
                    A = 0
                }
            }
            ;e += m;
            if (m < 0 && e < k) {
                A = 0
            } else {
                if (m > 0 && e > k) {
                    A = 0
                }
            }
            ;plane.style.left = d - g + 'px';
            plane.style.top = e - f + 'px';
            if (A) {
                c = setTimeout(moveplane, 20)
            }
        }
    }
}
;
createEnemy = function() {
    var z = eArr[~~(Math.random() * 60)];
    var q = document.createElement('div');
    q.className = 'enemy enemy' + z;
    layout.appendChild(q);
    efly.push(q);
    q.style.top = "-70px";
    q.style.left = ~~(Math.random() * (layoutw - _width[z])) + 'px';
    q.blood = _blood[z];
    q.score = _blood[z];
    q.shoot = _shoot[z];
    q.c1 = 0;
    q.pace = _speed[z]
}
;
createBullet2 = function(E) {
    var p = document.createElement('div');
    p.className = "b2";
    layout.appendChild(p);
    b2fly.push(p);
    p.style.top = (E.offsetTop + E.offsetHeight - 10) + 'px';
    p.style.left = (E.offsetLeft + E.offsetWidth / 2 - 4) + 'px';
    var C = plane.offsetLeft + 45 - p.offsetLeft;
    var D = plane.offsetTop + 40 - p.offsetTop;
    var B = Math.sqrt(C * C + D * D);
    p.dy = 5 * D / B;
    p.dx = 5 * C / B
}
;
GameOver = function() {
    fire.pause();
    $('bigboom').play();
    document.onmousemove = null;
    document.ontouchstart = null;
    mystart.style.display = 'block';
    scoreshow.style.display = 'none';
    homebtn.style.display = 'block';
    $("gname").innerHTML = "Game Over";
    while (layout.hasChildNodes()) {
        var F = layout.firstChild;
        layout.removeChild(F);
        F = null
    }
    ;clearInterval(mainthread)
}
;
Bump = function(J, K) {
    var N = J.offsetTop
      , H = J.offsetLeft
      , L = H + J.offsetWidth
      , n = N + J.offsetHeight;
    var O = K.offsetTop
      , I = K.offsetLeft
      , M = I + K.offsetWidth
      , o = O + K.offsetHeight;
    var G = Math.abs(n - o) / 2;
    H += G;
    L -= G;
    N += 8;
    n -= 8;
    if (N > o || n < O || L < I || H > M) {
        return false
    } else {
        return true
    }
}
;
init()
