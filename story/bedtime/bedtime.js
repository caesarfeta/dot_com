var intro = $('#intro').text();
var msg = new SpeechSynthesisUtterance( intro );
window.speechSynthesis.speak(msg);