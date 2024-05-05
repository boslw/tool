//更新日期：2020-8-21

const log = console.log;

function toNegative(n) {
    return n <= 0 ? n : -n;
}

function random(begin, end) {
  return Math.floor(Math.random() * (end - begin + 1) + begin);
}

function* randGenerator () {
    let bag = [];
    while (true) {
        if (bag.length === 0) {
            bag = [1,2,3,4,5,6,7];
            kShuffle(bag);
        }
        yield bag.pop();
    }
}

// Knuth-Shuffle
function kShuffle(arr) {
  let ridx, end;
  for (let i = arr.length - 1; i >= 0; i--) {
      end = arr[i];
      ridx = random(0, i);
      arr[i] = arr[ridx];
      arr[ridx] = end;
  }
}

function copyAtoB(a, b) {
    if (a.length === b.length) {
      let i = a.length;
      while (i--) {
        b[i][0] = a[i][0];
        b[i][1] = a[i][1];
      }
    }
}

function c4a() {
    return [[0, 0], [0, 0], [0, 0], [0, 0]]
}


//克隆数据
function clone(obj) {

    if (obj === null || typeof obj !== "object") {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      let copy = [];
      for (let i = 0; i < obj.length; i++) {
        copy[i] = clone(obj[i])
      }
      return copy;
    }
  
    if (typeof obj === "object") {
      let copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = clone(obj[attr])
        }
      }
      return copy;
    }
}

//获取方块的最低点和最高点
function getTopAndLow(arr) {
    let s = arr[0][0], b = s;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][0] < s) {
        s = arr[i][0];
      } else if (arr[i][0] > b) {
        b = arr[i][0];
      }
    }
    return [s, b];
}

function objCopy (origin, newOne) {
  let keys = Object.keys(origin);
  for (let key of keys) {
    newOne[key] = origin[key]
  }
}

function MakeRange(name, ruler) {

  const bl = document.createElement('b')
  const br = document.createElement('b')
  this.input = document.createElement('input')
  this.input.setAttribute('type', 'number')
  document.querySelector(name).append(bl, this.input, br);

  this.ruler = ruler;
  this.min = 1;
  this.max = this.ruler.length;
  this.value = undefined;

  this.getValue = function () {

    let val = this.value;

    if (val >= this.min && val <= this.max) {
      return this.ruler[val - 1]
    } else {
      return false
    }
  }

  this.init = function (val) {
    this.input.value = this.value = this.ruler.indexOf(val) + 1;
    this.input.title = this.getValue() + '毫秒'
  }

  bl.addEventListener('click', () => {
    if (this.value > this.min) {
      this.value -= 1
      this.input.value = this.value;
      this.input.title = this.getValue() + '毫秒'
    }
  })

  br.addEventListener('click', () => {
    if (this.value < this.max) {
      this.value += 1
      this.input.value = this.value
      this.input.title = this.getValue() + '毫秒'
    }
  })
}

const clearSound = document.querySelector('#clear-sound');

const lockSound = document.querySelector('#lock-sound');

const offsound = document.querySelector('#off-sound');

function requestFullScreen(el) {
  let requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
  if (requestMethod) {
      requestMethod.call(el);
  } else if (typeof window.ActiveXObject !== "undefined") {
      let wscript = new ActiveXObject("WScript.Shell");
      if (wscript !== null) {
          wscript.SendKeys("{F11}");
      }
  }
}

function fullscreenmode() {
  requestFullScreen(document.documentElement);
}

function exitscreenmode() {
  if (document.exitFullScreen) {
      document.exitFullScreen();
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
  }
}
