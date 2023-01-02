window.onload = function () {
    fadeAudio('./resources/1_3.mp3');

    /* Loads an keyboard type SFX within each header typing animation */
    var sfx = new Audio('./resources/sfx.mp3');
    sfx.loop = false;
    sfx.volume = 1;

    var abbrv = document.getElementById("abbrv");
    var headers = abbrv.getElementsByTagName("h1");

    // Loads a typewriter animation on each header
    var title = document.getElementById("title");
    var i = 0; var eachWordInterval = setInterval(eachWord, 1000);

    function eachWord() {
        const header = headers[i];

        // Unloads the (blink) animation out of each previous header, besides the last
        if (i > 0) {
            if (i !== headers.length) {
                headers[i - 1].classList.remove("typing");
            } else {
                clearInterval(eachWordInterval); sfx.pause();
            }
        } else {
            title.classList.remove("typing");
        }        

        // Unvanishes the header, triggers the typewriter animation, and plays the SFX
        if (header !== undefined) {
            if (header.classList.contains("invisible"))
                header.classList.remove("invisible");
            header.classList.add("typing"); sfx.play(); i++;
        }
    }

    // Switches to a new video if it gets clicked
    var asicVideo = document.getElementById("asic");
    var newASICVideo = document.getElementById("other");
    var paper = document.getElementById("paper");
    asicVideo.onclick = function () {
        asicVideo.classList.add("invisible");
        newASICVideo.classList.remove("invisible");
    }

    var corporealMatter = document.getElementById("corporeal")
    corporealMatter.onclick = function () {
        asicVideo.classList.add("invisible");
        newASICVideo.classList.remove("invisible");
        setTimeout(function () {
            paper.classList.remove("invisible");
        }, 3000);
    }

    var creepyVideo = document.getElementById("creepy")
    var artificial = document.getElementById("artificial")
    artificial.onclick = function() {
        creepyVideo.classList.remove("invisible");
    }
}