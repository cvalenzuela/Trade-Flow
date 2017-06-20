// Sound from tone.js

import * as Tone from 'tone';

var synth = new Tone.PolySynth(6, Tone.Synth, {
  "oscillator" : {
    "partials" : [0, 2, 3, 4],
  }
}).toMaster();

let playNote = (note, delay) => {
  synth.triggerAttack(note);
  setTimeout(function(){
    synth.triggerRelease(note);
  }, delay);
}

window.synth = synth;

export { playNote };
