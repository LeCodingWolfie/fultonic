function loadIn() {
	setTimeout(function () {
		var loadNextVideo = document.getElementById("loadNext");

		fadeElement("Load Video", "loadNext", 1, 0, 0.1, 25, false);

		setTimeout(function () {
			loadNextVideo.classList.add("invisible");
			//
			var body = document.getElementById("body");
			body.classList.remove("invisible");
			//
			fadeElement("Body", "body", 0, 1, 0.1, 50, true);
		}, 500);
	}, 4000);
}

function checkIfLoad() {
	// Checks if a cookie called load has been stored in the browser
	// If it does, doesn't load the transition.
	const cookieValue = document.cookie
		.split('; ')
		.find((row) => row.startsWith('load='))
		?.split('=')[1];

	if (cookieValue !== undefined) {
		var body = document.getElementById("body");
		var loadNextVideo = document.getElementById("loadNext");
		loadNextVideo.classList.add("invisible");
		body.classList.remove("invisible");
	} else {
		// Otherwise, adds the cookie
		console.log("Added Load Cookie!");
		document.cookie = "load=true; SameSite=strict; Secure";
		loadIn();
	}
}

function popup(id) {
	var body = document.getElementsByTagName("body")[0];

	if (body.style.overflow !== "hidden")
		body.style.overflow = "hidden";
	else
		body.style.overflow = "visible";

	var pop = document.getElementById(id);
	pop.classList.toggle("visible");
}

var items = {
	dead: {
		elementId: "dead planet",
		popupId: "popup-dead",
		songName: "isolated"
	},
	xenon: {
		elementId: "xenon warriors",
		popupId: "popup-xenon",
	}
}

var songs = {
	isolated: {
		audio: new Audio("../resources/isolated.mp3"),
		volume: 0.2,
		fastSeek: 15
	},
	thunder: {
		audio: new Audio("../resources/thunder_music.mp3"),
		volume: 0.05
	}
}

function onItemClicked(name, obj) {
	console.log("Item clicked: " + name);
	popup(obj.popupId);

	if (typeof obj.songName !== "undefined") {
		let song = songs[obj.songName];
		let audio = song.audio;

		if (audio.paused) {
			if (song.volume !== undefined) audio.volume = song.volume;
			if (song.fastSeek !== undefined) audio.fastSeek(song.fastSeek);
			audio.play();
		} else {
			audio.pause();
		}
	}
}

function start() {
	checkIfLoad();
	loadIn();

	speaker(fadeAudio('../resources/1_1.mp3'));

	// Fades out image by 0.025 every 100ms from 1 to 0
	fadeElement("Image", "banner", 1, 0, 0.025, 100, false);

	// Fades in video by 0.05 every 200ms from 0 to 1
	fadeElement("Video", "video", 0, 1, 0.05, 200, true);
}

window.onload = async function () {
	for (let item in items) {
		let obj = items[item];
		obj.element = document.getElementById(obj.elementId);
		obj.element.onclick = () => onItemClicked(item, obj);
	}

	let closeButtons = document.getElementsByClassName("x");
	for (let x of closeButtons) {
		x.onclick = () => x.parentElement.classList.toggle("visible");
	}

	let xenonChapter = document.getElementById("chapter-1");
	xenonChapter.onclick = () => {
		let preview = document.getElementsByClassName("preview")[0];
		preview.classList.toggle("invisible");
		preview.getElementsByTagName("video")[0].play();

		songs.thunder.audio.volume = 0.05;
		songs.thunder.audio.play();

		/*
		let xenon = document.getElementById(items.xenon.popupId);
		let xenonInner = xenon.querySelector("#inner");
		xenonInner.style.top = "-50%";
		*/
	}
}

/*
function jinrui() {
	var main = document.getElementById("main");
	main.classList.toggle("blur");
	var pop = document.getElementById("popup");
	pop.classList.toggle("active");
}
*/
