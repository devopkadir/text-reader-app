const message = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropDown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"],[name="text"]');
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
message.text = document.querySelector('[name="text"]').value;

function populateVoices() {
    voices = this.getVoices();
    voicesDropDown.innerHTML = voices
        .filter(voice => voice.lang.includes("en"))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join("");
}

function setVoice() {
    message.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(start = true) {
    speechSynthesis.cancel();
    if (start) {
        speechSynthesis.speak(message);
    }
}

function setOption() {
    console.log(this.name, this.value);
    message[this.name] = this.value;
    toggle();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropDown.addEventListener("change", setVoice);
options.forEach(option => option.addEventListener("change", setOption));
speakBtn.addEventListener("click", toggle);
stopBtn.addEventListener("click", () => toggle(false));
