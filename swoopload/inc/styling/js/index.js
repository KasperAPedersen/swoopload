document.addEventListener("keyup", (event) => {
    switch(event.code) {
        case "NumpadSubtract":
            changeVolume(0);
            break;
        case "NumpadAdd":
            changeVolume(1);
            break;
        case "KeyP":
            changeStatus();
            break;
        default:
            console.log(event.code);
            break;
    }
});

let currentVol = 0.1;
function changeVolume(value){
    let song = document.getElementById("song");
    if (value == 1) {
        if(song.volume >= 1.0 || ((song.volume + 0.1) >= 1.0)) {
            song.volume = 1.0;
        } else {
            currentVol = currentVol + 0.1;
        }
    } else {
        if(song.volume <= 0.1 || ((song.volume - 0.1) <= 0.1)) {
            song.volume = 0.1;
        } else {
            currentVol = currentVol - 0.1;
        }
    }
    
    document.getElementById("song").volume = currentVol;
    console.log("volume change: " + currentVol);
}

let currentStatus = true;
function changeStatus() {
    console.log("Status change");
    let audio = document.querySelector("audio");
    
    currentStatus ? (audio.pause()) : (audio.play());
    currentStatus = !currentStatus;
}

var count = 0;
var thisCount = 0;

const handlers = {
    startInitFunctionOrder(data)
    {
        count = data.count;
    },

    initFunctionInvoking(data)
    {
        document.querySelector('.thingy').style.left = '0%';
        document.querySelector('.thingy').style.width = ((data.idx / count) * 100) + '%';
    },

    startDataFileEntries(data)
    {
        count = data.count;
    },

    performMapLoadFunction(data)
    {
        ++thisCount;

        document.querySelector('.thingy').style.left = '0%';
        document.querySelector('.thingy').style.width = ((thisCount / count) * 100) + '%';
    },

    onLogLine(data)
    {
        
    }
};

window.addEventListener('message', function(e)
{
    (handlers[e.data.eventName] || function() {})(e.data);
});

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    document.getElementById("song").volume = 0.1;


    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};