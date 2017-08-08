// Sound from tone.js

import * as Tone from 'tone';
import { p5Instance as p5 } from './index';

Tone.Transport.bpm.value = 108;
Tone.Transport.start();

let instrumentOrder = 1;
let setCurrentInstrument = (reset) => {
  if(reset){
    instrumentOrder = 1;
  }
  switch(instrumentOrder){
    case 1:
      instrumentOrder++;
      return 'mono'
    case 2:
      instrumentOrder++;
      return 'poly'
    case 3:
      instrumentOrder++;
      return 'drum'
    case 4:
      instrumentOrder++;
      return 'HiMono'
    case 5:
      instrumentOrder++;
      return 'LowMono'
    case 6:
      instrumentOrder++;
      return 'HiPoly'
    default:
      instrumentOrder = 2;
      return 'mono'
      break;
  }
}

let createSoundGroup = (size, group) => {
  let arr = [];
  
  for(let i = 1; i <= size; i++){
    arr.push(new Tone.Player({
    "url" : "./mp3/Tradeflow_" + group + "_" + i + ".mp3",
    "loop" : false,
    }).toMaster());
  }
  return arr;
}

let soundTypes = {
  mono: {
    sounds: createSoundGroup(5, '1mono'),
    tempo: '1n'
  },
  poly: {
    sounds: createSoundGroup(7, '2poly'),
    tempo: '2n'
  },
  drum: {
    sounds: createSoundGroup(8, '3drum'),
    tempo: '3n'
  },
  HiMono: {
    sounds: createSoundGroup(8, '4HiMono'),
    tempo: '4n'
  },
  LowMono: {
    sounds: createSoundGroup(4, '5LowMono'),
    tempo: '5n'
  },
  HiPoly: {
    sounds: createSoundGroup(7, '6HiPoly'),
    tempo: '6n'
  }
}

let playSound = (soundType) => {
  soundType.start();
}

export { playSound, soundTypes, setCurrentInstrument};


// var synth = new Tone.PolySynth(6, Tone.Synth, {
//   "oscillator" : {
//     "partials" : [0, 2, 3, 4],
//   }
// }).toMaster();

// let playNote = (note, delay) => {
//   synth.triggerAttack(note);
//   setTimeout(function(){
//     synth.triggerRelease(note);
//   }, delay);
// }