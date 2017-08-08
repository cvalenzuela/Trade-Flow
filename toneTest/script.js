// PolySynth
// var synth = new Tone.PolySynth(6, Tone.Synth, {
//   "oscillator" : {
//     "partials" : [0, 2, 3, 4],
//   }
// }).toMaster();

Tone.Transport.bpm.value = 108;

// MP3
var player = new Tone.Player({
  "url" : "./mp3/Tradeflow_drum_closedHat.mp3",
	"loop" : false
}).toMaster();

// Start
function start (note){
  player.start();
}


